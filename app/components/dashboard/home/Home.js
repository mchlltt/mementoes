import React from 'react';
import {hashHistory} from 'react-router';
import {Jumbotron} from 'react-bootstrap';
import {TagCloud} from "react-tagcloud";
import GetService from '../../../utils/getService';
var getTags = new GetService('/api/tags/');
var verifyService = new GetService('/api/verify/');

var Home = React.createClass({
    getInitialState: function() {
        return {}
    },
    componentWillMount: function() {
        verifyService.get().then(function(res) {
            getTags.get([res.googleId]).then(function(response) {
                this.setState({ data: response });
            }.bind(this));
        }.bind(this));
    },
    handleTagClick: function(tag) {
        hashHistory.push(`/dashboard/tags/${tag.value}`);
    },
    shouldComponentUpdate: function(nextProps, nextState) {
        // Prevent TagCloud from rerendering on handleTagClick.
        return this.state.data !== nextState.data;
    },
    render: function () {

        return (
            <div key="/dashboard/home">
                <h2>Home</h2>

                <Jumbotron>
                    {this.state.data &&
                        <div>
                            <h2>Top Tags</h2>
                            <TagCloud
                                minSize={20}
                                maxSize={50}
                                colorOptions={{
                                    luminosity: 'light',
                                    hue: 'blue'
                                }}
                                tags={this.state.data}
                                onClick={this.handleTagClick}
                            />
                        </div>
                    }
                </Jumbotron>
            </div>

        );
    }

});

module.exports = Home;