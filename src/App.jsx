import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/signup';
import History from './pages/History';
import Rental from './pages/Rental';
import Transaction from './pages/Transaction';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Navigation from './Navigation';
import Footer from './assets/Footer';
import AuthCallback from './pages/AuthCallback';


import Seller_navigation from './SellerNavigation';
import Seller_Login from './Seller/SellerLogin';
import Seller_Signup from './Seller/Sellersignup';
import Login_options from './pages/Login_options';
import Dashboard from './Seller/Dashboard';
import Productslist from './Seller/Productslist';
import RentalList from './Seller/Rental_list';  // Update import here
import Orders from './Seller/Order';
import Orders_History from './Seller/Orders_History';

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent() {
  const location = useLocation();
  const [sellerUser, setSellerUser] = useState(null);

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSellerUser(session?.user || null);
    };

    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSellerUser(session?.user || null);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const isSellerRoute = location.pathname.startsWith('/s');
  const showSellerNav = isSellerRoute && sellerUser;

  // Role-based protection
  const PrivateRoute = ({ children, allowedRole }) => {
    const role = localStorage.getItem('selectedRole');
    return role === allowedRole ? children : <Navigate to="/" />;
  };

  return (
    <div>
      {/* Dynamic Navigation */}
      {showSellerNav ? <Seller_navigation /> : <Navigation />}

      <Routes>
        {/* User Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/history" element={<History />} />
        <Route path="/products" element={<Products />} />
        <Route path="/rental" element={<Rental />} />
        <Route path="/transaction" element={<Transaction />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login_options" element={<Login_options />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/auth-callback" element={<AuthCallback />} />
        <Route path="/client-dashboard" element={
          <PrivateRoute allowedRole="client">
            <Home /> {/* Replace with a real ClientDashboard component if needed */}
          </PrivateRoute>
        }/>

        {/* Seller Routes */}
        <Route path="/sLogin" element={<Seller_Login />} />
        <Route path="/sSignup" element={<Seller_Signup />} />
        <Route path="/sDashboard" element={
          <PrivateRoute allowedRole="seller">
            <Dashboard />
          </PrivateRoute>
        } />
        <Route path="/srental" element={<RentalList />} />  {/* Update path here */}
        <Route path="/sproducts" element={<Productslist />} />
        <Route path="/sorder_history" element={<Orders_History />} />
        <Route path="/sorders" element={<Orders />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
