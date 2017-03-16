var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var favicon = require('serve-favicon');

// Sequelize
var sequelize = require('sequelize');
var db = require('./models');

var authConfig;

// Passport
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


var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var cookieParser = require('cookie-parser');
var session = require('express-session');

// Initialize app.
var app = express();

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(path.join(__dirname, 'public')));

var PORT = process.env.PORT || 3000;

// Favicon
app.use(favicon(path.join(__dirname, 'public/assets/images', 'favicon.ico')));

// Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Import routes and give the server access to them.
var routes = require('./controllers/controller');
app.use('/', routes);

db.sequelize.sync().then(function() {
    app.listen(PORT, function () {
        console.log('listening on port ' + PORT);
    });
});


/// Passport stuff here for now.

passport.serializeUser(function (user, done) {
    // done(null, user.id);
    done(null, user);
});

passport.deserializeUser(function (obj, done) {
    // Users.findById(obj, done);
    done(null, obj);
});


// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.
//   See http://passportjs.org/docs/configure#verify-callback
passport.use(new GoogleStrategy(
    // Use the API access settings stored in ./config/auth.json. You must create
    // an OAuth 2 client ID and secret at: https://console.developers.google.com
    authConfig.google,

    function(accessToken, refreshToken, profile, done) {
        db.User.findOrCreate({
            where: {
                googleId: profile.id
            }
        }).then(function (err, user) {
            return done(err, user);
        });
    }
));

app.use(cookieParser());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());



// GET /auth/google
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Google authentication will involve
//   redirecting the user to google.com.  After authorization, Google
//   will redirect the user back to this application at /auth/google/callback
app.get('/auth/google',
    passport.authenticate('google', {scope: ['openid email profile']}));

// GET /auth/google/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
app.get('/auth/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/login'
    }),
    function (req, res) {
        // Authenticated successfully
        res.redirect('/dashboard/calendar');
    });
//
// app.get('/account', ensureAuthenticated, function (req, res) {
//     res.render('account', {
//         user: req.user
//     });
// });

app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/login');
});

//
// // Simple route middleware to ensure user is authenticated.
// function ensureAuthenticated(req, res, next) {
//     if (req.isAuthenticated()) {
//         return next();
//     } else {
//         return res.redirect('/login');
//     }
// }