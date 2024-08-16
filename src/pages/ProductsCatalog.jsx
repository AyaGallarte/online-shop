import { useState, useEffect, useContext } from 'react';
import AdminView from '../components/AdminView';
import UserView from '../components/UserView';
import UserContext from '../context/UserContext';

export default function ProductsCatalog() {

    const [products, setProducts] = useState([]);
    const {user} = useContext(UserContext);

    const fetchData = () => {
        // Determine the fetch URL based on user role
        let fetchUrl = user.isAdmin === true ? 
            "https://ra-server-nom3.onrender.com/products/all" : 
            "https://ra-server-nom3.onrender.com/products/active";

        fetch(fetchUrl, {
            headers: {
                // Conditionally add the Authorization header if a token is present
                ...(localStorage.getItem('token') && { 
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                })
            }
        })
        .then(res => {
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.json();
        })
        .then(data => {
            // Check if no products were found and update state accordingly
            if (data.message === "No products found") {
                setProducts([]);
            } else {
                setProducts(data.products || []);
            }
        })
        .catch(error => {
            console.error('Fetch error:', error);
            // Handle the error, e.g., by setting an error message in the state
            setProducts([]);  // Or any other error handling you prefer
        });
    };


   useEffect(() => {

        fetchData();

    }, [user]);

    return(
       
        (user.isAdmin === true)
        ?
            <AdminView productsData={products} fetchData={fetchData}/>
        :
            <UserView productsData={products} fetchData={fetchData}/>
            
    )
}