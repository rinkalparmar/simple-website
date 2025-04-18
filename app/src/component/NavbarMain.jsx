import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../assets/logo.jpg';
import { BsCartCheck } from "react-icons/bs";
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

function NavbarMain() {

    const [getCount, setGetCount] = useState(0);

    useEffect(() => {
        const count = JSON.parse(localStorage.getItem("orderCount"));
        console.log("getCount", count);
        setGetCount(count);
    }, []);


    return (
        <Navbar expand="lg" className="bg-dark fixed-top" style={{ height: '50px' }}>
            <Container fluid className='mx-5'>
                <Navbar.Brand href="home" className='text-white'>
                    <img src={logo} alt="" height="50px" width="50px" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" className='bg-white' />
                <Navbar.Collapse id="navbarScroll" className='mx-5'>
                    <Nav
                        className="w-50 justify-content-between"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Nav.Link href="/home" className='text-white '>Home</Nav.Link>
                        <Nav.Link href="/about" className='text-white'>About</Nav.Link>
                        <Nav.Link href="/contact" className='text-white'>Contact</Nav.Link>
                        <Nav.Link href="/menu" className='text-white'>Menu</Nav.Link>

                    </Nav>
                </Navbar.Collapse>
                <div className='relative'>
                    <p className='absolute right-[-10px] top-[-10px] w-4 text-center leading-4 bg-red-700 text-white aspect-square rounded-full text-[10px]'>{getCount}</p>
                    <BsCartCheck style={{ backgroundColor: "white", height: "30px", width: "30px", float: "right" }} />
                </div>
            </Container>
        </Navbar>
    );
}

export default NavbarMain;