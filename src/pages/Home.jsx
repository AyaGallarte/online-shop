// import { Row, Col, Container } from 'react-bootstrap';
// import { Link } from 'react-router-dom';
// import CarouselPage from '../components/Carousel';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import '../index.css';

// export default function Home() {
//     return (

//            <div className="page-container">
//             <div className="content-wrapper">
//                 <CarouselPage />
//             </div>
//         </div>
//     );
// }

import { useContext, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import CarouselPage from '../components/Carousel';
import ProductsContext from '../context/ProductsContext';  // Assuming you have a context for products
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css';

export default function Home() {
    const { fetchProducts } = useContext(ProductsContext);

    useEffect(() => {
        // Fetch products when the Home component mounts
        fetchProducts();
    }, [fetchProducts]);

    return (
        <Container className="page-container">
            <div className="content-wrapper">
                <CarouselPage />
                {/* You could optionally show some products preview here */}
            </div>
        </Container>
    );
}
