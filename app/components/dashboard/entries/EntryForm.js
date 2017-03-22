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

import PutService from '../../../utils/putService';
import PostService from '../../../utils/postService';
import DeleteService from '../../../utils/deleteService';
import GetService from '../../../utils/getService';

var postEntry = new PostService('/api/entries/');
var putEntry = new PutService('/api/entries/');
var deleteEntry = new DeleteService('/api/entries/');
var getEntries = new GetService('/api/entries/');

var ToastMessageFactory = React.createFactory(ToastMessage.jQuery);

var EntryForm = React.createClass({
    addAlert: function(message) {
        this.refs.container.success(message);
    },
    getInitialState: function() {
        return {
            entry: '',
            date: moment(),
            tags: []
        };
    },
    componentWillMount: function () {
        if (this.props.entryId) {
            getEntries.get([this.props.googleId, this.props.entryId]).then(function(response) {
                let entry = response[0].text;
                let date = moment(response[0].date);
                let tagsResponse = response[0].entryHasTags;
                let tags = [];
                tagsResponse.forEach(function(tag) {
                    tags.push(tag.text);
                });

                this.setState({
                    entry: entry,
                    date: date,
                    tags: tags

                });

                this.handleDateChange(date);

            }.bind(this));
        }
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

        if (this.props.entryId) {
            putEntry.put({
                entryId: this.props.entryId,
                googleId: this.props.googleId,
                text: text,
                tags: tags,
                date: date
            });
            this.addAlert('Edit saved!');
        } else {
            postEntry.post({
                googleId: this.props.googleId,
                text: text,
                tags: tags,
                date: date
            });

            this.setState({
                entry: '',
                date: moment(),
                tags: []
            });

            this.addAlert('Posted!');
        }
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
        deleteEntry.delete([this.props.googleId, this.props.entryId]).then(function() {
            this.addAlert('Entry deleted!');
        }.bind(this));
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
                    {this.props.entryId &&
                        <div>
                            <Button bsStyle='success' type='submit'>Save</Button>
                            <Button bsStyle='danger' onClick={this.handleDelete}>Delete</Button>
                        </div>
                    }
                    {!this.props.entryId &&
                        <div>
                            <Button bsStyle='success' type='submit'>Submit</Button>
                            <Button bsStyle='danger' onClick={this.handleReset}>Reset</Button>
                        </div>
                    }
                </form>
            </div>


        );
    }

});

module.exports = EntryForm;
