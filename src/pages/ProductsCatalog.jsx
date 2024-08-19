import { useState, useEffect, useContext } from 'react';
import AdminView from '../components/AdminView';
import UserView from '../components/UserView';
import UserContext from '../context/UserContext';
import { useProgress } from '../context/ProgressContext';

export default function ProductsCatalog() {
    const [products, setProducts] = useState([]);
    const { user } = useContext(UserContext);
    const { startProgress, closeModal } = useProgress();

    const fetchData = async () => {
        try {
            
            const fetchUrl = user.isAdmin 
                ? "https://ra-server-nom3.onrender.com/products/all" 
                : "https://ra-server-nom3.onrender.com/products/active";

            const response = await fetch(fetchUrl, {
                headers: {
                    ...(localStorage.getItem('token') && { 
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    })
                }
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();

            setProducts(data.message === "No products found" ? [] : data.products || []);
        } catch (error) {
            console.error("Error fetching data:", error);
            setProducts([]);  // Handle the error by setting an empty state
        } finally {
            closeModal();  // End loading/progress
        }
    };

    useEffect(() => {
        startProgress(); 
        fetchData();
    }, [user]);

    return user.isAdmin 
        ? <AdminView productsData={products} fetchData={fetchData} />
        : <UserView productsData={products} fetchData={fetchData} />;
}
