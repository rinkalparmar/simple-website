import React from 'react';
import NavbarMain from './component/NavbarMain';
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Menu from './pages/Menu';
import Footer from './pages/Footer';
import Login from './component/Login';
import SignUp from './component/SignUp';
import ShowItem from './component/showItem';

function App() {
  return (
    <>
      <NavbarMain />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="menu" element={<Menu />} />
        <Route path="footer" element={<Footer />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="showitem" element={<ShowItem/>} />

      </Routes>
    </>
  );
}

export default App;