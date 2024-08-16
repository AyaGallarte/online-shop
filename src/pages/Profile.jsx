import { useState, useEffect, useContext } from 'react';
import { Button, Col, Row, Container } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import ResetPassword from '../components/ResetPassword';
import UserContext from '../context/UserContext';
import '../style.css';

export default function Profile() {
    const { user } = useContext(UserContext);
    const [details, setDetails] = useState({});

    useEffect(() => {
        if (user && user.id) {
            fetch(`https://ra-server-nom3.onrender.com/users/details-specific/${user.id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    setDetails(data);
                } else {
                    Swal.fire({
                        title: "Profile Error",
                        icon: "error",
                        text: "Something went wrong, kindly contact us for assistance.",
                        customClass: {
                            confirmButton: 'sweet-warning'
                        }
                    });
                }
            })
            .catch(error => {
                Swal.fire({
                    title: "Error Retrieving User Details",
                    icon: "error",
                    text: "Unable to fetch user details. Please try again later.",
                    customClass: {
                        confirmButton: 'sweet-warning'
                    }
                });
                console.error(error);
            });
        }
    }, [user]);

    if (!user || !user.id) {
        return <Navigate to="/" />;
    }

    return (
        <Container className="container-profile">
            <Row>
                <Col className="profile-details order-md-1">
                    <h2 className="mb-0">
                        {details.user ? `Hi, ${details.user.firstName || ''} ${details.user.lastName || ''}!` : 'Loading...'}
                    </h2>
                    <hr />
                    <h5>Contact Details:</h5>
                    <ul>
                        <li>Email: {details.user ? details.user.email || '' : 'Loading...'}</li>
                        <li>Mobile No: {details.user ? details.user.mobileNo || '' : 'Loading...'}</li>
                    </ul>
                </Col>
                <Col xs={12} md={4} className="reset-password order-md-2">
                    <ResetPassword />
                </Col>
            </Row>
        </Container>
    );
}
