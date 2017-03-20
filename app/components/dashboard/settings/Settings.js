import React, { PropTypes, Component } from 'react';
import {Jumbotron} from 'react-bootstrap';
import Export from './Export';
import Delete from './Delete';

var Settings = React.createClass({
    render: function() {
        return (
            <div key="settings">
                <a href="#/dashboard/calendar" className="pull-right btn btn-primary btn-outline btn-rounded">Back to Calendar</a>
                <h2>Settings</h2>
                <Jumbotron>
                    <Export googleId={this.props.googleId}/>
                    <Delete googleId={this.props.googleId}/>
                </Jumbotron>
            </div>
        );
    }

});

module.exports = Settings;
