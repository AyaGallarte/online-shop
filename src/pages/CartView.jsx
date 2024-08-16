import { useState, useEffect, useContext } from 'react';
import { Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import UserContext from '../context/UserContext';
import CartToProduct from '../components/CartToProduct';
import CartQuantity from '../components/CartQuantity';
import RemoveItemFromCart from '../components/RemoveItemFromCart';
import ClearCart from '../components/ClearCart';
import Checkout from '../components/Checkout'


export default function CartView() {

    const [cart, setCart] = useState([]);
    const [cartUser, setCartUser] = useState([]);
    const [totalPrice, setTotalPrice] = useState([]);
    const {user} = useContext(UserContext);

    const fetchCart = () => {
        let fetchUrl = "https://ra-server-nom3.onrender.com/cart/get-cart"

        fetch(fetchUrl, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => {         

            if(data.message === "Cart not found"){
                setCart([])
            } else {
                setCart(data.cart.cartItems);
                setTotalPrice(data.cart.totalPrice);
            }
        });
    }

   useEffect(() => {

        fetchCart();


    }, [user]);

       useEffect(() => {

        const cartArr = cart.map(cartItem => {
            return (
              
                <tr key={cartItem._id}>
                    <CartToProduct cartProductId={cartItem.productId}/>
                    <CartQuantity cartProductId={cartItem.productId} cartQuantity={cartItem.quantity} fetchCart={fetchCart}/>
                    <td>₱{cartItem.subtotal}</td>
                    
                    <td className="text-center">
                        <RemoveItemFromCart cartProductId={cartItem.productId} fetchCart={fetchCart}/>
                    </td>
                </tr>
                )
        })

        setCartUser(cartArr)

    }, [cart])

    return(
        (cartUser.length === 0)
        ?
        <>
            <h1 className="text-center my-4">No Cart</h1>
        </>
        : 
        <>
            <h2 className="text-center my-4">Your Shopping Cart</h2>
            <Table striped bordered hover responsive>
                <thead>
                    <tr className="text-center table-dark">
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Subtotal</th>
                        <th colSpan="2"></th>
                    </tr>
                </thead>

                <tbody>
                    {cartUser}
                    <tr>
                        <td colSpan="4">
                        <Checkout fetchCart={fetchCart}/>
                        </td>
                        <td >Total: ₱{totalPrice}</td>
                    </tr>
                </tbody>
            </Table>    
            <ClearCart fetchCart={fetchCart} />
            
        </>

        )
}