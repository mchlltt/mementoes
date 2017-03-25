import React from 'react';
import {Jumbotron} from 'react-bootstrap';
import BarChart from './BarChart';

import GetService from '../../../utils/getService';
var verifyService = new GetService('/api/verify/');

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
                    <BarChart/>
                </Jumbotron>
            </div>

        );
    }

});

module.exports = Charts;