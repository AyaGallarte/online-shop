import React, { useState } from 'react';
import { Button, Card, Row, Col, Container } from 'react-bootstrap';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import PostModal from '../components/PostModal'; 
import Swal from 'sweetalert2';

export default function UserView({ posts }) {
    const [showModal, setShowModal] = useState(false);
    const [editingPost, setEditingPost] = useState(null);
    const [post, setPost] = useState([]);
    const [postId, setPostId] = useState(null);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [author, setAuthor] = useState("");
    const [username, setUsername] = useState("")
    const [comments, setComments] = useState([]);
    const [createdOn, setCreatedOn] = useState("");
    const navigate = useNavigate();

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const [expanded, setExpanded] = useState({});

    const truncate = (str, maxLength) => {
        if (str.length <= maxLength) return str;
        return str.substring(0, maxLength) + '...';
    };

    const handleReadMore = (id) => {
        setExpanded((prevState) => ({
            ...prevState,
            [id]: !prevState[id],
        }));
    };

    const handleAddPost = () => {
        setEditingPost(null); 
        setShowModal(true);
    };

    const handleEditPost = (post) => {
        setPostId(post._id);
        setEditingPost(post); 
        setShowModal(true);
    };

    const handleSavePost = (post) => {
        if (editingPost) {
            fetch(`https://blog-apiserver.onrender.com/posts/updatePost/${postId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(post)
            })
            .then(res => res.json())
            .then(data => {
                //setPosts(posts.map(p => (p._id === data._id ? data : p)));
                setShowModal(false);
            });
        } else {
            let token = localStorage.getItem('token');
            console.log(token);

            fetch('http://localhost:4000/posts/addPost', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    title: post.title,  
                    content: post.content,  
                    author: post.author,  
                    createdOn: post.createdOn  
                })
            })
            .then(res => res.json())
            .then(data => {
                if(data.message === "Error adding post"){
                    Swal.fire({
                        title: "Error adding post",
                        icon: "error",
                        text: data.error,
                        customClass: {
                            confirmButton: 'sweet-warning'
                        }
                    });
                } else {
                    setTitle("");
                    setContent("");

                    Swal.fire({
                        title: "Add Post Successful",
                        icon: "success",
                        text: "Post added successfully.",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            });
        }
        setShowModal(false);
    };

        return (
            <Container className="container">
                <Button className="btn btn-danger w-20" onClick={handleAddPost}>
                    Add Post
                </Button>
                <h2 className="page-title text-center mt-4">Posts</h2>
                <Row className="mt-4">
                    {posts.map(post => (
                        <Col key={post._id} xs={3} sm={4} md={5} lg={6} className="mb-4">
                            <Card className="card h-100">
                                <Card.Body className="cardBody">
                                    <Card.Title className="custom-card-title">{post.title}</Card.Title>
                                    <Card.Text className="custom-card-description">
                                        {expanded[post._id] ? post.content : truncate(post.content, 100)}
                                        {post.content.length > 100 && (
                                            <Button
                                                className="read-more"
                                                variant="link"
                                                size="sm"
                                                onClick={() => handleReadMore(post._id)}
                                            >
                                                {expanded[post._id] ? 'show less' : '...read more'}
                                            </Button>
                                        )}
                                    </Card.Text>
                                </Card.Body>
                                <Card.Footer>
                                    <Link to={`/posts/${post._id}`} className="btn btn-danger w-50">
                                        Continue Reading
                                    </Link>
                                    <Button 
                                        variant="warning" 
                                        onClick={() => handleEditPost(post)} 
                                        className="ml-2"
                                    >
                                        Edit Post
                                    </Button>
                                </Card.Footer>
                            </Card>
                        </Col>
                    ))}
                </Row>

                {showModal && (
                    <PostModal 
                        show={showModal} 
                        handleClose={handleCloseModal} 
                        handleSave={handleSavePost} 
                        post={editingPost} 
                    />
                )}
            </Container>
        );
    }
