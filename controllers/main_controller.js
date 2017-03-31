// Import dependencies.
var express = require('express');
var db = require('../models');
var path = require('path');

// Initialize express router.
var router = express.Router();

// Post a new entry.
router.post('/api/entries', function (req, res) {
    var googleId = req.body.googleId;
    var date = req.body.date;
    var text = req.body.text;
    var tags = req.body.tags;

    if (googleId && date && text) {
        db.Entry.create({
            googleId: googleId,
            date: date,
            text: text
        }).then(function (entry) {
            if (tags) {
                tags.forEach(function (tag) {
                    db.Tag.findOrCreate({where: {text: tag}}).spread(function (tagInstance) {
                        entry.addEntryHasTag(tagInstance);
                    });
                });
            }
        }).then(function (data) {
            res.json(data);
        });
    } else {
        res.json('An error occurred. Post body:' + JSON.stringify(req.body, null, 2));
    }
});

// Get one random entry by googleId.
router.get('/api/entries/random/:googleId', function (req, res) {
    var googleId = req.params.googleId;
    var headerId = req.headers['x-mementoes-id'];

    if (googleId === headerId) {
        db.sequelize.query(
            'SELECT Entries.id ' +
            'FROM Entries ' +
            'WHERE Entries.googleId = :googleId ' +
            'ORDER BY RAND() ' +
            'LIMIT 1',
            {replacements: {googleId}, type: db.sequelize.QueryTypes.SELECT}
        ).then(function (entry) {
            if (entry[0]) {
                db.Entry.findById(entry[0].id, {include: [db.Entry.tagAssociation]}).then(function (result) {
                    res.json(result);
                });
            } else {
                res.sendStatus(404);
            }
        });
    } else {
        res.sendStatus(401);
    }
});

// Get one specific or all entries by googleId.
router.get('/api/entries/:googleId/:entryId?', function (req, res) {
    var googleId = req.params.googleId;
    var headerId = req.headers['x-mementoes-id'];
    var entryId = req.params.entryId || null;

    if (googleId === headerId) {
        if (entryId) {
            db.Entry.findAll({where: {googleId: googleId, id: entryId}, include: [db.Entry.tagAssociation]}).then(
                function (result) {
                    res.json(result);
                }
            );
        } else {
            db.Entry.findAll({where: {googleId: googleId}, include: [db.Entry.tagAssociation]}).then(
                function (result) {
                    res.json(result);
                }
            );
        }
    } else {
        res.sendStatus(401);
    }
});

// Get a user's tag usage frequency.
router.get('/api/tags/:googleId', function (req, res) {
    var googleId = req.params.googleId;
    var headerId = req.headers['x-mementoes-id'];

    if (googleId === headerId) {
        db.sequelize.query(
            'SELECT Tags.text AS value, COUNT(Tags.text) AS count FROM Entries ' +
            'JOIN EntryTag ON EntryTag.entryId = Entries.id ' +
            'JOIN Tags ON EntryTag.tagId = Tags.id ' +
            'WHERE Entries.googleId = :googleId ' +
            'GROUP BY Tags.text',
            {replacements: {googleId}, type: db.sequelize.QueryTypes.SELECT}
        ).then(function (entries) {
            res.json(entries);
        });
    } else {
        res.sendStatus(401);
    }
});

// Get a user's entries by tag.
router.get('/api/tags/:googleId/:tagText', function (req, res) {
    var googleId = req.params.googleId;
    var headerId = req.headers['x-mementoes-id'];
    var tagText = req.params.tagText;

    if (googleId === headerId) {
        db.sequelize.query(
            'SELECT Entries.id ' +
            'FROM Entries ' +
            'JOIN EntryTag ON EntryTag.entryId = Entries.id ' +
            'JOIN Tags ON EntryTag.tagId = Tags.id ' +
            'WHERE Entries.googleId = :googleId ' +
            'AND Tags.text = :tagText;',
            {replacements: {googleId, tagText}, type: db.sequelize.QueryTypes.SELECT}
        ).then(function (entries) {
            var entryIds = [];
            entries.forEach(function (entry) {
                entryIds.push(entry.id);
            });
            db.Entry.findAll({
                where: {googleId: googleId, id: {$in: entryIds}},
                include: [db.Entry.tagAssociation]
            }).then(
                function (result) {
                    res.json(result);
                }
            );
        });
    } else {
        res.sendStatus(401);
    }
});

// Update an entry by entryId. Verifies permission on googleId.
router.put('/api/entries', function (req, res) {
    var googleId = req.body.googleId;
    var entryId = req.body.entryId;
    var tagless = req.params.tagless || false;
    var date = req.body.date;
    var text = req.body.text;
    var tags = req.body.tags;

    if (googleId && entryId && date && text) {
        db.Entry.findById(entryId).then(function (entry) {
            if (entry.googleId === googleId) {
                entry.update({
                    date: date,
                    text: text
                }).then(function (entry) {
                    if (!tagless) {
                        if (tags) {
                            var tagIds = [];
                            var tagCount = 0;
                            tags.forEach(function (tag) {
                                db.Tag.findOrCreate({where: {text: tag}}).spread(function (tagInstance) {
                                    tagCount += 1;
                                    tagIds.push(tagInstance.id);

                                    // We want to set the tags inside of the callback to make sure it's async, but we only
                                    // want to do it once, so we can use 'setAssociations' and thus wipe out any removed
                                    // tags while we're at it. So we're going to test when to break and set the tags by index.
                                    if (tagCount === tags.length) {
                                        entry.setEntryHasTags(tagIds);
                                    }
                                });
                            });
                        } else {
                            entry.setEntryHasTags();
                        }
                    }
                });
            } else {
                res.sendStatus(404);
            }
        }).then(function (data) {
            res.json(data);
        });
    } else {
        res.json('An error occurred. Put body:' + req.body.id + JSON.stringify(req.body, null, 2));
    }
});

// Delete an entry by entryId. Verifies permission on googleId.
router.delete('/api/entries/:googleId/:entryId', function (req, res) {
    var googleId = req.params.googleId;
    var headerId = req.headers['x-mementoes-id'];
    var entryId = req.params.entryId;

    if (googleId === headerId) {
        db.Entry.findById(entryId).then(
            function (entry) {
                if (entry) {
                    if (entry.googleId === googleId) {
                        entry.destroy();
                        res.sendStatus(200);
                    } else {
                        res.sendStatus(401);
                    }
                } else {
                    res.sendStatus(404);
                }
            }
        );
    } else {
        res.sendStatus(401);
    }
});

// Delete user by googleId.
router.delete('/api/users/:googleId', function (req, res) {
    var headerId = req.headers['x-mementoes-id'];
    var googleId = req.params.googleId;

    if (googleId === headerId) {
        db.User.findById(googleId).then(
            function (user) {
                if (user) {
                    user.destroy();
                    res.sendStatus(200);
                } else {
                    res.sendStatus(404);
                }
            }
        );
    } else {
        res.sendStatus(401);
    }

});

// Default route.
router.use('*', function (req, res) {
    res.sendFile('index.html', {root: path.resolve(__dirname, '../public')});
});

// Export routes.
module.exports = router;