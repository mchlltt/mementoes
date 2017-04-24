// Import dependencies, components, and services.
import React from 'react';
import {Link} from 'react-router';
import {Jumbotron} from 'react-bootstrap';
import EntryForm from './EntryForm';
import GetService from '../../../utils/getService';

// Construct services.
let verifyService = new GetService('/api/verify/');

// Create component.
let Edit = React.createClass({
    getInitialState: function () {
        return {
            dateDisplay: 'today'
        };
    },
    setTerms: function (dateDisplay) {
        if (dateDisplay) {
            this.setState({dateDisplay});
        } else {
            this.setState({dateDisplay: 'today'})
        }
    },
    componentWillMount: function () {
        verifyService.getRoute().then(function (response) {
            this.setState({googleId: response.googleId});
        }.bind(this));
    },
    render: function () {
        return (
            <div key="/dashboard/new">
                <Link to="/dashboard/home" className="pull-right btn btn-primary btn-outline btn-rounded">Home</Link>
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
