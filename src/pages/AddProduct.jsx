import { useState, useEffect, useContext } from 'react';
import { Form,Button } from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../style.css';

import UserContext from '../context/UserContext';

export default function AddProduct(){

    const navigate = useNavigate();

    const {user} = useContext(UserContext);

    
    const [name,setName] = useState("");
    const [description,setDescription] = useState("");
    const [price,setPrice] = useState("");

    function createProduct(e){

        e.preventDefault();

        let token = localStorage.getItem('token');
        console.log(token);

        fetch('https://ra-server-nom3.onrender.com/products/',{

            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({

                name: name,
                description: description,
                price: price

            })
        })
        .then(res => res.json())
        .then(data => {

            console.log(data);

            if(data.message === "Error creating product"){

                Swal.fire({
                    title: "Product Creation Error",
                    icon: "error",
                    text: data.error,
                    customClass: {
                        confirmButton: 'sweet-warning'
                    }
                });

            } else if (data.success === true) {
                
                setName("")
                setDescription("")
                setPrice(0);

                Swal.fire({
                    title: "Add Product Successful",
                    icon: "success",
                    text: "Product Added successfully.",
                    customClass: {
                        confirmButton: 'sweet-warning'
                    }
                });

                navigate("/products");
                

            } else {

                Swal.fire({
                    title: "Product Creation Error",
                    icon: "error",
                    text: "Unsuccessful Product Creation.",
                    customClass: {
                        confirmButton: 'sweet-warning'
                    }
                });

            }

        })

    }

    return (
    		(user.isAdmin === true && user.id !== null)
            ?
            <>
                <h1 className="my-5 text-center">Add Product</h1>
                <Form onSubmit={e => createProduct(e)}>
                    <Form.Group>
                        <Form.Label>Name:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Name"
                            required
                            value={name}
                            onChange={e => {setName(e.target.value)}}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Description:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Description"
                            required
                            value={description}
                            onChange={e => {setDescription(e.target.value)}}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Price:</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter Price"
                            required
                            value={price}
                            onChange={e => {setPrice(e.target.value)}}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="my-5">Submit</Button>
                </Form>
            </>
            :
            <Navigate to="/products" />

    )


}