import { useState, useEffect, useContext } from 'react';
import { Form, Button, Col, Row, Container } from 'react-bootstrap';
import { useNavigate, Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import UserContext from '../context/UserContext';

export default function Login() {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate(); 

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isActive, setIsActive] = useState(true);
//https://blog-server-nhh1.onrender.com/users/login
    function authenticate(e) {
        e.preventDefault();
        fetch('http://localhost:4000/users/login', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
        .then(res => res.json())
        .then(data => {
            if(data.access !== undefined){
                localStorage.setItem('token', data.access);
                retrieveUserDetails(data.access);
                setUsername('');
                setPassword('');
                Swal.fire({
                    title: "Login Successful",
                    icon: "success",
                    text: "You are now logged in.",
                    showConfirmButton: false,
                    timer: 1500
                })
                .then(() => {
                    navigate('/');
                });
            } else if (data.error === "Username and password do not match") {
                Swal.fire({
                    title: "Login Failed",
                    icon: "error",
                    text: "Incorrect username or password.",
                    customClass: {
                        confirmButton: 'sweet-warning'
                    }
                });
            } else {
                Swal.fire({
                    title: "User Not Found",
                    icon: "error",
                    text: `${username} does not exist.`,
                    customClass: {
                        confirmButton: 'sweet-warning'
                    }
                });
            }
        });
    }

    function retrieveUserDetails(token){
        fetch('http://localhost:4000/users/details', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(data => {
            setUser({
                id: data.user._id,
                isAdmin: data.user.isAdmin
            });
        });
    }

    useEffect(() => {
        if(username !== '' && password !== ''){
            setIsActive(true);
        } else {
            setIsActive(false);
        }
    }, [username, password]);

    return (    
        (user.id !== null && user.id !== undefined) ?
        <Navigate to="/" />
        :
        <div className="login-container">
            <Container>
                <Row className="justify-content-center">
                    <Col md={6}>
                        <Form onSubmit={(e) => authenticate(e)} className="login-form">
                            <h2 className="text-center">Login</h2>
                            <Form.Group>
                                <Form.Label>Username </Form.Label>
                                <Form.Control 
                                    id="loginUsername"
                                    type="username" 
                                    placeholder="Enter username" 
                                    required
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Password </Form.Label>
                                <Form.Control 
                                    id="loginPassword"
                                    type="password" 
                                    placeholder="Password" 
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </Form.Group>

                            <div className="login-button">
                            { isActive ? 
                                <Button className="btn" variant="primary" type="submit" id="loginBtn">
                                    Login
                                </Button>
                                : 
                                <Button className="btn" variant="danger" type="submit" id="loginBtn" disabled>
                                    Login
                                </Button>
                            }
                            </div>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
