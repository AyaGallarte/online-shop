import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import AppNavbar from './components/AppNavbar';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Register from './pages/Register';
import Login from './pages/Login';
import Logout from './pages/Logout';
import ProductsCatalog from './pages/ProductsCatalog'
import ProductView from './pages/ProductView'
import AddProduct from './pages/AddProduct'
import CartView from './pages/CartView'
import OrderView from './pages/OrderView'
import AdminOrderView from './pages/AdminOrderView'

function App() {
  const [user, setUser] = useState({
    id: null,
    isAdmin: null
  });

  function unsetUser() {
    localStorage.clear();
  }

  const token = localStorage.getItem('token');

  useEffect(() => {
     if (token !== null){
          fetch('https://ra-server-nom3.onrender.com/users/details', {
      mode: 'cors',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(res => res.json())
    .then(data => {
      if(typeof data !== 'undefined') {
        setUser({
          id: data.user._id,
          isAdmin: data.user.isAdmin
        });
        sessionStorage.setItem('token', data.token);
      } else {
        setUser({
          id: null,
          isAdmin: null
        });
        sessionStorage.clear();
      }
    });
     }
  }, []);

  useEffect(() => {
    console.log(user);
    console.log(localStorage);
  }, [user]);

  return (
    <UserProvider value={{ user, setUser, unsetUser }}>
      <Router>
        <AppNavbar />
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/products" element={<ProductsCatalog />}/>
            <Route path="/products/:productId" element={<ProductView />}/>
            <Route path="/addProduct" element={<AddProduct />}/>
            <Route path="/cart" element={<CartView />}/>
            <Route path="/order" element={<OrderView />}/>
            <Route path="/adminOrder" element={<AdminOrderView />}/>
          </Routes>
        </Container>
      </Router>
    </UserProvider>
  );
}

export default App;

