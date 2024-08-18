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
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [mobileNo, setMobileNo] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // State to determine whether the submit button is enabled or not
    const [isActive, setIsActive] = useState(false);

    async function registerUser(e) {
        try {
            const response = await fetch("https://ra-server-nom3.onrender.com/users/register", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    mobileNo: mobileNo,
                    password: password
                })
            });

            const data = await response.json();

            if (data.message === "Registered Successfully") {
                setFirstName("");
                setLastName("");
                setEmail("");
                setMobileNo("");
                setPassword("");
                setConfirmPassword("");

                Swal.fire({
                    title: "Registration Successful",
                    icon: "success",
                    text: "Thank you for registering!",
                    showConfirmButton: false,
                    timer: 1500
                }).then(() => {
                    navigate('/login');
                });

            } else if (data.error === "Email invalid") {
                Swal.fire({
                    title: "Invalid Email Format",
                    icon: "error",
                    text: "Invalid email format.",
                    customClass: {
                        confirmButton: 'sweet-warning'
                    }
                });
            } else if (data.error === "Mobile number invalid") {
                Swal.fire({
                    title: "Mobile Number Invalid",
                    icon: "error",
                    text: "Invalid mobile number.",
                    customClass: {
                        confirmButton: 'sweet-warning'
                    }
                });
            } else if (data.error === "Password must be atleast 8 characters") {
                Swal.fire({
                    title: "Password Invalid",
                    icon: "error",
                    text: "Password must be at least 8 characters long.",
                    customClass: {
                        confirmButton: 'sweet-warning'
                    }
                });
            } else {
                Swal.fire({
                    title: "Something went wrong.",
                    icon: "error",
                    text: "Please try again later or contact us for assistance.",
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

    useEffect(() => {
        if ((firstName !== "" && lastName !== "" && email !== "" && mobileNo !== "" && password !== "" && confirmPassword !== "") && (password === confirmPassword) && (mobileNo.length === 11)) {
            setIsActive(true);
        } else {
            setIsActive(false);
        }
    }, [firstName, lastName, email, mobileNo, password, confirmPassword]);

    const handleSubmit = (e) => {
        e.preventDefault();
        startProgress();

        setTimeout(() => {
            registerUser(e)
            .finally(() => {
                closeModal();
            });
        }, 5000);  
    };

    return (
        (user.id !== null && user.id !== undefined) ?
     <Navigate to="/login" />
     :
     <Container className="register-container d-flex justify-content-center">
         <Row className="w-100">
            <Col sx={3} md={4} lg={5} className="mx-auto">
                 <Form onSubmit={handleSubmit} className="register-form">
                     <h2 className="text-center">Register</h2>
                     <p className="text-center">Create your account. It’s free and only takes a minute.</p>
                     <Col className="col mx-3">
                     <Form.Group>
                     <Form.Label>First Name </Form.Label>
                         <Form.Control
                             id="txtFirstName"
                             type="text"
                             required
                             value={firstName}
                             placeholder="Enter your first name"
                             onChange={e => { setFirstName(e.target.value) }}
                         />
                     </Form.Group>
                     <Form.Group>
                     <Form.Label>Last Name </Form.Label>
                         <Form.Control
                             id="txtLastName"
                             type="text"
                             required
                             value={lastName}
                             placeholder="Enter your last name"
                             onChange={e => { setLastName(e.target.value) }}
                         />
                     </Form.Group>
                     <Form.Group>
                     <Form.Label>Email Address </Form.Label>
                         <Form.Control
                             id="txtEmail"
                             type="email"
                             required
                             value={email}
                             placeholder="Enter your email"
                             onChange={e => { setEmail(e.target.value) }}
                         />
                     </Form.Group>
                     </Col>
                     <Col className="col mx-3">
                     <Form.Group>
                     <Form.Label>Mobile No </Form.Label>
                         <Form.Control
                             id="txtMobileNo"
                             type="number"
                             required
                             value={mobileNo}
                             placeholder="Enter your mobile no."
                             onChange={e => { setMobileNo(e.target.value) }}
                         />
                     </Form.Group>
                     <Form.Group>
                     <Form.Label>Password </Form.Label>
                         <Form.Control
                             id="txtPassword"
                             type="password"
                             required
                             value={password}
                             placeholder="Enter your password"
                             onChange={e => { setPassword(e.target.value) }}
                         />
                     </Form.Group>
                     <Form.Group>
                     <Form.Label>Confirm Password </Form.Label>
                         <Form.Control
                             id="txtConfirmPassword"
                             type="password"
                             required
                             value={confirmPassword}
                             placeholder="Confirm password"
                             onChange={e => { setConfirmPassword(e.target.value) }}
                         />
                     </Form.Group>
                     </Col>

                     {isActive ? 
                       <Button className="btn mt-3" variant="danger" type="submit" id="submitBtn">Register Now</Button> 
                       : 
                       <Button className="btn mt-3" variant="success" type="submit" id="submitBtn" disabled>Register Now</Button>
                     }
                 </Form>
            </Col>
        </Row>
    </Container>
     
    )
}
