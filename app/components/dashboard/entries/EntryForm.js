import React from 'react';
import {Button, FormControl} from 'react-bootstrap';
import {ToastContainer, ToastMessage} from 'react-toastr';
import {hashHistory} from 'react-router';
import DatePicker from 'react-datepicker';
import TagsInput from 'react-tagsinput';
import moment from 'moment';
import PutService from '../../../utils/putService';
import PostService from '../../../utils/postService';
import DeleteService from '../../../utils/deleteService';
import GetService from '../../../utils/getService';

window.jQuery = require('jquery');
var ToastMessageFactory = React.createFactory(ToastMessage.jQuery);

var postEntry = new PostService('/api/entries/');
var putEntry = new PutService('/api/entries/');
var deleteEntry = new DeleteService('/api/entries/');
var getEntries = new GetService('/api/entries/');

var EntryForm = React.createClass({
    addAlert: function(message) {
        this.refs.container.success(message);
        setTimeout(this.closeAlert, 2000);
    },
    closeAlert: function() {
        this.refs.container.clear();
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
        this.closeAlert();
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
            setTimeout(hashHistory.goBack, 2000);
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
        deleteEntry.delete([this.props.googleId, this.props.entryId]);
        this.addAlert('Entry deleted!');
        setTimeout(hashHistory.goBack, 2000);
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
                        className='form-control'
                        placeholder='Your entry'
                        onChange={this.handleTextChange}
                        required={true}
                    />
                    <TagsInput
                        id='tags'
                        value={this.state.tags}
                        onChange={this.handleChange}
                        inputProps={{placeholder: 'Hit enter to add a tag'}}
                        onlyUnique
                    />
                    {this.props.entryId &&
                        <div>
                            <Button bsStyle='success' type='submit' className='buttons'>Save</Button>
                            <Button bsStyle='danger' onClick={this.handleDelete} className='right-button buttons'>Delete</Button>
                        </div>
                    }
                    {!this.props.entryId &&
                        <div>
                            <Button bsStyle='success' type='submit' className='buttons'>Submit</Button>
                            <Button bsStyle='danger' onClick={this.handleReset} className='right-button buttons'>Reset</Button>
                        </div>
                    }
                </form>
            </div>


        );
    }

});

module.exports = EntryForm;
