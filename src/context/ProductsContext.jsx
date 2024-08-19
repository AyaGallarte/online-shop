// context/ProductsContext.js
import { createContext, useState, useEffect } from 'react';

const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchProducts = async (isAdmin, token) => {
        try {
            const fetchUrl = isAdmin 
                ? "https://ra-server-nom3.onrender.com/products/all" 
                : "https://ra-server-nom3.onrender.com/products/active";

            const response = await fetch(fetchUrl, {
                headers: {
                    ...(token && { Authorization: `Bearer ${token}` })
                }
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setProducts(data.message === "No products found" ? [] : data.products || []);
        } catch (error) {
            console.error("Error fetching products:", error);
            setProducts([]); // Handle the error by setting an empty state
        } finally {
            setLoading(false); // Stop loading
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        const isAdmin = JSON.parse(localStorage.getItem('isAdmin'));
        fetchProducts(isAdmin, token);
    }, []);

    return (
        <ProductsContext.Provider value={{ products, loading }}>
            {children}
        </ProductsContext.Provider>
    );
};

export default ProductsContext;
