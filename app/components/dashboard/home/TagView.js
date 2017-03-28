import React from 'react';
import GetService from '../../../utils/getService';
import Entry from './Entry';
import {Accordion, Panel} from 'react-bootstrap';
var getTaggedEntries = new GetService('/api/tags/');
var verifyService = new GetService('/api/verify/');

var TagView = React.createClass({
    getInitialState: function() {
        return {
        };
    },
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
                        date: new Date(event.date),
                        tags: tags
                    });
                });
                this.setState({ entries: events });
            }.bind(this));
        }.bind(this));
    },
    render: function () {

        return (
            <div>
                <Accordion>
                {this.state.entries &&
                    this.state.entries.map(function(entry, i) {
                        return (
                            <Panel header={entry.title} eventKey={i}>
                                <Entry entry={entry}/>
                            </Panel>
                        )
                    })
                }
                </Accordion>
            </div>
        )
    }

});

module.exports = TagView;