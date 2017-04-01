// Import dependencies, components, and services.
import React from 'react';
import moment from 'moment';
import {browserHistory, Link} from 'react-router';
import {Jumbotron, Panel, Button} from 'react-bootstrap';
import CustomTagCloud from './CustomTagCloud';
import EntryForm from '../entries/EntryForm';
import Entry from './Entry';
import GetService from '../../../utils/getService';

// Construct services.
let getRandomEntry = new GetService('/api/entries/random/');
let getTags = new GetService('/api/tags/');
let verifyService = new GetService('/api/verify/');

// Create component.
let Home = React.createClass({
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
        return getRandomEntry.getRoute([googleId]).then(function (entry) {
            if (entry) {
                let tags = [];

                if (entry.entryHasTags) {
                    entry.entryHasTags.forEach(function (tag) {
                        tags.push(tag.text);
                    });
                }

                entry.tags = tags;

                return entry;
            }
        });
    },
    componentWillMount: function () {
        verifyService.getRoute().then(function (idResponse) {
            this.setState({googleId: idResponse.googleId});
            getTags.getRoute([idResponse.googleId]).then(function (tagResponse) {
                this.getEntry(idResponse.googleId).then(function (entry) {
                    this.setState({data: tagResponse, randomEntry: entry});
                }.bind(this));
            }.bind(this));
        }.bind(this));
    },
    handleTagClick: function (tag) {
        browserHistory.push(`/dashboard/tags/${tag.value}`);
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
                <div>
                    <Jumbotron>
                        <h2>What is something that made you happy {this.state.dateDisplay}?</h2>
                        {this.state.googleId &&
                        <EntryForm setTerms={this.setTerms} googleId={this.state.googleId}/>
                        }
                    </Jumbotron>
                    <Jumbotron>
                        {!this.state.randomEntry &&
                        <h2>Random Memento</h2>
                        }
                        {this.state.randomEntry && this.state.randomEntry.length > 0 &&
                        <div>
                            <h2>Random Memento
                                from {moment(this.state.randomEntry.date.split('T')[0]).format('MMMM DD[,] YYYY')}</h2>
                            <Panel
                                header={this.state.randomEntry.text}
                                bsStyle='primary'
                                footer={<Link
                                    to={'/dashboard/users/' + this.state.googleId + '/entries/' + this.state.randomEntry.id + '/edit'}>Edit</Link>}
                            >
                                <Entry entry={this.state.randomEntry}/>
                            </Panel>
                            <Button bsStyle='info' onClick={this.handleRefresh}>
                                Refresh
                            </Button>
                        </div>
                        }
                    </Jumbotron>


                    <Jumbotron>
                        <h2>Your Top Tags</h2>
                        {this.state.data && this.state.data.length > 0 &&
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
                        }
                    </Jumbotron>

                </div>
            </div>

        );
    }

});

module.exports = Home;