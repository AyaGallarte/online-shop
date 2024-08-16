import React, { useState, useEffect } from 'react';
import { Button, InputGroup, FormControl } from 'react-bootstrap';

export default function CartQuantity({ cartQuantity, cartProductId, fetchCart }) {
    const [quantity, setQuantity] = useState(cartQuantity);

    useEffect(() => {
        
        const updateCartQuantity = async () => {
            try {
                const response = await fetch(`https://ra-server-nom3.onrender.com/cart/update-cart-quantity`, {
                    method: 'PATCH',
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    },
                    body: JSON.stringify({
                        productId: cartProductId,
                        quantity: quantity 
                    })
                });
                if (!response.ok) {
                    throw new Error('Failed to update quantity');
                }
                fetchCart();
            } catch (error) {
                console.error('Error updating cart quantity:', error);
                
            }
        };

      
        updateCartQuantity();
    }, [quantity, cartProductId]); 

    const incrementQuantity = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    const decrementQuantity = () => {
        if (quantity > 1) {
            setQuantity(prevQuantity => prevQuantity - 1);
        }
    };

    return (
        <td>
            <InputGroup className="ms-3 mb-3">
                <Button variant="dark" onClick={decrementQuantity}>-</Button>
                <FormControl
                    aria-label="Quantity"
                    aria-describedby="basic-addon1"
                    value={quantity}
                    readOnly
                    className="text-center form-control"
                    style={{ maxWidth: '5em' }}
                />
                <Button variant="dark" onClick={incrementQuantity}>+</Button>
            </InputGroup>
        </td>
    );
}
