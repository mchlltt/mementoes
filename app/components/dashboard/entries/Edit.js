import React, {PropTypes, Component} from 'react';
import {Jumbotron} from 'react-bootstrap';
import EntryForm from './EntryForm';

var Edit = React.createClass({
    getInitialState: function () {
        return {
            dateDisplay: 'today'
        };
    },
    setTerms: function (dateDisplay) {
        if (dateDisplay) {
            this.setState(
                {
                    dateDisplay: dateDisplay
                }
            );
        } else {
            this.setState(
                {
                    dateDisplay: 'today'
                }
            );
        }
    },
    render: function () {
        return (
            <div key="/dashboard/new">
                <a href="#/dashboard/calendar" className="pull-right btn btn-primary btn-outline btn-rounded">Back to
                    Calendar</a>
                <h2>New Post</h2>
                <Jumbotron>
                    <h2>Editing an entry created {this.state.dateDisplay}</h2>
                    <EntryForm setTerms={this.setTerms} googleId={this.props.googleId} new={false} entryId={this.props.entryId}/>
                </Jumbotron>
            </div>
        );
    }

});

module.exports = Edit;
