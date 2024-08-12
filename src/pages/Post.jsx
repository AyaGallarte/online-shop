import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Card, Row, Col, Button, Modal, Form } from 'react-bootstrap';
import UserContext from '../context/UserContext';
import CommentModal from '../components/CommentModal'; 
import Swal from 'sweetalert2';

export default function Post() {
    const { postId } = useParams();
    const { user } = useContext(UserContext);
    const [postUserId, setPostUserId] = useState("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [author, setAuthor] = useState("");
    const [comments, setComments] = useState([]);
    const [createdOn, setCreatedOn] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [editCommentId, setEditCommentId] = useState(null);
    const [editCommentText, setEditCommentText] = useState('');
    const [refreshKey, setRefreshKey] = useState(0);
    const [isEditing, setIsEditing] = useState(false);
    const [commentText, setCommentText] = useState('');

    // Fetch post and comments
    useEffect(() => {
        fetch(`http://localhost:4000/posts/getPost/${postId}`)
            .then(res => res.json())
            .then(data => {
                setTitle(data.title);
                setContent(data.content);
                setAuthor(data.author);
                setComments(data.comments || []); // Default to empty array if undefined
                setCreatedOn(data.createdOn);
                setPostUserId(data.userId);
            })
            .catch(error => console.error('Error fetching post data:', error));
    }, [postId, refreshKey]);

    const handleCloseModal = () => setShowModal(false);

    // Function to handle opening the modal for adding a new comment
    const handleAddComment = () => {
        setEditCommentId(null); // Clear the ID since we're adding a new comment
        setCommentText(''); // Clear the textarea
        setIsEditing(false); // Set editing to false
        setShowModal(true);
    };

    const handleSaveComment = (postId, comment) => {
        let token = localStorage.getItem('token');
        fetch(`http://localhost:4000/posts/addComment/${postId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ comments: comment })
        })
        .then(res => res.json())
        .then(data => {
            if (data.message === "Post not found") {
                Swal.fire({ title: "Comment Add Failed", icon: "error", text: data.error });
            } else {
                setRefreshKey(prevKey => prevKey + 1);
                Swal.fire({ title: "Add Comment Successful", icon: "success", text: "Comment added successfully.", showConfirmButton: false, timer: 1500 });
                setShowModal(false);
            }
        })
        .catch(error => console.error('There was a problem with the fetch operation:', error));
    };

    const handleEditComment = (commentId, commentText) => {
        console.log('handleEdit ' + commentText); // commentText is okay here
        setIsEditing(true);
        setCommentText(commentText); 
        setEditCommentId(commentId);
        setShowModal(true);
    };

    const handleSaveEditComment = () => {
        let token = localStorage.getItem('token');

        fetch(`http://localhost:4000/posts/editComment/${postId}/${editCommentId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ comments: editCommentText })

        })
        .then(res => res.json())
        .then(data => {
            if (data.message === "Comment not found") {
                Swal.fire({ title: "Edit Comment Failed", icon: "error", text: data.error });
            } else {
                setRefreshKey(prevKey => prevKey + 1);
                Swal.fire({ 
                    title: "Edit Comment Successful", 
                    icon: "success", 
                    text: "Comment edited successfully.", 
                    showConfirmButton: false, 
                    timer: 1500 });
                setShowModal(false);
            }
        })
        .catch(error => console.error('There was a problem with the fetch operation:', error));
    };

    const handleDeleteComment = (commentId) => {
        let token = localStorage.getItem('token');
        fetch(`http://localhost:4000/posts/deleteComment/${postId}/${commentId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(data => {
            if (data.message === "Comment not found") {
                Swal.fire({ title: "Delete Comment Failed", icon: "error", text: data.error });
            } else {
                setRefreshKey(prevKey => prevKey + 1);
                Swal.fire({ title: "Delete Comment Successful", icon: "success", text: "Comment deleted successfully.", showConfirmButton: false, timer: 1500 });
            }
        })
        .catch(error => console.error('There was a problem with the fetch operation:', error));
    };

    return (
        <Container className="container">
            <h2 className="page-title text-center mt-4">{title}</h2>
            <Row className="mt-4">
                <Col className="mb-4">
                    <Card className="card h-100">
                        <Card.Body className="cardBody">
                            <Card.Text className="custom-card-description">
                                {content}
                            </Card.Text>
                            <div><strong>Author:</strong> {author}</div>
                            <div><strong>Created On:</strong> {new Date(createdOn).toLocaleDateString()}</div>
                        </Card.Body>
                    </Card>
                </Col>
                <div>
                    <Col>
                        <Card className="card h-100">
                            <Card.Body className="cardBody">
                                <strong>Comments:</strong> {comments.length}
                                {comments.length > 0 ? (
                                    comments.map((comment) => (
                                        <div key={comment._id} className="custom-card-comments">
                                            <Card className="card h-100 mt-2">
                                                <Card.Body className="cardBody">
                                                    <strong>{comment.username || 'Unknown'} </strong>
                                                    commented on: {new Date(comment.commentDate).toLocaleDateString()}
                                                    <div>{comment.comments || 'No comment text'}</div>
                                                    {user && (
                                                        <div>
                                                            <Button
                                                                variant="warning"
                                                                onClick={() => handleEditComment(comment._id, comment.comments)}
                                                                disabled={user.id !== comment.userId} // Disable if not the owner
                                                            >
                                                                Edit
                                                            </Button>
                                                            <Button
                                                                variant="danger"
                                                                onClick={() => handleDeleteComment(comment._id)}
                                                                disabled={user.id !== comment.userId && user.id !== postUserId} // Disable if not the owner
                                                            >
                                                                Delete
                                                            </Button>
                                                        </div>
                                                    )}
                                                </Card.Body>
                                            </Card>
                                        </div>
                                    ))
                                ) : (
                                    <div>No comments yet</div>
                                )}
                            </Card.Body>
                        </Card>
                    </Col>
                </div>
                <div>
                    <Button className="btn btn-danger mt-3" onClick={handleAddComment}>Add Comment</Button>
                </div>
            </Row>
            <CommentModal 
                show={showModal} 
                handleClose={handleCloseModal} 
                handleSave={editCommentId ? handleSaveEditComment : handleSaveComment} 
                postId={postId}
                commentText={editCommentText}
                setCommentText={setEditCommentText}
                isEditing={isEditing}
            />
        </Container>
    );
}
