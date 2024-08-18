import { useState, useEffect, useContext } from 'react';
import { Form, Button, Col, Row, Container } from 'react-bootstrap';
import { useNavigate, Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import UserContext from '../context/UserContext';
import { useProgress } from '../context/ProgressContext';
import '../style.css';

export default function Login() {
    const { user, setUser } = useContext(UserContext);
    const { startProgress, closeModal } = useProgress();
    const navigate = useNavigate(); 

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isActive, setIsActive] = useState(false);

    async function authenticate(e) {
        e.preventDefault();

        try {
            const response = await fetch('https://ra-server-nom3.onrender.com/users/login', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });

            const data = await response.json();

            if (data.access !== undefined) {
                localStorage.setItem('token', data.access);
                retrieveUserDetails(data.access);
                setEmail('');
                setPassword('');
                Swal.fire({
                    title: "Login Successful",
                    icon: "success",
                    text: "You are now logged in.",
                    showConfirmButton: false,
                    timer: 1500
                });
            } else if (data.error === "Email and password do not match") {
                Swal.fire({
                    title: "Login Failed",
                    icon: "error",
                    text: "Incorrect email or password.",
                    customClass: {
                        confirmButton: 'sweet-warning'
                    }
                });
            } else {
                Swal.fire({
                    title: "User Not Found",
                    icon: "error",
                    text: `${email} does not exist.`,
                    customClass: {
                        confirmButton: 'sweet-warning'
                    }
                });
            }
        } catch (e) {
            console.error('Fetch error:', e);
            Swal.fire({
                title: "Error",
                icon: "error",
                text: "An unexpected error occurred. Please try again later."
            });
        }
    }

    function retrieveUserDetails(token) {
        fetch('https://ra-server-nom3.onrender.com/users/details', {
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
        if (email !== '' && password !== '') {
            setIsActive(true);
        } else {
            setIsActive(false);
        }
    }, [email, password]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        startProgress();

        try {
            await delay(1000); 
            await authenticate(e);
        } finally {
            closeModal();
        }
    };

    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    return (
        (user.id !== null && user.id !== undefined) ?
        <Navigate to="/" />
        :
        <div className="login-container">
            <Container>
                <Row className="justify-content-center">
                    <Col md={6}>
                        <Form onSubmit={handleSubmit} className="login-form">
                            <h2 className="text-center">Login</h2>
                            <Form.Group>
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    id="loginEmail"
                                    type="email"
                                    placeholder="Enter email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    id="loginPassword"
                                    type="password"
                                    placeholder="Enter password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </Form.Group>

                            {isActive ? 
                                <Button className="btn" variant="danger" type="submit" id="loginBtn">
                                    Login
                                </Button>
                                : 
                                <Button className="btn" variant="success" type="submit" id="loginBtn" disabled>
                                    Login
                                </Button>
                            }
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
