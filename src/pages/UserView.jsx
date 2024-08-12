import React, { useState, useEffect, useContext } from 'react';
import { Button, Card, Row, Col, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import UserContext from '../context/UserContext';
import PostModal from '../components/PostModal'; 
import Swal from 'sweetalert2';

export default function UserView({ posts }) {
    const { user } = useContext(UserContext);
    const [showModal, setShowModal] = useState(false);
    const [editingPost, setEditingPost] = useState(null);
    const [userPosts, setPosts] = useState(posts); 
    const [expanded, setExpanded] = useState({});
    const [refreshKey, setRefreshKey] = useState(0);

    useEffect(() => {
        setPosts(posts);  // Sync with prop changes
    }, [posts]);

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const truncate = (str, maxLength) => {
        if (str.length <= maxLength) return str;
        return str.substring(0, maxLength) + '...';
    };

    const handleReadMore = (id) => {
        setExpanded(prevState => ({
            ...prevState,
            [id]: !prevState[id],
        }));
    };

    const handleAddPost = () => {
        setEditingPost(null); 
        setShowModal(true);
    };

    const handleEditPost = (post) => {
        setEditingPost(post); 
        setShowModal(true);
    };

    const handleSavePost = (post) => {

        if (!post.title || !post.content) {
               Swal.fire({
                   title: "Required Title And Content ",
                   text: "Both title and content are required.",
                   icon: "error",
                   confirmButtonText: "OK"
               });
               return; // Prevent submission if validation fails
            }
        let token = localStorage.getItem('token');
        const url = editingPost ? `https://blog-server-nhh1.onrender.com/posts/updatePost/${post._id}` : 'https://blog-server-nhh1.onrender.com/posts/addPost';
        const method = editingPost ? 'PATCH' : 'POST';

        fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(post)
        })
        .then(res => res.json())
        .then(data => {
            //setRefreshKey(prevKey => prevKey + 1);
            
            if (data.updatedPost || data._id) {
                Swal.fire({
                    title: `${editingPost ? "Update" : "Add"} Post Successful`,
                    icon: "success",
                    text: `${editingPost ? "Post updated" : "Post added"} successfully.`,
                    showConfirmButton: false,
                    timer: 1500
                });

                setPosts(prevPosts => {
                    if (editingPost) {
                        return prevPosts.map(p => (p._id === data.updatedPost._id ? data.updatedPost : p));
                    } else {
                        return [...prevPosts, {
                            _id: data._id,
                            title: data.title,
                            content: data.content,
                            author: data.author,
                            createdOn: data.createdOn,
                            userId: user.id
                        }];
                    }
                });

                setShowModal(false);
            } else {
                Swal.fire({
                    title: `${editingPost ? "Post update" : "Post addition"} failed`,
                    icon: "error",
                    text: data.error,
                    customClass: {
                        confirmButton: 'sweet-warning'
                    }
                });
            }
        });
    };

    const handleDeletePost = (postId) => {
        let token = localStorage.getItem('token');
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://blog-server-nhh1.onrender.com/posts/deletePost/${postId}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                .then(res => res.json())
                .then(data => {
                    if (data.message === 'Post deleted successfully') {
                        Swal.fire({
                            title: 'Deleted!',
                            text: 'Your post has been deleted.',
                            icon: 'success',
                            showConfirmButton: false,
                            timer: 1500
                        });
                        setPosts(prevPosts => prevPosts.filter(post => post._id !== postId));
                    } else {
                        Swal.fire(
                            'Error!',
                            'There was a problem deleting the post.',
                            'error'
                        );
                    }
                });
            }
        });
    };

    return (
        <Container className="container">
            <Button className="addpost-button btn btn-danger w-20" id="button-post-page" onClick={handleAddPost}>
                Add Post
            </Button>
            <h2 className="page-title text-center">Posts</h2>
            <Row className="mt-4">
                {userPosts.map(post => (
                    <Col key={post._id} xs={12} md={6} className="mb-4">
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
                                    <br />
                                    <span>Author: {post.author}</span><br />
                                    <span>Created On: {new Date(post.createdOn).toLocaleDateString('en-US', {
                                        month: '2-digit',
                                        day: '2-digit',
                                        year: 'numeric'
                                    })}</span>      
                                </Card.Text>
                            </Card.Body>
                            <Card.Footer className="card-footer">
                                <Link to={`/posts/${post._id}`} className="btn btn-danger w-50">
                                    Continue Reading
                                </Link>
                                <Button 
                                    variant="warning" 
                                    onClick={() => handleEditPost(post)} 
                                    className="ml-2"
                                    disabled={post.userId !== user.id} // Only the owner of the post can edit
                                >
                                    Edit Post
                                </Button>
                                <Button 
                                    variant="danger"
                                    onClick={() => handleDeletePost(post._id)}
                                    className="ml-2"
                                    disabled={post.userId !== user.id} // Only the owner of the post can delete
                                >
                                    Delete Post
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
