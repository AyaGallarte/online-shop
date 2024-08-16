import { useState, useEffect, useContext } from 'react';
import { Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Container, Card, Row, Col, ListGroup, ListGroupItem } from 'react-bootstrap';
import UserContext from '../context/UserContext';


export default function GetEmail ({userId}) {

	const token = localStorage.getItem('token');
	const [email, setEmail] = useState("");

    useEffect(() => {
   	 console.log(userId)
     if (token !== null){
          fetch(`https://ra-server-nom3.onrender.com/users/details-specific/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => res.json())
    .then(data => {
  		setEmail(data.user.email)
    });
     }
  }, [userId]);


	return(
	
            <Card.Title className="text-center bg-dark text-white p-2">
        Orders for user <span style={{ color: 'orange' }}>{email}</span>
        </Card.Title>
       
        
    
    )

}