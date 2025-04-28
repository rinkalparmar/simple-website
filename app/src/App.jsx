import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import NavbarMain from './component/NavbarMain';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Menu from './pages/Menu';
import Footer from './pages/Footer';
import Login from './component/Login';
import SignUp from './component/SignUp';
import ShowItem from './component/showItem';
import ProtectedRoute from "./component/ProtectedRoute";

function App() {
  const isAuthenticated = localStorage.getItem("isAuthenticate") === "true";
  console.log("isAuthenticated =", isAuthenticated);

  return (
    <>
      <NavbarMain />
      <Routes>
        {/* Public */}
        {/* {
          !isAuthenticated && <> */}
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/footer" element={<Footer />} />
            <Route path="/menu" element={<Menu />} />
          {/* </>
        } */}

        {/* Protected */}
        {/* <Route element={<ProtectedRoute />}> */}
          <Route path="/showitem" element={<ShowItem />} />
          <Route path="/home" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/footer" element={<Footer />} />
          <Route path="/menu" element={<Menu />} />
          {/* <Route path="/*" element={<Navigate to={isAuthenticated ? "/home" : "/login"} />} />
        </Route> */}
      </Routes>
    </>

  );
}

export default App;
