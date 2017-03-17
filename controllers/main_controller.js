// Import dependencies.
var express = require('express');
var db = require('../models');

// Initialize express router.
var router = express.Router();

// Post a new entry.
router.post('/api/new', function(req, res) {
    var googleId = req.body.googleId;
    var date = req.body.date;
    var text = req.body.text;
    if (googleId && date && text) {
        db.Entry.create({
            googleId: googleId,
            date: date,
            text: text
        }).then(function (data) {
            res.json(data);
        });
    } else {
        res.json('An error occurred. Post body:' + JSON.stringify(req.body, null, 2));
    }
});

// Get entries by UserId.
router.get('/api/entries/:id', function(req, res) {
   var googleId = req.params.id;
   db.Entry.findAll({where: {googleId: googleId}}).then(
       function(result) {
           res.json(result);
       }
   );
});

// Default route.
router.use('*', function (req, res) {
    res.sendFile('index.html');
});

// Export routes.
module.exports = router;