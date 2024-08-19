import { Row, Col, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CarouselPage from '../components/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css';

export default function Home() {
    return (

           <div className="page-container">
            <div className="content-wrapper">
                <CarouselPage />
            </div>
        </div>
    );
}

