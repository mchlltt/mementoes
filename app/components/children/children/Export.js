import React, { PropTypes, Component } from 'react';
import {Jumbotron} from 'react-bootstrap';
import {CSVLink} from 'react-csv';
import GetService from './../../utils/getService';

var getEntries = new GetService('api/entries/');

var Export = React.createClass({
    getInitialState: function() {
        return {
            data: []
        };
    },
    componentDidMount: function() {
        getEntries.get([this.props.googleId]).then(function(response) {
            var entries = [];
            response.forEach(function(entry) {
                entries.push({entry: entry.text, date: entry.date});
            });
            this.setState({ data: entries });
        }.bind(this));
    },
    render: function() {
        return (
            <div key="settings">
                <a href="#/dashboard/calendar" className="pull-right btn btn-primary btn-outline btn-rounded">Back to Calendar</a>
                <h2>Settings</h2>
                <Jumbotron>
                    <CSVLink data={this.state.data}
                             filename={"mementoes_export.csv"}
                             className="btn btn-primary"
                             target="_blank">
                        Download Data
                    </CSVLink>
                </Jumbotron>
            </div>
        );
    }

});

module.exports = Export;