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
   
    const fetchOrder = () => {
        let fetchUrl = "https://ra-server-nom3.onrender.com/orders/my-orders"

        fetch(fetchUrl, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
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
    <Card.Body>
      <Card.Text>Purchased on: {new Date(orderItem.orderedOn).toLocaleString()}</Card.Text>
       <ListGroup className="list-group-flush">
        {orderItem.productsOrdered.map(product => (
           <ListGroupItem key={product._id}>
            <CartToProduct cartProductId={product.productId} productQuantity={product.quantity} keyOrder={keyOrder}/>
            </ListGroupItem>

        ))}

       </ListGroup>
       <Card.Text>Total: <span style={{ color: 'orange' }}>₱{orderItem.totalPrice}</span></Card.Text>
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
                    <Card >
                        <Card.Body className="p-0" style={{ backgroundColor: 'orange' }}>
                             <GetEmail userId={user.id} />
                            <Card.Text className="m-2">{orderUser}</Card.Text>
                        </Card.Body>        
                    </Card>
                </Col>
            </Row>
        </Container>
        </>
    )

}