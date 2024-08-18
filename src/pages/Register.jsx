import { useState, useEffect, useContext } from 'react';
import { Form, Button, Col, Row, Container } from 'react-bootstrap';
import { useNavigate, Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import UserContext from '../context/UserContext';
import { useProgress } from '../context/ProgressContext';
import '../style.css';

export default function Register() {
    const { user } = useContext(UserContext);
    const { startProgress, closeModal } = useProgress();
    const navigate = useNavigate(); 

    // State hooks to store the values of the input fields
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        mobileNo: "",
        password: "",
        confirmPassword: ""
    });

    const { firstName, lastName, email, mobileNo, password, confirmPassword } = formData;

    // State to determine whether the submit button is enabled or not
    const [isActive, setIsActive] = useState(false);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [id]: value
        }));
    };

    const registerUser = async () => {
        try {
            const response = await fetch("https://ra-server-nom3.onrender.com/users/register", {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    email,
                    mobileNo,
                    password
                })
            });

            const data = await response.json();

            if (data.message === "Registered Successfully") {
                setFormData({
                    firstName: "",
                    lastName: "",
                    email: "",
                    mobileNo: "",
                    password: "",
                    confirmPassword: ""
                });

                Swal.fire({
                    title: "Registration Successful",
                    icon: "success",
                    text: "Thank you for registering!",
                    showConfirmButton: false,
                    timer: 1500
                }).then(() => navigate('/login'));

            } else {
                handleErrors(data.error);
            }
        } catch (error) {
            console.error('Fetch error:', error);
            Swal.fire({
                title: "Error",
                icon: "error",
                text: "An unexpected error occurred. Please try again later."
            });
        }
    };

    const handleErrors = (error) => {
        let errorMessage = "";
        switch (error) {
            case "Email invalid":
                errorMessage = "Invalid email format.";
                break;
            case "Mobile number invalid":
                errorMessage = "Invalid mobile number.";
                break;
            case "Password must be atleast 8 characters":
                errorMessage = "Password must be at least 8 characters long.";
                break;
            default:
                errorMessage = "Please try again later or contact us for assistance.";
        }
        Swal.fire({
            title: errorMessage,
            icon: "error",
            customClass: { confirmButton: 'sweet-warning' }
        });
    };

    useEffect(() => {
        const isFormValid = firstName && lastName && email && mobileNo.length === 11 && password && confirmPassword && password === confirmPassword;
        setIsActive(isFormValid);
    }, [formData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        startProgress();
        setTimeout(() => {
            registerUser().finally(() => closeModal());
        }, 2000);  
    };

    if (user.id) return <Navigate to="/login" />;

    return (
        <Container className="register-container d-flex justify-content-center">
            <Row className="w-100">
                <Col sx={3} md={4} lg={5} className="mx-auto">
                    <Form onSubmit={handleSubmit} className="register-form">
                        <h2 className="text-center">Register</h2>
                        <p className="text-center">Create your account. It’s free and only takes a minute.</p>
                        <Col className="col mx-3">
                            <Form.Group>
                                <Form.Label>First Name</Form.Label>
                                <Form.Control
                                    id="firstName"
                                    type="text"
                                    required
                                    value={firstName}
                                    placeholder="Enter your first name"
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control
                                    id="lastName"
                                    type="text"
                                    required
                                    value={lastName}
                                    placeholder="Enter your last name"
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Email Address</Form.Label>
                                <Form.Control
                                    id="email"
                                    type="email"
                                    required
                                    value={email}
                                    placeholder="Enter your email"
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                        <Col className="col mx-3">
                            <Form.Group>
                                <Form.Label>Mobile No</Form.Label>
                                <Form.Control
                                    id="mobileNo"
                                    type="number"
                                    required
                                    value={mobileNo}
                                    placeholder="Enter your mobile no."
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    id="password"
                                    type="password"
                                    required
                                    value={password}
                                    placeholder="Enter your password"
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control
                                    id="confirmPassword"
                                    type="password"
                                    required
                                    value={confirmPassword}
                                    placeholder="Confirm password"
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                        <Button className="btn mt-3" variant={isActive ? "danger" : "success"} type="submit" disabled={!isActive}>
                            Register Now
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}
