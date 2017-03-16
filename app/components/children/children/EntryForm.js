import React, { PropTypes, Component } from 'react';
import {Button, FormControl} from 'react-bootstrap';
import PostService from '../../utils/postService';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

var postEntry = new PostService('/api/new');

var EntryForm = React.createClass({
    getInitialState: function() {
        return {
            entry: '',
            date: moment(),
            dateDisplay: 'today'
        };
    },
    handleReset: function(e) {
        e.preventDefault();
        this.setState({
            entry: ''
        });
    },
    onSubmit: function(e) {
        e.preventDefault();

        var text = this.state.entry;
        var UserId = 1;
        var date = new Date(this.state.date);

        postEntry.post({
            UserId: UserId,
            text: text,
            date: date
        });

        this.setState({
            entry: ''
        });

        alert('Posted!');
    },
    handleEntryChange: function(event) {
        var newState = {};
        newState[event.target.id] = event.target.value;
        this.setState(newState);
    },
    handleDateChange: function(date) {
        this.setState(
            {date: date,
            dateDisplay: 'on ' + date.format('MMMM Do')
            }
        )
    },
    render: function() {
        return (
            <div>
                {this.state.dateDisplay}
                <form className={this.props.className} onSubmit={this.onSubmit} action="">
                    <DatePicker
                        selected={this.state.date}
                        onChange={this.handleDateChange} />
                    <FormControl
                        componentClass="textarea"
                        id="entry"
                        value={this.state.entry}
                        rows="5"
                        placeholder='Your entry'
                        onChange={this.handleEntryChange}
                        required={true}
                    />
                    <Button bsStyle='success' type='submit'>Submit</Button>
                    <Button bsStyle='danger' onClick={this.handleReset}>Reset</Button>
                </form>
            </div>


        );
    }

});

module.exports = EntryForm;
