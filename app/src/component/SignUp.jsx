import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/esm/Container';
import { useDispatch } from 'react-redux';
import { signup, setErrors } from '../store/authSlice';
import { useSelector } from 'react-redux';
import { useContext } from 'react';
import Context from '../redux/Context';


function SignUp() {
    const [data, setData] = useState({ id: "", name: "", email: "", mobile: "", password: "" });
    const [error, setError] = useState("");

    const dispatch = useDispatch();
    const users = useSelector((state) => state.user.users);
    const errors = useSelector((state) => state.user.errors);
    console.log("users", users);
    console.log("error", errors);


    const { setGetCount } = useContext(Context);



    const nameFormate = (name) => {
        return /^[a-zA-Z]+$/.test(name);
    };

    const emailFormate = (email) => {
        return /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(email);
    };

    const passwordFormate = (password) => {
        return /^[a-zA-Z0-9]+$/.test(password);
    };

    const mobileFormate = (mobile) => {
        return /^\d{10}$/.test(mobile);
    };
    const idFormate = (id) => {
        return /^[0-9]+$/.test(id);
    };


    const validation = (data) => {
        const newErrors = {};

        if (users.some((item) => item.id === data.id)) {
            newErrors.id = "enter unique id";
        }


        if (!data.name || !nameFormate(data.name)) {
            newErrors.name = "enter only latter as name";
        }

        if (!data.email || !emailFormate(data.email)) {
            newErrors.email = "enter only latter as name";
        }

        if (!data.mobile || !mobileFormate(data.mobile)) {
            newErrors.mobile = "enter only 10 digit";
        }

        if (!data.password || !passwordFormate(data.password)) {
            newErrors.password = "enter password as latter and number only ";
        }

        setError(newErrors);
        return !Object.keys(newErrors).length;//if any error then give false and 0 otherwise truen true
    };



    const handleSubmit = (event) => {
        event.preventDefault();

        setGetCount(0);//@@@@@@@@@@

        const checkUser = users.find((user) => { if (user.email === data.email) { return user; } });
        console.log("checkUser", checkUser);

        if (checkUser) {
            console.log("exits user");
            dispatch(setErrors("user already exits with this email"));
            return;
        }


        const checkValidation = validation(data);
        if (!checkValidation) {
            return;
        }

        const preData = [...users, data];//add user with exist user
        dispatch(signup(preData));
        setData({ id: "", name: "", email: "", mobile: "", password: "" });
        setError({});
        dispatch(setErrors(null));
    };


    const handleInput = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        setData((predata) => ({ ...predata, [name]: value }));
        validation({ ...data, [name]: value });
    };
    console.log(data);
    return (
        <>
            <Container fluid className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
                <Form onSubmit={handleSubmit} style={{ width: "100%", maxWidth: '600px' }} className='p-4 shadow rounded bg-light'>
                    {errors && <div className='error'>{errors}</div>}
                    <h2 className='text-center'>Sign Up Form</h2>
                    <Row className="mb-3">
                        <Form.Group md="4" >
                            <Form.Label>Id</Form.Label>
                            <Form.Control
                                type="Text"
                                name="id"
                                onChange={handleInput}
                                value={data.id}
                            />
                            {error.id && <div className="error">{error.id}</div>}
                        </Form.Group>
                        <Form.Group md="4" >
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="Text"
                                name="name"
                                onChange={handleInput}
                                value={data.name}
                            />
                            {error.name && <div className="error">{error.name}</div>}
                        </Form.Group>
                        <Form.Group md="4" >
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                onChange={handleInput}
                                value={data.email}
                            />
                            {error.email && <div className="error">{error.email}</div>}
                        </Form.Group>
                        <Form.Group md="4">
                            <Form.Label>Mobile</Form.Label>
                            <Form.Control
                                type="number"
                                name="mobile"
                                onChange={handleInput}
                                value={data.mobile}
                            />
                            {error.mobile && <div className="error">{error.mobile}</div>}
                        </Form.Group>
                        <Form.Group md="4">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                onChange={handleInput}
                                value={data.password}
                            />
                            {error.password && <div className="error">{error.password}</div>}
                        </Form.Group>
                    </Row>
                    <Button type="submit">SignUp</Button> <a href="/login">login</a>
                </Form>


            </Container>
        </>
    );
}

export default SignUp;
