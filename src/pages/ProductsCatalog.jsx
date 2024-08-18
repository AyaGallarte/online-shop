import { useState, useEffect, useContext } from 'react';
import AdminView from '../components/AdminView';
import UserView from '../components/UserView';
import UserContext from '../context/UserContext';
import { useProgress } from '../context/ProgressContext';

export default function ProductsCatalog() {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true); // Loading state
    const { user } = useContext(UserContext);
    const { startProgress, closeModal } = useProgress();

    const fetchData = async () => {
        setLoading(true); // Start loading

        let fetchUrl = user.isAdmin === true ? 
            "https://ra-server-nom3.onrender.com/products/all" : 
            "https://ra-server-nom3.onrender.com/products/active";
        try {
            const response = await fetch(fetchUrl, {
                headers: {
                    // Conditionally add the Authorization header if a token is present
                    ...(localStorage.getItem('token') && { 
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    })
                }
            })
            
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            
            const data = await response.json();
                
                if (data.message === "No products found") {
                    setProducts([]);
                } else {
                    setProducts(data.products || []);
                }
        } catch (error) {
            console.error("Error fetching data:", error);
            setProducts([]);
        } finally {
            closeModal();
            setLoading(false); // End loading
        }     
    };

   useEffect(() => {
        startProgress();
        const timer = setTimeout(() => {
            fetchData().finally(() => {
                closeModal(); // Close the progress bar after fetching data
            });
        }, 5000);

        return () => clearTimeout(timer);

    }, [user]);

    return (
       
        (user.isAdmin === true)
        ?
            <AdminView productsData={products} fetchData={fetchData}/>
        :
            <UserView productsData={products} fetchData={fetchData}/>
            
    )
}