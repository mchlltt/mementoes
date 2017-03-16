import React, { PropTypes, Component } from 'react';
import {Jumbotron} from 'react-bootstrap';
import EntryForm from './children/EntryForm';

var New = React.createClass({
  render: function() {
    return (
      <div key="new">
          <a href="#/dashboard/calendar" className="pull-right btn btn-primary btn-outline btn-rounded">Back to Calendar</a>
        <h2>New Post</h2>
        <Jumbotron> 
          <h2>What is something positive that happened today?</h2>
            <EntryForm />
        </Jumbotron> 
      </div>
    );
  }

});

module.exports = New;
