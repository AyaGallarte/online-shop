import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Card, Row, Col, ListGroup, ListGroupItem, Button } from 'react-bootstrap';
import UserContext from '../context/UserContext';
import CommentModal from '../components/CommentModal'; 
import Swal from 'sweetalert2';

export default function Post() {
    const { postId } = useParams();
    const {user} = useContext(UserContext);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [author, setAuthor] = useState("");
    const [username, setUsername] = useState("")
    const [comments, setComments] = useState([]);
    const [createdOn, setCreatedOn] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [expanded, setExpanded] = useState({});
    const [refreshKey, setRefreshKey] = useState(0);

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

    const handleAddComment = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    useEffect(() => {
        fetch(`https://blog-server-nhh1.onrender.com/posts/getPost/${postId}`)
            .then(res => res.json())
            .then(data => {
                console.log('Fetched Data:', data);
                setTitle(data.title);
                setContent(data.content);
                setAuthor(data.author);
                setComments(data.comments || []); // Default to empty array if undefined
                setCreatedOn(data.createdOn);
            })
            .catch(error => console.error('Error fetching post data:', error));
    }, [postId, refreshKey]);

    const handleSaveComment = (postId, comment) => {
        let token = localStorage.getItem('token');
        fetch(`https://blog-server-nhh1.onrender.com/posts/addComment/${postId}`, {
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
                Swal.fire({
                    title: "Comment Add Failed",
                    icon: "error",
                    text: data.error,
                    customClass: {
                        confirmButton: 'sweet-warning'
                    }
                });
            } else {
                // Force a re-render by updating the refreshKey
                setRefreshKey(prevKey => prevKey + 1);
                Swal.fire({
                    title: "Add Comment Successful",
                    icon: "success",
                    text: "Comment added successfully.",
                    showConfirmButton: false,
                    timer: 1500
                });
                setShowModal(false);
            }            
        })
        .catch(error => console.error('There was a problem with the fetch operation:', error));
    };                           

    return (
        <Container className="container">
            <h2 className="page-title text-center mt-4">{title}</h2>
            <Row className="mt-4">
                <Col xs={12} sm={12} md={12} lg={12} className="mb-4">
                    <Card className="card h-100">
                        <Card.Body className="cardBody">
                            <Card.Text className="custom-card-description">
                                {content}
                            </Card.Text>
                            <div>
                                <strong>Author:</strong> {author}
                            </div>
                            <div>
                                <strong>Created On:</strong> {new Date(createdOn).toLocaleDateString()}
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <div>
                    <Col>
                        <Card className="card h-100">
                            <Card.Body className="cardBody">
                                <strong>Comments:</strong> {comments.length}
                                {comments.length > 0 ? (
                                    comments.map((comment, index) => (
                                        comment ? (
                                            <div key={index} className="custom-card-comments">
                                                <Col>
                                                    <Card className="card h-100 mt-2">
                                                        <Card.Body className="cardBody">
                                                            <strong>{comment.username || 'Unknown'} </strong>
                                                            commented on: {new Date(comment.commentDate).toLocaleDateString()}
                                                            <div>
                                                                {comment.comments || 'No comment text'}
                                                            </div>
                                                        </Card.Body>
                                                    </Card>
                                                </Col>
                                            </div>
                                        ) : (
                                            <div key={index}>Invalid comment data</div>
                                        )
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
                handleSave={handleSaveComment} 
                postId={postId} 
            />
        </Container>
    );
}
