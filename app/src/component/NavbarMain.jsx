import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../assets/logo.jpg';
import { BsCartCheck } from "react-icons/bs";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import { MdAccountCircle } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { setCount, updateCount } from "../store/cartSlice";

function NavbarMain() {
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const countGet = useSelector((state) => state.cart.count);
    console.log("countGet", countGet);

    useEffect(() => {
        dispatch(updateCount());//it used loging user count display so...
    }, []);


    const checkUser = JSON.parse(localStorage.getItem("isAuthenticate"));
    console.log(checkUser);

    const loginData = JSON.parse(localStorage.getItem("loginData"));
    const name = loginData?.name;


    const Logout = () => {
        localStorage.removeItem("isAuthenticate");
        localStorage.removeItem("loginData");
        dispatch(setCount(0));
        navigate("/home");
    };

    return (
        <Navbar expand="lg" className="bg-dark fixed-top" style={{ height: '50px' }}>
            <Container fluid className='mx-5'>
                <Navbar.Brand to="home" className='text-white'>
                    <img src={logo} alt="" height="50px" width="50px" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" className='bg-white' />
                <Navbar.Collapse id="navbarScroll" className='mx-5'>
                    <Nav
                        className="w-50 justify-content-between"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Link to="/home" className='text-white !no-underline'>Home</Link>
                        <Link to="/about" className='text-white !no-underline'>About</Link>
                        <Link to="/contact" className='text-white !no-underline'>Contact</Link>
                        <Link to="/menu" className='text-white !no-underline' >Menu</Link>

                    </Nav>
                </Navbar.Collapse>
                {
                    checkUser ? <>
                        <Dropdown>
                            <Dropdown.Toggle variant="primary" style={{ height: "30px", width: "50px" }}>
                                <MdAccountCircle style={{ width: "30px" }} />
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item style={{ backgroundColor: "grey", color: "white" }}>hello {name}</Dropdown.Item>
                                <Dropdown.Item style={{ backgroundColor: "grey", color: "white" }}>WellCome to Foody Zone</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <div className='relative mx-4'>
                            <p className='absolute right-[-10px] top-[-10px] w-4 text-center leading-4 bg-red-700 text-white aspect-square rounded-full text-[10px]'>
                                {countGet}
                            </p>
                            <BsCartCheck style={{ backgroundColor: "white", height: "30px", width: "30px", float: "right" }} onClick={() => navigate("showItem")} />
                        </div>
                        <button className='btn btn-success' onClick={Logout}>LogOut</button>
                    </>
                        : <>
                            <div className='relative mx-4'>
                                <p className='absolute right-[-10px] top-[-10px] w-4 text-center leading-4 bg-red-700 text-white aspect-square rounded-full text-[10px]'  >{countGet}</p>
                                <BsCartCheck style={{ backgroundColor: "white", height: "30px", width: "30px", float: "right" }} onClick={() => navigate("/login")} />
                            </div>
                            <button className='btn btn-success' onClick={() => navigate("/login")}>Login</button>
                        </>
                }
            </Container>
        </Navbar>
    );
}

export default NavbarMain;