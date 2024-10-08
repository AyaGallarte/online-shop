import React, { useContext } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import UserContext from '../context/UserContext';
import logo from '../images/logo.png'; 
import { FaHome, FaTshirt, FaShoppingCart, FaListAlt } from "react-icons/fa";
import { IoLogOut, IoLogIn } from "react-icons/io5";
import { MdBorderColor } from "react-icons/md";
import { CgProfile } from "react-icons/cg";

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
                        <Nav.Link as={NavLink} to="/"><FaHome /> Home</Nav.Link>
                        <Nav.Link as={NavLink} to="/products"><FaTshirt /> Products</Nav.Link>
                    </Nav>

                    <Nav className="ms-auto">
                        {user && user.id !== null && user.id !== undefined ? (
                            user.isAdmin ? (       
                                <Nav.Link as={NavLink} to="/logout"><IoLogOut /> Logout</Nav.Link>
                            ) : (
                                <>
                                    <Nav.Link as={NavLink} to="/cart"><FaShoppingCart /> Cart</Nav.Link>
                                    <Nav.Link as={NavLink} to="/order"><FaListAlt /> Order</Nav.Link>
                                    <Nav.Link as={NavLink} to="/profile"><CgProfile /> Profile</Nav.Link>
                                    <Nav.Link as={NavLink} to="/logout"><IoLogOut /> Logout</Nav.Link>
                                </>
                            )
                        ) : (
                            <>
                                <Nav.Link as={NavLink} to="/login"><IoLogIn /> Login</Nav.Link>
                                <Nav.Link as={NavLink} to="/register"><MdBorderColor /> Register</Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
