import React, { PropTypes, Component } from 'react';
import { Link } from "react-router";
import {Jumbotron} from 'react-bootstrap';
import BigCalendar from './children/BigCalendar';

var Calendar = React.createClass({
    styles: {
        calendar: {
            minHeight: '60vh'
        }
    },
  render: function() {
    return (
      <div className="overview-page" key="overview"> 
        <Link to="/dashboard/calendar" className="pull-right btn btn-primary btn-outline btn-rounded">Calendar</Link>
        <h2>Calendar</h2>
        <Jumbotron> 
          <h2>Memento Calendar</h2>
            <BigCalendar style={this.styles.calendar}/>
        </Jumbotron> 
      </div>
      
      
    );
  }

});

export default Calendar;
