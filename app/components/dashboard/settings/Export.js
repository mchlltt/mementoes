// Import dependencies, components, and services.
import React from 'react';
import moment from 'moment';
import {CSVLink} from 'react-csv';
import GetService from '../../../utils/getService';

// Construct services.
let getEntries = new GetService('/api/entries/');
let verifyService = new GetService('/api/verify/');

// Create component.
let Export = React.createClass({
    getInitialState: function () {
        return {
            data: []
        };
    },
    componentWillMount: function () {
        verifyService.getRoute().then(function (res) {
            getEntries.getRoute([res.googleId]).then(function (response) {
                let entries = [];
                response.forEach(function (entry) {
                    let tags = [];

                    entry.entryHasTags.forEach(function(tag) {
                        tags.push(tag.text);
                    });

                    entries.push({
                        id: entry.id,
                        title: entry.text,
                        date: moment(entry.date).format().split('T')[0],
                        tags: tags
                    });
                });
                this.setState({data: entries});
            }.bind(this));
        }.bind(this));
    },
    render: function () {
        return (
            <CSVLink data={this.state.data}
                     style={{'marginBottom': '10px'}}
                     filename={"mementoes_export.csv"}
                     className="btn btn-primary"
                     target="_blank">
                Download Data
            </CSVLink>
        );
    }

});

module.exports = Export;