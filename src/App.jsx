import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup'; // fixed casing
import History from './pages/History';
import Rental from './pages/Rental';
import Transaction from './pages/Transaction';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Navigation from './Navigation';
import Footer from './assets/Footer';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Seller_navigation from './Seller_navigation';
import Seller_Login from './Seller/Seller_Login';
import Seller_Signup from './Seller/Sellersignup'; // used as sSignup in your code
import Login_options from './pages/Login_options';
import Dashboard from './Seller/Dashboard';
import Products_list from './Seller/Products_list';
import Rental_list from './Seller/Rental_list';
import Orders from './Seller/Order';
import Orders_History from './Seller/Orders_History';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navigation />
        <Routes>
          {/* Regular User Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/history" element={<History />} />
          <Route path="/products" element={<Products />} />
          <Route path="/rental" element={<Rental />} />
          <Route path="/transaction" element={<Transaction />} />
          <Route path="/login" element={<Login />} />
          <Route path="/login_options" element={<Login_options />} />
          <Route path="/signup" element={<Signup />} />

          {/* Seller Routes */}
          <Route path="/sLogin" element={<Seller_Login />} />
          <Route path="/sSignup" element={<Seller_Signup />} /> {/* Added Seller Signup */}
          <Route path="/sDashboard" element={<Dashboard />} />
          <Route path="/srental" element={<Rental_list />} />
          <Route path="/sproducts" element={<Products_list />} />
          <Route path="/sorder_history" element={<Orders_History />} />
          <Route path="/sorders" element={<Orders />} />
        </Routes>
        <Seller_navigation />
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
