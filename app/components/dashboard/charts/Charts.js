import React, { PropTypes, Component } from 'react';
import {Jumbotron} from 'react-bootstrap';

var Charts = React.createClass({
  render: function() {
    return (

      <div key="/dashboard/charts">
          <a href="#/dashboard/calendar" className="pull-right btn btn-primary btn-outline btn-rounded">Back to Calendar</a>
          <h2>Charts</h2>
          
          <Jumbotron> 
            <h2>Add Charts here</h2>
          </Jumbotron> 
        </div>
      
    );
  }

});

module.exports = Charts;