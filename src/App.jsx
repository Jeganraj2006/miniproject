import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/signup'
import History from './pages/History'
import Rental from './pages/Rental'
import Transaction from './pages/Transaction'
import Products from './pages/Products'
import Navigation from './Navigation'
import Footer from './Footer'
import './App.css'
import { BrowserRouter , Routes, Route } from 'react-router-dom'


function App() {

  return (
    <div>
    <BrowserRouter>
    <Navigation />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/history" element={<History />} />
        <Route path="/products" element={<Products />} />
        <Route path="/rental" element={<Rental />} />
        <Route path="/transaction" element={<Transaction />} />
        <Route path="/products" element={<Products />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </BrowserRouter>
    </div>
  )
}

export default App
