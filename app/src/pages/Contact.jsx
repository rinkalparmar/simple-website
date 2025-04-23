import React, { useEffect, useState } from 'react';
import hero from '../assets/hero1.avif';
import Footer from './Footer';

function Contact() {
    const [data, setData] = useState({ email: "", msg: "" });

    const handleInput = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        setData((preData) => ({ ...preData, [name]: value }));

    };
    const handleSubmit = (event) => {
        event.preventDefault();

        const existRespones = JSON.parse(localStorage.getItem("responce")) || [];
        const allData = [...existRespones, data];
        localStorage.setItem("responce", JSON.stringify(allData));
        setData({ email: "", msg: "" });
    };

    return (
        <>

            <h1 className='text-center mt-5'>Contact Us</h1>

            <div style={{ marginTop: '8px' }}>
                <img src={hero} alt="" height="500px" width="600px" className='rounded mx-8' style={{ float: "left" }} />
            </div>
            <div className='text-center mt-5 mx-10'>
                <p className='w-50 mx-auto'>
                    Welcome to our restaurant! We are delighted to have you here. Our mission is to provide you with an unforgettable dining experience, where every bite is a celebration of flavor and every moment is filled with joy. Our talented chefs are dedicated to crafting exquisite dishes using the finest ingredients, ensuring that each meal is a masterpiece. Whether you're here for a special occasion or just a casual meal, we strive to make your visit exceptional. Thank you for choosing us, and we look forward to serving you soon!
                </p>
            </div>


            <div className='mt-5'>
                <div className='d-flex justify-content-center align-items-center mt-5'>
                    <form className='w-50 mx-auto' onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Email address</label>
                            <input type="email" className="form-control" name='email' onChange={handleInput} value={data.email} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Message</label>
                            <textarea className="form-control" name="msg" rows="3" onChange={handleInput} value={data.msg} />
                        </div>
                        <button type='submit' className='btn btn-success'>submit</button>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Contact;