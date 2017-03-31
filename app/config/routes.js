// Include the React library
var React = require('react');

// Include the react-router module
import { Router, Route, browserHistory, IndexRoute } from 'react-router'

// Reference the high-level components
var Main = require('../components/Main');
var Dashboard = require('../components/Dashboard');
var Login = require('../components/Login');
var Calendar = require('../components/dashboard/calendar/Calendar');
var New = require('../components/dashboard/entries/New');
var Home = require('../components/dashboard/home/Home');
var TagView = require('../components/dashboard/home/TagView');
var Settings = require('../components/dashboard/settings/Settings');
var Edit = require('../components/dashboard/entries/Edit');
var About = require('../components/dashboard/about/About');

// Export the Routes
module.exports = (

    // The high level component is the Router component
    <Router history={browserHistory}>
        <Route path="/" component={Main}>
            <Route path="dashboard" component={Dashboard}>
                <Route path="calendar" component={Calendar} />
                <Route path="home" component={Home} />
                <Route path="tags/:tagText" component={TagView} />
                <Route path="new" component={New} />
                <Route path="about" component={About} />
                <Route path="users/:googleId/entries/:entryId/edit" component={Edit} />
                <Route path="settings" component={Settings} />
                <IndexRoute component={Home} />
            </Route>
            <Route path="login" component={Login} />
            <Route path="logged-out" component={Login} />
            <IndexRoute component={Dashboard} />
        </Route>
    </Router>

);