import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../style.css';
import watch2 from '../images/watch2.jpg';
import phone1 from '../images/phone1.avif';
import skin8 from '../images/skin8.jpg';

function CarouselPage() {
    return (
        <div className="slide-wrapper">
            <Carousel id="homepage-feature">
                <Carousel.Item className="carousel-item">
                <img src={phone1} className="d-block carousel-image" alt="First slide" />
                    <Carousel.Caption>
                        <h1 className="carousel-header">Get 10% discount on your first purchase</h1>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item className="carousel-item">
                <img src={skin8} className="d-block carousel-image" alt="Second slide" />
                    <Carousel.Caption>
                        <h1 className="carousel-header">Enjoy free-shipping on selected items</h1>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item className="carousel-item">
                <img src={watch2} className="d-block carousel-image" alt="Third slide" />
                    <Carousel.Caption>
                        <h1 className="carousel-header">Shop your favorite items here</h1>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>

            <div className="red">
                <div className="red-content">
                    <h2 className="py-4"><a href="/products">New Arrivals &gt;</a></h2>
                    <h2 className="py-4"><a href="/products">Top Brands &gt;</a></h2>
                    <h2 className="py-4"><a href="/products">Latest Promos &gt;</a></h2>
                </div>
            </div>

            <div className="my-4 d-flex justify-content-center">
                <Link className="btn btn-carousel btn-warning" to="/products">SHOP NOW</Link>
            </div>

        <footer className="footer">
            <div className="container">
                <div className="row">
                    <div className="col-md-8">
                        <h5>About Us</h5>
                        <p>
                            We are dedicated to providing the best products at unbeatable prices. 
                            Our goal is to make your shopping experience as enjoyable and convenient as possible.
                        </p>
                    </div>
                   
                    <div className="col-md-4">
                        <h5>Contact Us</h5>
                        <div className="social-media">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 text-center mt-5">
                        <p>&copy; {new Date().getFullYear()}. All Rights Reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
        </div>

    );
}

export default CarouselPage;

