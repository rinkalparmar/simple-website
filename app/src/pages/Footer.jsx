import React from 'react';
import snepchart from '../assets/snepchart.jpg';
import s from '../assets/s.png';
import s1 from '../assets/s1.png';
import s2 from '../assets/s2.jpg';


function Footer() {
    return (
        <>
            <div>
                <div className='bg-dark text-white text-center mt-20' style={{ height: "150px", marginTop: '200px',marginBottom:'0px' }}>
                    <h1 className='text-center mt-5'>Follow Us</h1>
                    <div className='d-flex justify-content-center align-items-center '>
                        <img src={s} alt="" height="50px" width="50px" className='mx-2' />
                        <img src={s1} alt="" height="50px" width="50px" className='mx-2' />
                        <img src={s2} alt="" height="50px" width="50px" className='mx-2' />
                        <img src={snepchart} alt="" height="50px" width="50px" className='mx-2' />
                    </div>
                        <br />
                        <div>
                            @2023 Foody Zone. All rights reserved.
                        </div>
                        <br />
                </div>
            </div>
        </>
    );
}

export default Footer;