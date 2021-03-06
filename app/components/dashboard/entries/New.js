// Import dependencies, components, and services.
import React from 'react';
import {Link} from 'react-router';
import {Jumbotron} from 'react-bootstrap';
import EntryForm from './EntryForm';
import GetService from '../../../utils/getService';

// Construct services.
let verifyService = new GetService('/api/verify/');

// Create component.
let New = React.createClass({
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
            this.setState({
                googleId: response.googleId,
                date: this.props.params[3]
            });
        }.bind(this));
    },
    render: function () {
        return (
            <div key="/dashboard/new">
                <Link to="/dashboard/home" className="pull-right btn btn-primary btn-outline btn-rounded">Home</Link>
                <h2>New Memento</h2>
                <Jumbotron>
                    <h2>What is something that made you happy {this.state.dateDisplay}?</h2>
                    {this.state.googleId &&
                        <EntryForm setTerms={this.setTerms} googleId={this.state.googleId} goBack={true} date={this.state.date}/>
                    }
                </Jumbotron>
            </div>
        );
    }

});

module.exports = New;
