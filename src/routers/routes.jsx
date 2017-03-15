import React from 'react';
import { Router, Route, DefaultRoute, RouteHandler, Redirect } from 'react-router';

import BaseLayout from '../components/layouts/Base';
import DashboardLayout from '../components/layouts/Dashboard';

import DashboardCalendarPage from '../components/pages/dashboard/Calendar';
import DashboardChartsPage from '../components/pages/dashboard/charts';
import DashboardSettingsPage from '../components/pages/dashboard/Settings';
import DashboardNewPage from '../components/pages/dashboard/New';
import LoginPage from '../components/pages/Login';

var Routes = React.createClass({

  statics: {
    getRoutes: function() {
      return (
          <Route name='base' path='/' handler={BaseLayout}>
            <Route name='dashboard' path='/dashboard' handler={DashboardLayout}>
              <Route name='dashboard.calendar' path='/calendar' handler={DashboardCalendarPage} />
              <Route name='dashboard.charts' path='/charts' handler={DashboardChartsPage} />
                <Route name='dashboard.settings' path='/settings' handler={DashboardSettingsPage} />
                <Route name='dashboard.new' path='/new' handler={DashboardNewPage} />
              <DefaultRoute name='dashboard.default' handler={DashboardCalendarPage} />
            </Route>
            <Route name='login' path='/login' handler={LoginPage} />
            <DefaultRoute name='default' handler={DashboardLayout} />
            <Redirect from='/' to='dashboard.overview' />
          </Route>
      );
    }
  },
  render: function() {
  
  }
  
});

export default Routes;