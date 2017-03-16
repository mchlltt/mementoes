import React, { PropTypes, Component } from 'react';
import { Link } from "react-router";
import {Jumbotron} from 'react-bootstrap';

var Settings = React.createClass({
  render: function() {
    return (
      <div className="overview-page" key="settings">
          <Link to="/dashboard/calendar" className="pull-right btn btn-primary btn-outline btn-rounded">Back to Calendar</Link>
        <h2>Settings</h2>
        <Jumbotron> 
          <h2>Settings page will go here.</h2>
        </Jumbotron> 
      </div>
      
      
    );
  }

});

module.exports = Settings;
