import React, { PropTypes, Component } from 'react';
import {Jumbotron} from 'react-bootstrap';
import Export from './children/Export';

var Settings = React.createClass({
    render: function() {
        return (
            <div key="settings">
                <a href="#/dashboard/calendar" className="pull-right btn btn-primary btn-outline btn-rounded">Back to Calendar</a>
                <h2>Settings</h2>
                <Jumbotron>
                    <ul>
                        <Export googleId={this.props.googleId}/>
                        <li>Back Up Data</li>
                        <li>Delete Account</li>
                    </ul>
                </Jumbotron>
            </div>
        );
    }

});

module.exports = Settings;
