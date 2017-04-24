// Import dependencies.
import React from 'react';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';

// Import high-level components.
import Main from '../components/Main';
import Dashboard from '../components/Dashboard';
import Login from '../components/Login';
import Calendar from '../components/dashboard/calendar/Calendar';
import New from '../components/dashboard/entries/New';
import Home from '../components/dashboard/home/Home';
import TagView from '../components/dashboard/home/TagView';
import Settings from '../components/dashboard/settings/Settings';
import Edit from '../components/dashboard/entries/Edit';
import About from '../components/dashboard/about/About';

// Create routes.
export default (
    <Router history={browserHistory}>
        <Route path="/" component={Main}>
            <Route path="dashboard" component={Dashboard}>
                <Route path="calendar" component={Calendar} />
                <Route path="home" component={Home} />
                <Route path="tags/:tagText" component={TagView} />
                <Route path="new(/:date)" component={New}/>
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