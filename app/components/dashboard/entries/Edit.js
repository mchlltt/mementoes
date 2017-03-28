import React from 'react';
import {Jumbotron} from 'react-bootstrap';
import EntryForm from './EntryForm';

import GetService from '../../../utils/getService';
var verifyService = new GetService('/api/verify/');

var Edit = React.createClass({
    getInitialState: function () {
        return {
            dateDisplay: 'today'
        };
    },
    setTerms: function (dateDisplay) {
        if (dateDisplay) {
            this.setState({dateDisplay: dateDisplay});
        } else {
            this.setState({dateDisplay: 'today'});
        }
    },
    componentWillMount: function () {
        verifyService.get().then(function (response) {
            this.setState({googleId: response.googleId});
        }.bind(this));
    },
    render: function () {
        return (
            <div key="/dashboard/new">
                <a href="/dashboard/calendar" className="pull-right btn btn-primary btn-outline btn-rounded">Back to
                    Calendar</a>
                <h2>Edit Post</h2>
                <Jumbotron>
                    <h2>Editing an entry created {this.state.dateDisplay}</h2>
                    <EntryForm setTerms={this.setTerms} googleId={this.props.params[3]} entryId={this.props.params[5]}/>
                </Jumbotron>
            </div>
        );
    }

});

module.exports = Edit;
