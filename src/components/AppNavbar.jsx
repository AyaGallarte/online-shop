import React, { useContext } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import UserContext from '../context/UserContext';

import logo from '../images/logo.png'; 
import '../style.css';

export default function AppNavbar() {
    const { user } = useContext(UserContext);

    return (
        <Navbar expand="lg" className="nav">
            <Container className="container-navbar">
                <Navbar.Brand as={Link} to="/">
                    <img
                        src={logo}
                        width="40"
                        height="25"
                        className="d-inline-block align-top"
                        alt="Logo"
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" className="navToggle" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={NavLink} to="/">Home</Nav.Link>
                        <Nav.Link as={NavLink} to="/products">Products</Nav.Link>
                    </Nav>

                    <Nav className="ms-auto">
                        {user && user.id !== null && user.id !== undefined ? (
                            user.isAdmin ? (       
                                <Nav.Link as={NavLink} to="/logout">Logout</Nav.Link>
                            ) : (
                                <>
                                    <Nav.Link as={NavLink} to="/cart">Cart</Nav.Link>
                                    <Nav.Link as={NavLink} to="/order">Order</Nav.Link>
                                    <Nav.Link as={NavLink} to="/profile">Profile</Nav.Link>
                                    <Nav.Link as={NavLink} to="/logout">Logout</Nav.Link>
                                </>
                            )
                        ) : (
                            <>
                                <Nav.Link as={NavLink} to="/login">Login</Nav.Link>
                                <Nav.Link as={NavLink} to="/register">Register</Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
