import { useEffect, useState } from 'react';
import { Button, CardGroup, Card, Row, Col, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import imageMap from '../components/ImageMap';
import '../style.css';

export default function UserView({ productsData }) {

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

    const [expanded, setExpanded] = useState({});

    console.log('here ' + productsData.length, productsData);

    return (
        !productsData ? (
            <p>Loading...</p>
          ) : productsData.length <= 0 ? (
            <p>No products available</p>
          )  :  (
            <Container className="container">
                <h2 className="page-title text-center mt-4">Our Products</h2>
                <Row className="mt-4">
                    {productsData.map(product => (
                        <Col key={product._id} xs={12} sm={6} md={4} lg={3} className="mb-4">
                            <Card className="card h-100">
                                <Card.Img 
                                    variant="top" 
                                    src={imageMap[product.image]} 
                                    className="product-image" 
                                    alt={product.name} 
                                />
                                <Card.Body className="cardBody">
                                    <Card.Title className="custom-card-title">{product.name}</Card.Title>
                                    <Card.Text className="custom-card-description">
                                        {expanded[product._id] ? product.description : truncate(product.description, 100)}
                                        {product.description.length > 100 && (
                                            <Button
                                                className="read-more"
                                                variant="link"
                                                size="sm"
                                                onClick={() => handleReadMore(product._id)}
                                            >
                                                {expanded[product._id] ? 'show less' : '...read more'}
                                            </Button>
                                        )}
                                    </Card.Text>
                                    <Card.Text className="custom-card-price">₱{product.price}</Card.Text>
                                </Card.Body>
                                <Card.Footer>
                                    <Link to={`/products/${product._id}`} className="btn btn-danger w-100" id="buttonProductDetails">Details</Link>
                                </Card.Footer>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        )
    );
}


