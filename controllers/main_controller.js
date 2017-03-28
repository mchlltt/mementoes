// Import dependencies.
var express = require('express');
var db = require('../models');

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

// Get entries by googleId.
router.get('/api/entries/:googleId/:entryId?', function (req, res) {
    var googleId = req.params.googleId;
    var entryId = req.params.entryId || null;
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
});

router.get('/api/tags/:googleId/:tagText', function(req, res) {
    var googleId = req.params.googleId;
    var tagText = req.params.tagText;

    db.Tag.findAll({where: {text: tagText}}).then(function(tag) {
        res.json(tag);

    });
});

// Update an entry by entryId. Verifies permission on googleId.
router.put('/api/entries', function(req, res) {
    var googleId = req.body.googleId;
    var entryId = req.body.entryId;
    var date = req.body.date;
    var text = req.body.text;
    var tags = req.body.tags;

    if (googleId && entryId && date && text) {
        db.Entry.findById(entryId).then(function (entry) {
            if (entry.googleId === googleId) {
                entry.update({
                    date: date,
                    text: text
                }).then(function(entry) {
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
                });
            } else {
                res.json('Permission denied.');
            }
        }).then(function (data) {
            res.json(data);
        });
    } else {
        res.json('An error occurred. Put body:' + req.body.id + JSON.stringify(req.body, null, 2));
    }
});


// Delete an entry by entryId. Verifies permission on googleId.
router.delete('/api/entries/:googleId/:entryId', function(req, res) {
    var googleId = req.params.googleId;
    var entryId = req.params.entryId;

    db.Entry.findById(entryId).then(
        function (entry) {
            if (entry.googleId === googleId) {
                entry.destroy();
                res.json(true);
            } else {
                res.json('Permission denied.');
            }
        }
    );
});

// Delete user by googleId. Works but only kind of.
router.delete('/api/users/:googleId', function(req, res) {
    var googleId = req.params.googleId;

    db.User.findById(googleId).then(
        function(user) {
            if (user) {
                user.destroy();
            }
        }
    );
});


// Default route.
router.use('*', function (req, res) {
    res.sendFile('index.html');
});

// Export routes.
module.exports = router;