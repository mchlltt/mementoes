import React, { PropTypes, Component } from 'react';
import {Button, FormControl} from 'react-bootstrap';
import PostService from '../../utils/postService';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './datepicker.css';
import moment from 'moment';

var postEntry = new PostService('/api/new');

var EntryForm = React.createClass({
    getInitialState: function() {
        return {
            entry: '',
            date: moment()
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
        var date = new Date(this.state.date);

        postEntry.post({
            googleId: this.props.googleId,
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
        this.setState({date: date});

        this.props.setTerms('on ' + date.format('MMMM Do'));
    },
    render: function() {
        return (
            <div>
                {this.state.dateDisplay}
                <form className={this.props.className} onSubmit={this.onSubmit} action="">
                    <DatePicker
                        selected={this.state.date}
                        onChange={this.handleDateChange}
                        className='form-control'
                        maxDate={new Date()}
                        fixedHeight={true}
                    />
                    <FormControl
                        componentClass='textarea'
                        id='entry'
                        value={this.state.entry}
                        rows='5'
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
