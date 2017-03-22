import React from 'react';
import {Jumbotron} from 'react-bootstrap';
import Export from './Export';
import Delete from './Delete';

import GetService from '../../../utils/getService';
var verifyService = new GetService('/api/verify/');

var Settings = React.createClass({
    getInitialState: function () {
        return {}
    },
    componentWillMount: function () {
        verifyService.get().then(function (response) {
            this.setState({googleId: response.googleId});
        }.bind(this));
    },
    render: function() {
        return (
            <div key="settings">
                <a href="#/dashboard/calendar" className="pull-right btn btn-primary btn-outline btn-rounded">Back to Calendar</a>
                <h2>Settings</h2>
                <Jumbotron>
                    <Export googleId={this.state.googleId}/>
                    <Delete googleId={this.state.googleId}/>
                </Jumbotron>
            </div>
        );
    }

});

module.exports = Settings;
