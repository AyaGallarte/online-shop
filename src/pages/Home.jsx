import { Row, Col, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css';
import home from '../images/home.jpg'; // Replace these with your image paths
import home2 from '../images/home2.jpg'; 
import home3 from '../images/home3.jpg';

export default function Home() {
    return (
        <Container className="home-images my-5">
            <Row className="d-flex justify-content-center align-items-center">
                <Col xs={12} lg={4} className="mb-3">
                    <img src={home} className="img-fluid" alt="Home" />
                </Col>
                <Col xs={12} lg={4} className="mb-3">
                    <img src={home2} className="img-fluid" alt="Image 2" />
                </Col>
                <Col xs={12} lg={4} className="mb-3">
                    <img src={home3} className="img-fluid" alt="Image 3" />
                </Col>
            </Row>
        </Container>
    );
}
