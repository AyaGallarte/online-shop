import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

export default function CommentModal({ show, handleClose, handleSave, postId }) {
    const [comment, setComment] = useState('');

    const handleSubmit = () => {
        handleSave(postId, comment);
        setComment('');
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add Comment</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formComment">
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Save Comment
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
