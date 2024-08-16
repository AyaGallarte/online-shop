import { Button  } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
import '../style.css';

export default function AddtoCart({productId, quantity}){

	const navigate = useNavigate();

	function addToCart(){
    Swal.fire({
        title: 'Are you sure?',
        text: "Do you want to add this item to your cart?",
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes, add it!',
        cancelButtonText: 'No, cancel',
        customClass: {
            confirmButton: 'sweet-confirm',
            cancelButton: 'sweet-cancel'
        }
    }).then((result) => {
        if (result.isConfirmed) {
            fetch('https://ra-server-nom3.onrender.com/cart/add-to-cart', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({
                    productId: productId,
                    quantity: quantity
                })
            })
            .then(res => res.json())
            .then(data => {
                if (data.message === 'Error adding item to cart') {
                    Swal.fire({
                        title: "Error adding item to cart",
                        icon: "error",
                        text: data.error,
                        customClass: {
                            confirmButton: 'sweet-warning'
                        }
                    });
                } else if (data.message === "Item added to cart successfully") {
                    Swal.fire({
                        title: "Item added to cart successfully",
                        icon: "success",
                        text: `Total items in cart: ${data.cart.cartItems.length}`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate("/products");
                } else {
                    Swal.fire({
                        title: "Error",
                        icon: "error",
                        text: "Something went wrong. Please try again.",
                        customClass: {
                            confirmButton: 'sweet-warning'
                        }
                    });
                }
                console.log(data.error)
            })
            .catch(error => {
                Swal.fire({
                    title: "Error",
                    icon: "error",
                    text: error,
                    customClass: {
                        confirmButton: 'sweet-warning'
                    }
                });
            });
        }
    });
}

return(
	<Button variant="primary" block="true" onClick={() => addToCart()}>Add to Cart</Button>
	)
}