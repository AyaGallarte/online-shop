import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import '../style.css';

export default function Checkout({fetchCart}) {

	const navigate = useNavigate();

const checkOut = async (product) => {

    const result = await Swal.fire({
        title: 'Confirm Checkout',
        text: "Are you sure you want to proceed with the checkout?",
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes, checkout',
        cancelButtonText: 'No, cancel',
        customClass: {
            confirmButton: 'sweet-confirm',
            cancelButton: 'sweet-cancel'
        }
    });

    if (result.isConfirmed) {
        // User confirmed, proceed with checkout
        try {
            const response = await fetch('https://ra-server-nom3.onrender.com/orders/checkout', {
                method: 'POST',
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

            if (data.message === "Ordered Successfully") {
                Swal.fire({
                    title: 'Order Success',
                    icon: 'success',
                    text: 'Your order has been placed successfully.',
                    customClass: {
                        confirmButton: 'sweet-warning'
                    }
                });

                navigate("/order"); 

            } else {
                Swal.fire({
                    title: 'Something Went Wrong',
                    icon: 'error',
                    text: 'Please try again.',
                    customClass: {
                        confirmButton: 'sweet-warning'
                    }
                });
            }
            fetchCart(); 

        } catch (error) {
            console.error("Error:", error);
            Swal.fire({
                title: 'Error',
                icon: 'error',
                text: 'Failed to order products. Please try again later.',
                customClass: {
                    confirmButton: 'sweet-warning'
                }
            });
        }
    } else if (result.isDismissed) {
        Swal.fire({
            title: 'Cancelled',
            text: 'Your checkout was cancelled.',
            icon: 'info',
            customClass: {
                confirmButton: 'sweet-warning'
            }
        });
    }
}

    return (

                <Button variant="success" size="sm" onClick={() => checkOut()}>Checkout</Button>
                
    )
}
