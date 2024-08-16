import React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import Swal from 'sweetalert2';
import '../style.css';

export default function ClearCart({ fetchCart }) {


const clearCart = async () => {

    const result = await Swal.fire({
        title: 'Are you sure?',
        text: "This action will clear all items from your cart.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, clear it!',
        cancelButtonText: 'No, cancel',
        customClass: {
            confirmButton: 'sweet-confirm',
            cancelButton: 'sweet-cancel'
        }
    });

    if (result.isConfirmed) {
        try {
            const response = await fetch('https://ra-server-nom3.onrender.com/cart/clear-cart', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log(data);

            if (data.message === "Cart cleared successfully") {
                Swal.fire({
                    title: 'Success',
                    icon: 'success',
                    text: 'Cart cleared successfully',
                    showConfirmButton: false,
                    timer: 1500
                });
                fetchCart(); // Refresh the cart data
            } else {
                Swal.fire({
                    title: 'Something Went Wrong',
                    icon: 'error',
                    text: 'Please try again',
                    customClass: {
                        confirmButton: 'sweet-warning'
                    }
                });
            }

        } catch (error) {
            console.error("Error:", error);
            Swal.fire({
                title: 'Error',
                icon: 'error',
                text: 'Failed to clear cart. Please try again later.',
                customClass: {
                    confirmButton: 'sweet-warning'
                }
            });
        }
    } else {
        Swal.fire({
            title: 'Cancelled',
            text: 'Your cart was not cleared.',
            icon: 'info',
            customClass: {
                confirmButton: 'sweet-warning'
            }
        });
    }
}


    return (
        <>
        <Container className="d-flex">
            <Row>
                <Col>
                <Button className="btnClearCart" variant="danger" size="sm" onClick={clearCart}>Clear Cart</Button>
                </Col>
            </Row>
        </Container>
        </>
    )
}
