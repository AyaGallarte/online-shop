import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

export default function PostModal({ show, handleClose, handleSave, post }) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [userPost, setPost] = useState('');

    useEffect(() => {

        if (post) {
            setTitle(post.title);
            setContent(post.content);
        }
    }, [post]);

    const handleSubmit = () => {
        const updatedPost = {
            ...post,
            title,
            content
        };
        handleSave(updatedPost);
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{post ? 'Edit Post' : 'Add Post'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="postTitle">
                        <Form.Label>Title</Form.Label>
                        <Form.Control 
                            type="text" 
                            value={title} 
                            onChange={(e) => setTitle(e.target.value)} 
                        />
                    </Form.Group>
                    <Form.Group controlId="postContent">
                        <Form.Label>Content</Form.Label>
                        <Form.Control 
                            as="textarea" 
                            rows={3} 
                            value={content} 
                            onChange={(e) => setContent(e.target.value)} 
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
