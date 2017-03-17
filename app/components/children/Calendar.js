import React, {PropTypes, Component} from 'react';
import {Jumbotron} from 'react-bootstrap';
import CalendarWidget from './children/CalendarWidget';

import GetService from '../utils/getService';

var getEntries = new GetService('api/entries/');

var Calendar = React.createClass({
    getInitialState: function() {
        return {
            events: []
        };
    },
    styles: {
        calendar: {
            minHeight: '60vh'
        }
    },
    componentDidMount: function() {
        getEntries.get([this.props.googleId]).then(function(response) {
            var events = [];
            response.forEach(function(event) {
                events.push({
                    title: event.text,
                    start: new Date(event.date),
                    end: new Date(event.date),
                    allDay: true

                });
            });
            this.setState({ events: events });
        }.bind(this));
    },
    render: function () {
        return (
            <div key="/dashboard/calendar">
                <h2>Calendar</h2>
                <Jumbotron>
                    <h2>Memento Calendar</h2>
                    <CalendarWidget style={this.styles.calendar} events={this.state.events} />
                </Jumbotron>
            </div>


        );
    }

});

module.exports = Calendar;
