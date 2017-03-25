var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var favicon = require('serve-favicon');
var passport = require('passport');
var util = require('util');
var session = require('express-session');
var sequelize = require('sequelize');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var partials = require('express-partials');

// Sequelize

var db = require('./models');

// Initialize app.
var app = express();

app.use(partials());
app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(path.join(__dirname, 'public')));

var PORT = process.env.PORT || 3000;

// Favicon
app.use(favicon(path.join(__dirname, 'public/assets/images', 'favicon.png')));

// Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Import routes and give the server access to them.
var passportRoutes = require('./controllers/passport_controller');
var mainRoutes = require('./controllers/main_controller');

app.use('/', passportRoutes);
app.use('/', mainRoutes);

var authConfig;
try {
    authConfig = require('./config/auth');
} catch(err) {
    authConfig =
        {
            google: {
                clientID: process.env.clientID,
                clientSecret: process.env.clientSecret,
                callbackURL: process.env.callbackURL
            }
        };
}

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (obj, done) {
    done(null, obj);
});

// Use the GoogleStrategy within Passport.
passport.use(new GoogleStrategy(
    authConfig.google,
    function(accessToken, refreshToken, profile, done) {
        process.nextTick(function () {
            return done(null, profile);
        });
    }
));

// Sync with Sequelize and start listening.
db.sequelize.sync().then(function() {
    app.listen(PORT, function () {
        console.log('listening on port ' + PORT);
    });
});

