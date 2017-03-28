import React from 'react';
import GetService from '../../../utils/getService';
var getTaggedEntries = new GetService('/api/tags/');
var verifyService = new GetService('/api/verify/');

var Charts = React.createClass({
    componentWillMount: function() {
        verifyService.get().then(function(res) {
            getTaggedEntries.get([res.googleId, this.props.text]).then(function(response) {
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
                this.setState({ events: events });
            }.bind(this));
        }.bind(this));
    },
    render: function () {

        return (
            <p>{this.props.text}</p>
        );
    }

});

module.exports = Charts;