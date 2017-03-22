import React from 'react';
import {Button, FormControl} from 'react-bootstrap';
import DeleteModal from './DeleteModal';

var Delete = React.createClass({
    getInitialState: function() {
        return({modal: false})
    },
    showModal: function() {
        this.setState({modal: true});
    },
    hideModal: function() {
        this.setState({modal: false});
    },
    render: function() {
        return (
            <div>
                {this.state.modal &&
                    <DeleteModal hideModal={this.hideModal} googleId={this.props.googleId}/>
                }
                <Button bsStyle='danger' onClick={this.showModal}>Delete Account</Button>
            </div>
        );
    }

});

module.exports = Delete;