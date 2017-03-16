import React, {PropTypes, Component} from 'react';
import {Jumbotron} from 'react-bootstrap';
import CalendarWidget from './children/CalendarWidget';

var Calendar = React.createClass({
    styles: {
        calendar: {
            minHeight: '60vh'
        }
    },
    render: function () {
        return (
            <div className="overview-page" key="overview">
                <a href="#/dashboard/calendar"
                   className="pull-right btn btn-primary btn-outline btn-rounded">Calendar</a>
                <h2>Calendar</h2>
                <Jumbotron>
                    <h2>Memento Calendar</h2>
                    <CalendarWidget style={this.styles.calendar}/>
                </Jumbotron>
            </div>


        );
    }

});

module.exports = Calendar;
