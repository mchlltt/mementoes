// Import dependencies, components, and services.
import React from 'react';
import {Jumbotron} from 'react-bootstrap';
import {Link} from 'react-router';
import CalendarWidget from './CalendarWidget';
import GetService from '../../../utils/getService';

// Construct services.
let getEntries = new GetService('/api/entries/');
let verifyService = new GetService('/api/verify/');

// Create component.
let Calendar = React.createClass({
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
    componentWillMount: function() {
        verifyService.getRoute().then(function(res) {
            getEntries.getRoute([res.googleId], res.googleId).then(function(response) {
                let events = [];
                response.forEach(function(event) {
                    let tags = [];

                    event.entryHasTags.forEach(function(tag) {
                        tags.push(tag.text);
                    });

                    events.push({
                        googleId: event.googleId,
                        id: event.id,
                        title: event.text,
                        start: new Date(event.date),
                        end: new Date(event.date),
                        allDay: true,
                        tags: tags
                    });
                });
                this.setState({
                    events: events,
                    loaded: true
                });
            }.bind(this));
        }.bind(this));
    },
    render: function () {
        return (
            <div key="/dashboard/calendar">
                <Link to="/dashboard/home" className="pull-right btn btn-primary btn-outline btn-rounded">Home</Link>
                <Link to="/dashboard/new" className="pull-right btn btn-success btn-outline btn-rounded">New Memento</Link>
                <h2>Calendar</h2>
                <Jumbotron>
                    {this.state.loaded &&
                        <CalendarWidget style={this.styles.calendar} events={this.state.events} />
                    }
                </Jumbotron>
            </div>
        );
    }

});

module.exports = Calendar;
