var express = require('express');
var app = express();
var authConfig = require('./config/auth');
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var sequelize = require('sequelize');
var db = require('./models');

// Serve application file depending on environment
app.get('/app.js', function (req, res) {
    if (process.env.PRODUCTION) {
        res.sendFile(__dirname + '/build/app.js');
    } else {
        res.redirect('//localhost:9090/build/app.js');
    }
});

// Serve aggregate stylesheet depending on environment
app.get('/style.css', function (req, res) {
    if (process.env.PRODUCTION) {
        res.sendFile(__dirname + '/build/style.css');
    } else {
        res.redirect('//localhost:9090/build/style.css');
    }
});

app.use(express.static(__dirname + '/build'));

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

var cookieParser = require('cookie-parser');
var session = require('express-session');

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
        console.log('success');
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
    res.redirect('/');
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

// Serve index page
app.get('*', function (req, res) {
    res.sendFile(__dirname + '/build/index.html');
});




/*************************************************************
 *
 * Webpack Dev Server
 *
 * See: http://webpack.github.io/docs/webpack-dev-server.html
 *
 *************************************************************/

if (!process.env.PRODUCTION) {
    var webpack = require('webpack');
    var WebpackDevServer = require('webpack-dev-server');
    var config = require('./webpack.local.config');

    new WebpackDevServer(webpack(config), {
        publicPath: config.output.publicPath,
        hot: true,
        noInfo: true,
        historyApiFallback: true
    }).listen(9090, 'localhost', function (err, result) {
        if (err) {
            console.log(err);
        }
    });
}

var port = process.env.PORT || 8080;
db.sequelize.sync().then(function() {
    var server =
        app.listen(port, function () {
            var host = server.address().address;
            var port = server.address().port;

            console.log('Essential React listening at http://%s:%s', host, port);
        });
});
