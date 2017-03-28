import React from 'react';
import {Button, FormControl, Modal} from 'react-bootstrap';
import {browserHistory} from 'react-router';
import DeleteService from '../../../utils/deleteService';
import GetService from '../../../utils/getService';

var deleteUser = new DeleteService('/api/users/');
var logOut = new GetService('/api/logout/');

const DeleteModal = React.createClass({
    handleDelete() {
        deleteUser.delete([this.props.googleId]);
        logOut.get();
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