// Include the React library
var React = require('react');

// Include the react-router module
var router = require('react-router');

// Include the Route component for displaying individual routes
var Route = router.Route;

// Include the Router component to contain all our Routes
// Here where we can pass in some configuration as props
var Router = router.Router;

// Include the hashHistory prop to handle routing client side without a server

var hashHistory = router.hashHistory;

// Include the IndexRoute (catch-all route)
var IndexRoute = router.IndexRoute;

// Reference the high-level components
var Main = require('../components/Main');
var Dashboard = require('../components/Dashboard');
var Login = require('../components/children/Login');
var Calendar = require('../components/children/Calendar');
var New = require('../components/children/New');
var Charts = require('../components/children/Charts');
var Settings = require('../components/children/Settings');

// Export the Routes
module.exports = (

    // The high level component is the Router component
    <Router history={hashHistory}>
        <Route path="/" component={Main}>
            <Route path="dashboard" component={Dashboard}>
                <Route path="calendar" component={Calendar} />
                <Route path="charts" component={Charts} />
                <Route path="new" component={New} />
                <Route path="settings" component={Settings} />
                <IndexRoute component={Calendar} />
            </Route>
            <Route path="log-in" component={Login} />
            <IndexRoute component={Login} />
        </Route>
    </Router>

);