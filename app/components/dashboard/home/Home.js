import React from 'react';
import {hashHistory} from 'react-router';
import {Jumbotron, Panel, Button} from 'react-bootstrap';
import moment from 'moment';
import CustomTagCloud from './CustomTagCloud';
import EntryForm from '../entries/EntryForm';
import Entry from './Entry';
import GetService from '../../../utils/getService';

var getRandomEntry = new GetService('/api/entries/random/');
var getTags = new GetService('/api/tags/');
var verifyService = new GetService('/api/verify/');

var Home = React.createClass({
    getInitialState: function () {
        return {
            dateDisplay: 'today'
        }
    },
    setTerms: function (dateDisplay) {
        if (dateDisplay) {
            this.setState({dateDisplay: dateDisplay});
        } else {
            this.setState({dateDisplay: 'today'});
        }
    },
    getEntry: function (googleId) {
        return getRandomEntry.get([googleId]).then(function (entry) {
            var tags = [];
            if (entry.entryHasTags) {
                entry.entryHasTags.forEach(function (tag) {
                    tags.push(tag.text);
                });
            }
            entry.tags = tags;

            return entry;
        });
    },
    componentWillMount: function () {
        verifyService.get().then(function (idResponse) {
            getTags.get([idResponse.googleId]).then(function (tagResponse) {
                this.getEntry(idResponse.googleId).then(function (entry) {
                    this.setState({data: tagResponse, googleId: idResponse.googleId, randomEntry: entry});
                }.bind(this));
            }.bind(this));
        }.bind(this));
    },
    handleTagClick: function (tag) {
        hashHistory.push(`/dashboard/tags/${tag.value}`);
    },
    handleRefresh: function () {
        this.getEntry(this.state.googleId).then(function (entry) {
            this.setState({randomEntry: entry});
        }.bind(this));
    },

    render: function () {

        return (
            <div key='/dashboard/home'>
                <h2>Home</h2>

                {this.state.data &&
                <div>
                    <Jumbotron>
                        <h2>What is something that made you happy {this.state.dateDisplay}?</h2>
                        <EntryForm setTerms={this.setTerms} googleId={this.state.googleId}/>
                    </Jumbotron>
                    <Jumbotron>
                        <h2>Random Memento from {moment(this.state.randomEntry.date.split('T')[0]).format('MMMM DD[,] YYYY')}</h2>
                        <Panel
                            header={this.state.randomEntry.text}
                            bsStyle='primary'
                            footer={<a href={'#/dashboard/users/' + this.state.googleId + '/entries/' + this.state.randomEntry.id + '/edit'}>Edit</a>}
                        >
                            <Entry entry={this.state.randomEntry}/>
                        </Panel>
                        <Button bsStyle='info' onClick={this.handleRefresh}>
                            Refresh
                        </Button>
                    </Jumbotron>
                    <Jumbotron>
                        <h2>Your Top Tags</h2>
                        <CustomTagCloud
                            minSize={20}
                            maxSize={50}
                            colorOptions={{
                                luminosity: 'light',
                                hue: 'blue'
                            }}
                            tags={this.state.data}
                            onClick={this.handleTagClick}
                        />
                    </Jumbotron>
                </div>
                }

            </div>

        );
    }

});

module.exports = Home;