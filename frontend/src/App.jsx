import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Collection from "./pages/Collection";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Orders from "./pages/Orders";
import Placeorder from "./pages/Placeorder";
import Product from "./pages/Product";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Search from "./components/Search";
 import { ToastContainer, toast } from 'react-toastify';
 import 'react-toastify/dist/ReactToastify.css';
import Verify from "./pages/Verify";
import Myprofile from "./pages/Myprofile";
import Newsletterbox from "./components/Newsletterbox";

const App = () => {
  return (
    <div className="min-h-screen bg-white  ">
     <ToastContainer position="top-right" autoClose={3000} />
      <Navbar />
      <Search/>
      <div className="max-w-20xl   mx-auto mx-0 ">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/collections" element={<Collection />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/place-order" element={<Placeorder />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path='/verify' element={<Verify/>}/>
          <Route path="/myprofile" element={<Myprofile/>}/>
        </Routes>
          <Newsletterbox/>
        <Footer/>
      </div>
    </div>
  );
};

export default App;
