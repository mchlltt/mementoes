import React from 'react';
import {Button, FormControl, Modal} from 'react-bootstrap';
// import PostService from '../../../utils/postService';

const DeleteModal = React.createClass({
    deleteItem() {
        console.log('deleting!');
        this.props.hideModal();
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
                    <Button onClick={this.deleteItem}>Delete</Button>
                    <Button onClick={this.props.hideModal}>Cancel</Button>
                </Modal.Footer>
            </Modal>
        );
    }
});

module.exports = DeleteModal;