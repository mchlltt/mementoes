import React, { PropTypes, Component } from 'react';
import {Jumbotron} from 'react-bootstrap';

var Charts = React.createClass({
  render: function() {
    return (

      <div key="charts">
          <a href="#/dashboard/calendar" className="pull-right btn btn-primary btn-outline btn-rounded">Back to Calendar</a>
          <h2>Reports <small>Works with Chart.js and D3</small></h2>
          
          <Jumbotron> 
            <h1>Add Charts here</h1> 
            <p>You can use D3.js or Chart.js</p>
            <p> <a className="btn btn-primary btn-lg btn-outline btn-rounded">Learn more</a> </p> 
          </Jumbotron> 
        </div>
      
    );
  }

});

module.exports = Charts;