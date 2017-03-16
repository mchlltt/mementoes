import React, { PropTypes, Component } from 'react';
import {Jumbotron} from 'react-bootstrap';
import EntryForm from './children/EntryForm';

var New = React.createClass({
    getInitialState: function() {
        return {
            dateDisplay: 'today'
        };
    },
    setTerms: function(dateDisplay) {
        this.setState(
            {
                dateDisplay: dateDisplay
            }
        );
    },
  render: function() {
    return (
      <div key="new">
          <a href="#/dashboard/calendar" className="pull-right btn btn-primary btn-outline btn-rounded">Back to Calendar</a>
        <h2>New Post</h2>
        <Jumbotron> 
          <h2>What is something that made you happy {this.state.dateDisplay}?</h2>
            <EntryForm setTerms={this.setTerms}/>
        </Jumbotron> 
      </div>
    );
  }

});

module.exports = New;
