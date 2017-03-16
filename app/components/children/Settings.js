import React, { PropTypes, Component } from 'react';
import {Jumbotron} from 'react-bootstrap';

var Settings = React.createClass({
  render: function() {
    return (
      <div key="settings">
          <a href="#/dashboard/calendar" className="pull-right btn btn-primary btn-outline btn-rounded">Back to Calendar</a>
        <h2>Settings</h2>
        <Jumbotron> 
          <h2>Settings page will go here.</h2>
        </Jumbotron> 
      </div>
    );
  }

});

module.exports = Settings;
