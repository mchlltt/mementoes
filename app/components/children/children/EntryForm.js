import React, { PropTypes, Component } from 'react';
import {Button, FormControl} from 'react-bootstrap';
import PostService from '../../utils/postService';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './datepicker.css';
import moment from 'moment';
import {ToastContainer, ToastMessage} from 'react-toastr';
import './animate.css';
import './toastr.min.css';


var $ = require('jquery');
window.jQuery = $;

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
                    <Button bsStyle='success' type='submit' onClick={this.addAlert}>Submit</Button>
                    <Button bsStyle='danger' onClick={this.handleReset}>Reset</Button>
                </form>
            </div>


        );
    }

});

module.exports = EntryForm;
