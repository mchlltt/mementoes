import React, { PropTypes, Component } from 'react';
import {Button, FormControl} from 'react-bootstrap';
import PostService from '../../utils/postService';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import {ToastContainer, ToastMessage} from 'react-toastr';

window.jQuery = require('jquery');

import 'react-datepicker/dist/react-datepicker.css';
import './styles/datepicker.css';
import './styles/animate.css';
import './styles/toastr.min.css';


var postEntry = new PostService('/api/new');

var ToastMessageFactory = React.createFactory(ToastMessage.jQuery);

var EntryForm = React.createClass({
    addAlert: function() {
        this.refs.container.success('Posted!');
    },
    getInitialState: function() {
        return {
            entry: '',
            date: moment()
        };
    },
    handleReset: function(e) {
        e.preventDefault();
        this.setState({
            entry: '',
            date: moment()
        });
        this.handleDateChange(moment());
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
            entry: '',
            date: moment()
        });

        this.addAlert();
    },
    handleEntryChange: function(event) {
        var newState = {};
        newState[event.target.id] = event.target.value;
        this.setState(newState);
    },
    handleDateChange: function(date) {
        this.setState({date: date});

        // Get the formatted version of the date.
        var formattedDate = date.format('MMMM Do');

        // If the formatted version of the date is the same as the formatted version of today's date, use 'today'.
        if (formattedDate === moment().format('MMMM Do')) {
            this.props.setTerms('today');
        // Else, use the formatted date.
        } else {
            this.props.setTerms('on ' + formattedDate);
        }
    },
    render: function() {
        return (
            <div>
                <ToastContainer
                    toastMessageFactory={ToastMessageFactory}
                    ref="container"
                    className="toast-top-right"
                />
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
