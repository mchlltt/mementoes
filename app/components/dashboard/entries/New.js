import React from 'react';
import {Jumbotron} from 'react-bootstrap';
import {Link} from 'react-router';
import EntryForm from './EntryForm';
import GetService from '../../../utils/getService';
var verifyService = new GetService('/api/verify/');

var New = React.createClass({
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
                <Link to="/dashboard/home" className="pull-right btn btn-primary btn-outline btn-rounded">Home</Link>
                <h2>New Memento</h2>
                <Jumbotron>
                    <h2>What is something that made you happy {this.state.dateDisplay}?</h2>
                    {this.state.googleId &&
                        <EntryForm setTerms={this.setTerms} googleId={this.state.googleId}/>
                    }
                </Jumbotron>
            </div>
        );
    }

});

module.exports = New;
