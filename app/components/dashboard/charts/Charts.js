import React from 'react';
import {Jumbotron} from 'react-bootstrap';

import GetService from '../../../utils/getService';
var verifyService = new GetService('api/verify/');

var Charts = React.createClass({
    getInitialState: function () {
        return {}
    },
    componentWillMount: function () {
        verifyService.get().then(function (response) {
            this.setState({googleId: response.googleId});
        }.bind(this));
    },
    render: function () {
        return (

            <div key="/dashboard/charts">
                <a href="#/dashboard/calendar" className="pull-right btn btn-primary btn-outline btn-rounded">Back to Calendar</a>
                <h2>Charts</h2>

                <Jumbotron>
                    <h2>Add Charts here</h2>
                </Jumbotron>
            </div>

        );
    }

});

module.exports = Charts;