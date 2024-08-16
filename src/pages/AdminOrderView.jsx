import { useState, useEffect, useContext } from 'react';
import { Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Container, Card, Row, Col, ListGroup, ListGroupItem } from 'react-bootstrap';
import UserContext from '../context/UserContext';
import CartToProduct from '../components/CartToProduct';
import GetEmail from '../components/GetEmail'

export default function OrderView() {

    const [order, setOrder] = useState([]);
    const [orderUser, setOrderUser] = useState([]);
    const {user} = useContext(UserContext);
    const [email, setEmail] = useState("")
    const token = localStorage.getItem('token');

    const fetchOrder = () => {
        let fetchUrl = "https://ra-server-nom3.onrender.com/orders/all-orders"

        fetch(fetchUrl, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(data => {         
            if(data.error === "No orders found"){
                setOrder([])
            } else {
                setOrder(data.orders);
                
            }
        });
    }

   useEffect(() => {

        fetchOrder();
        
    }, [user]);

useEffect(() => {
const keyOrder = "key"
  const orderArr = order.map(orderItem => (
    <Card key={orderItem._id} style={{ marginBottom: '20px' }}>
    <GetEmail userId={orderItem.userId}/>
    <Card.Body style={{ backgroundColor: 'orange' }}>
      <Card.Text style={{ color: 'white' }}>Purchased on: {new Date(orderItem.orderedOn).toLocaleString()}</Card.Text>
       <ListGroup className="list-group-flush">
        {orderItem.productsOrdered.map(product => (
           <ListGroupItem key={product._id}>
            <CartToProduct cartProductId={product.productId} productQuantity={product.quantity} keyOrder={keyOrder}/>
              </ListGroupItem>

        ))}

       </ListGroup>
        <Card.Text className="my-2">Total: <span style={{ color: 'red' }}>₱{orderItem.totalPrice}</span></Card.Text>
       </Card.Body>

    </Card>

  ));
  setOrderUser(orderArr);
}, [order]);

	return(
		  (orderUser.length === 0)
        ?
        <>
            <h1 className="text-center my-4">No Orders</h1>
        </>
        : 
        <>
        <Container className="mt-5">
            <Row>
                <Col>
                    <h1 className="text-center my-4">Admin Dashboard Order History</h1>
					<Card.Text className="m-2">{orderUser}</Card.Text>
                </Col>
            </Row>
        </Container>
        </>
    )

}