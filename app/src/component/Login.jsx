import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/esm/Container';
import { useDispatch, useSelector } from 'react-redux';
import { login, setErrors } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';
import { updateCount } from '../store/cartSlice';


function Login() {
    const navigate = useNavigate();
    const [input, setInput] = useState({ email: "", password: "" });


    const dispatch = useDispatch();
    const users = useSelector((state) => state.user.users);
    const errors = useSelector((state) => state.user.errors);
    console.log("users", users);
    console.log("error", errors);


    const handleSubmit = (event) => {
        event.preventDefault();

        // const { email, password } = input;
        const findUser = users.find((user) => { return user.email === input.email && user.password === input.password; });
        console.log("findUser", findUser);
        if (!findUser) {
            dispatch(setErrors("enter valide email and password"));
            return;
        }
        dispatch(login(true));
        localStorage.setItem("loginData", JSON.stringify(findUser));
        localStorage.setItem("isAuthenticate", true);


        dispatch(updateCount());
        navigate("/home");
        dispatch(setErrors(null));
        setInput({ email: "", password: "" });
    };



    const handleInput = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        setInput((input) => ({ ...input, [name]: value }));

    };



    return (
        <>
            <Container fluid className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
                <Row>
                    <Col>
                        <Form onSubmit={handleSubmit} style={{ width: "100%", maxWidth: '600px' }} className='p-4 shadow rounded bg-light'>
                            {errors && <div className="error">{errors}</div>}
                            <h2>Login Form</h2>
                            <Row className="mb-3">
                                <Form.Group md="4" >
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        required
                                        type="email"
                                        name='email'
                                        onChange={handleInput}
                                        value={input.email}
                                    />
                                </Form.Group>
                                <Form.Group md="4">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        required
                                        type="password"
                                        name='password'
                                        onChange={handleInput}
                                        value={input.password}
                                    />
                                </Form.Group>
                            </Row>
                            <Button type="submit" >Login</Button> <a href="/signup">create new account</a>
                        </Form>
                    </Col>
                </Row>

            </Container>
        </>
    );
}

export default Login;