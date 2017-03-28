import React from 'react';
import GetService from '../../../utils/getService';
import Entry from './Entry';
import {Accordion, Panel} from 'react-bootstrap';
var getTaggedEntries = new GetService('/api/tags/');
var verifyService = new GetService('/api/verify/');

var TagView = React.createClass({
    getInitialState: function() {
        return {};
    },
    componentWillMount: function() {
        verifyService.get().then(function(res) {
            getTaggedEntries.get([res.googleId, this.props.text]).then(function(response) {
                var entries = [];

                response.forEach(function(entry) {
                    var tags = [];

                    if (entry.entryHasTags) {
                        entry.entryHasTags.forEach(function(tag) {
                            tags.push(tag.text);
                        });
                    }

                    entries.push({
                        googleId: entry.googleId,
                        id: entry.id,
                        title: entry.text,
                        date: entry.date,
                        tags: tags
                    });
                });
                this.setState({ entries });
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
                            <Panel header={entry.title} eventKey={i} key={i}>
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