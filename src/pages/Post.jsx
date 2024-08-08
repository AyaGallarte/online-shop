import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Card, Row, Col, ListGroup, ListGroupItem, Button } from 'react-bootstrap';
import CommentModal from '../components/CommentModal'; 

export default function Post() {
    const { postId } = useParams();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [author, setAuthor] = useState("");
    const [username, setUsername] = useState("")
    const [comments, setComments] = useState([]);
    const [createdOn, setCreatedOn] = useState("");
    const [showModal, setShowModal] = useState(false);
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

    const handleAddComment = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleSaveComment = (postId, comment) => {
        let token = localStorage.getItem('token');
        fetch(`https://blog-apiserver.onrender.com/posts/addComment/${postId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ comments: comment })
        })
        .then(res => res.json())
        .then(data => {
            if(data.success) {
                setComments(prevComments => [...prevComments, data.newComment]);
                setShowModal(false);
            }
        });
    };

    useEffect(() => {
        fetch(`https://blog-apiserver.onrender.com/posts/getPost/${postId}`)
        .then(res => res.json())
        .then(data => {
            setTitle(data.title);
            setContent(data.content);
            setAuthor(data.author);
            setUsername(data.username);
            setComments(data.comments);
            setCreatedOn(data.createdOn);
        });
    }, [postId]);

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
                                        <div key={index} className="custom-card-comments">
                                            <Col>
                                                <Card className="card h-100 mt-2">
                                                    <Card.Body className="cardBody">
                                                        <strong>{comment.username} </strong>
                                                        {comment.commentDate}
                                                        <div>
                                                            {comment.comments}
                                                        </div>
                                                    </Card.Body>
                                                </Card>
                                            </Col>
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
                handleSave={handleSaveComment} 
                postId={postId} 
            />
        </Container>
    );
}
