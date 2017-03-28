import React from 'react';
import {Jumbotron} from 'react-bootstrap';
import {Link} from 'react-router';
import CalendarWidget from './CalendarWidget';
import GetService from '../../../utils/getService';
var getEntries = new GetService('/api/entries/');
var verifyService = new GetService('/api/verify/');

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
    componentWillMount: function() {
        verifyService.get().then(function(res) {
            getEntries.get([res.googleId]).then(function(response) {
                var events = [];
                response.forEach(function(event) {
                    var tags = [];

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
