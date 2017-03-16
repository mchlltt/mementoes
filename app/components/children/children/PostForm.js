import React, { PropTypes, Component } from 'react';
import {Button, Input} from 'react-bootstrap';

var PostForm = React.createClass({
    getInitialState: function() {
        return {
            post: ''
        };
    },
    handleReset: function(e) {
        e.preventDefault();
        this.setState({
            post: ''
        });
    },
    onSubmit: function(e) {
        e.preventDefault();
        console.log(this.state.post);
    },
    handleChange: function(event) {
        var newState = {};
        newState[event.target.id] = event.target.value;
        this.setState(newState);
    },
    render: function() {
        return (
            <div>
                <form className={this.props.className} onSubmit={this.onSubmit} action="">
                    <Input
                        id="post"
                        value={this.state.post}
                        type='textarea'
                        rows="5"
                        placeholder='Your post'
                        onChange={this.handleChange}
                    />
                    <Button bsStyle='success' type='submit'>Submit</Button>
                    <Button bsStyle='danger' onClick={this.handleReset}>Reset</Button>
                </form>
            </div>


        );
    }

});

module.exports = PostForm;
