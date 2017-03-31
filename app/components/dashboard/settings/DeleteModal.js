// Import dependencies, components, and services.
import React from 'react';
import {browserHistory} from 'react-router';
import {Button, FormControl, Modal} from 'react-bootstrap';
import DeleteService from '../../../utils/deleteService';
import GetService from '../../../utils/getService';

// Construct services.
let deleteUser = new DeleteService('/api/users/');
let logOut = new GetService('/api/logout/');

// Create component.
let DeleteModal = React.createClass({
    handleDelete() {
        deleteUser.deleteItem([this.props.googleId], this.props.googleId);
        logOut.getRoute();
        browserHistory.push('/logged-out');
    },
    render() {
        return (
            <Modal
                {...this.props}
                show={true}
                onHide={this.props.hideModal}
                dialogClassName="custom-modal"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-lg">Delete Account</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to delete your account? This cannot be undone!</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.handleDelete}>Delete</Button>
                    <Button onClick={this.props.hideModal}>Cancel</Button>
                </Modal.Footer>
            </Modal>
        );
    }
});

module.exports = DeleteModal;