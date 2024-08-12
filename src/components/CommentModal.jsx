// import React, { useState, useEffect } from 'react';
// import { Modal, Button, Form } from 'react-bootstrap';

// export default function CommentModal({ show, handleClose, handleSave, postId, commentText, setCommentText, isEditing }) {
//     useEffect(() => {
//         // Log to verify the current state of commentText
//         console.log('in useEffect: ' + commentText, isEditing === true); //commentText is undefined, isEditing is false here

//         // Only clear the commentText if not editing and the modal is shown
//         if (!isEditing && show) {

//             console.log('if !isEditing : ' + commentText); 
//             setCommentText(''); 
//         }
//     }, [show, isEditing, setCommentText]);

//     const handleSubmit = () => {
//         handleSave(postId, commentText);
//     };
//     return (
//         <Modal show={show} onHide={handleClose}>
//             <Modal.Header closeButton>
//                 <Modal.Title>{isEditing ? 'Edit Comment' : 'Add Comment'}</Modal.Title>
//             </Modal.Header>
//             <Modal.Body>
//                 <Form>
//                     <Form.Group controlId="formComment">
//                         <Form.Label>Comment</Form.Label>
//                         <Form.Control
//                             as="textarea"
//                             rows={3}
//                             value={commentText || ''}
//                             onChange={(e) => setCommentText(e.target.value)}
//                         />
//                     </Form.Group>
//                 </Form>
//             </Modal.Body>
//             <Modal.Footer>
//                 <Button variant="secondary" onClick={handleClose}>
//                     Close
//                 </Button>
//                 <Button variant="primary" onClick={() => handleSave(postId)}>
//                     {isEditing ? 'Save Changes' : 'Save Comment'}
//                 </Button>
//             </Modal.Footer>
//         </Modal>
//     );
// }


import React, { useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

export default function CommentModal({ show, handleClose, handleSave, postId, commentText, setCommentText, isEditing }) {
    useEffect(() => {
        console.log('in useEffect: ' + commentText, isEditing === true); // Check values

        if (!isEditing && show) {
            setCommentText(''); // Clear the textarea when not editing
        }
    }, [show, isEditing]); // No need to include setCommentText in dependencies

    const handleSubmit = () => {
        handleSave(postId, commentText);
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{isEditing ? 'Edit Comment' : 'Add Comment'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formComment">
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            value={commentText || ''}
                            onChange={(e) => setCommentText(e.target.value)}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    {isEditing ? 'Save Changes' : 'Save Comment'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
