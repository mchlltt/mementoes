import React from 'react';
import {CSVLink} from 'react-csv';
import GetService from '../../../utils/getService';
import moment from 'moment';

var getEntries = new GetService('/api/entries/');
var verifyService = new GetService('/api/verify/');

var Export = React.createClass({
    getInitialState: function () {
        return {
            data: []
        };
    },
    componentWillMount: function () {
        verifyService.get().then(function (res) {
            getEntries.get([res.googleId]).then(function (response) {
                var entries = [];
                response.forEach(function (entry) {
                    var tags = [];

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