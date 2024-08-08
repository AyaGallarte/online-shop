import { Row, Col, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css';
import home from '../images/home.jpg';

export default function Home() {
    return (

       <div className="page-container">
            <img src={home} className="w-100"/>
       </div>
    );
}

