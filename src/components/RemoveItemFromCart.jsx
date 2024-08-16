import React from 'react';
import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import '../style.css';

export default function RemoveItemFromCart({ cartProductId, fetchCart }) {

    const removeToggle = async () => {
   
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "Do you really want to remove this item from the cart?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, remove it!',
            cancelButtonText: 'No, cancel',
            customClass: {
                confirmButton: 'sweet-confirm',
                cancelButton: 'sweet-cancel'
            }
        });

        if (result.isConfirmed) {
         
            try {
                const response = await fetch(`https://ra-server-nom3.onrender.com/cart/${cartProductId}/remove-from-cart`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();

                if (data.message === "Item removed from cart successfully") {
                    Swal.fire({
                        title: 'Success',
                        icon: 'success',
                        text: 'Item removed from cart successfully',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    fetchCart(); 
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
                    text: 'Failed to remove product. Please try again later.',
                    customClass: {
                        confirmButton: 'sweet-warning'
                    }
                });
            }
        } else if (result.isDismissed) {
          
            Swal.fire({
                title: 'Cancelled',
                text: 'The item was not removed from the cart.',
                icon: 'info',
                customClass: {
                    confirmButton: 'sweet-warning'
                }
            });
        }
    }

    return (
        <Button className="btnRemove" variant="danger" size="sm" onClick={removeToggle}>
            Remove
        </Button>
    )
}
