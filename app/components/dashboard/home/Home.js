import React from 'react';
import _ from 'lodash';
import {hashHistory} from 'react-router';
import {Jumbotron} from 'react-bootstrap';
import {TagCloud} from "react-tagcloud";
import GetService from '../../../utils/getService';
import TagView from './TagView';
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
        this.setState({currentTag: tag.value});
    },
    render: function () {

        let showCloud = this.state.data && !this.state.currentTag;

        return (
            <div key="/dashboard/home">
                <h2>Home</h2>

                <Jumbotron>
                    {showCloud &&
                        <TagCloud
                            minSize={20}
                            maxSize={40}
                            colorOptions={{
                                luminosity: 'light',
                                hue: 'blue'
                            }}
                            tags={this.state.data}
                            onClick={this.handleTagClick}
                        />
                    }
                    {this.state.currentTag &&
                        <TagView text={this.state.currentTag}/>
                    }
                </Jumbotron>
            </div>

        );
    }

});

module.exports = Home;