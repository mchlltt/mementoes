import React from 'react';
import {Button, FormControl} from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import TagsInput from 'react-tagsinput';

import moment from 'moment';
import {ToastContainer, ToastMessage} from 'react-toastr';

window.jQuery = require('jquery');

import 'react-datepicker/dist/react-datepicker.css';
import 'react-tagsinput/react-tagsinput.css';
import '../../../styles/datepicker.css';
import '../../../styles/animate.css';
import '../../../styles/toastr.min.css';
import '../../../styles/tags-input.css';

import PostService from '../../../utils/postService';
import DeleteService from '../../../utils/deleteService';
import GetService from '../../../utils/getService';

var postEntry = new PostService('/api/new');
var deleteEntry = new DeleteService('/api/delete');
var verifyService = new GetService('/api/verify');

var ToastMessageFactory = React.createFactory(ToastMessage.jQuery);

var EntryForm = React.createClass({
    addAlert: function() {
        this.refs.container.success('Posted!');
    },
    getInitialState: function() {
        return {
            entry: '',
            date: moment(),
            tags: []
        };
    },
    componentWillMount: function () {
        verifyService.get().then(function (response) {
            this.setState({googleId: response.googleId});
        }.bind(this));
    },
    componentWillUnmount: function () {
        this.refs.container.clear();
    },
    handleReset: function(e) {
        e.preventDefault();
        this.setState({
            entry: '',
            date: moment(),
            tags: []
        });
        this.handleDateChange(moment());
    },
    onSubmit: function(e) {
        e.preventDefault();

        var tags = this.state.tags;
        var text = this.state.entry;
        var date = new Date(this.state.date);

        postEntry.post({
            googleId: this.state.googleId,
            text: text,
            tags: tags,
            date: date
        });

        this.setState({
            entry: '',
            date: moment(),
            tags: []
        });

        this.addAlert();
    },
    handleTextChange: function(event) {
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
    handleChange: function(tags) {
        this.setState({tags})
    },
    handleDelete: function() {
        deleteEntry({
            googleId: this.state.googleId,
            id: this.props.entryId
        });
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
                        onChange={this.handleTextChange}
                        required={true}
                    />
                    <TagsInput
                        id='tags'
                        value={this.state.tags}
                        onChange={this.handleChange}
                        inputProps={{placeholder: 'Hit enter to add a tag.'}}
                        onlyUnique
                    />
                    <Button bsStyle='success' type='submit'>Submit</Button>
                    {this.props.new &&
                        <Button bsStyle='danger' onClick={this.handleReset}>Reset</Button>
                    }
                    {!this.props.new &&
                        <Button bsStyle='danger' onClick={this.handleDelete}>Delete</Button>
                    }

                </form>
            </div>


        );
    }

});

module.exports = EntryForm;
