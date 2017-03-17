// Import dependencies.
var express = require('express');
var db = require('../models');
var passport = require('passport');

// Initialize express router.
var router = express.Router();

// GET /auth/google
router.get('/auth/google',
    passport.authenticate('google', {scope: ['openid email profile']}));

// GET /auth/google/callback
router.get('/auth/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/#/login'
    }),
    function (req, res) {
        //change to true when logged in
        module.exports.loggedIn = true;

        //uniquely logs user into database on login
        db.User.findOrCreate({
            where: {
                googleId: req.user.id
            }
        }).spread(function () {
            res.redirect('/#/dashboard/calendar');
        });
    });

// API route for verifying log in.
router.get('/api/verify', function (req, res) {
    if (req.isAuthenticated()) {
        res.json(
            {
                auth: req.isAuthenticated(),
                googleId: req.user.id
            });
    } else {
        res.json({auth: false});
    }
});

// API route for logging out.
router.get('/api/logout', function (req, res) {
    module.exports.loggedIn = false;
    req.logout();
    res.redirect('/');
});

module.exports = router;
