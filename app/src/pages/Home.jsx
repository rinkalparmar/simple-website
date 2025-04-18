import React from 'react';
import hero from '../assets/heroimage.jpg';
import menu from '../pages/Menu';


function Home() {
    return (
        <>

            <div className='mt-5' style={{
                width: '100%',
                height: '100vh',
                backgroundImage: `url(${hero})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed'
            }}>
                <div className='d-flex flex-column justify-content-center align-items-center text-center mt-5' style={{ height: '100vh' }}>
                    <h1 className='text-white'>welcome to foody zone</h1>
                    <p className='text-white'>Hello every one
                        welcome to foody zone,
                        a place where you can find all the food you want.
                    </p>
                    <button type='button' className='btn btn-success'><a href="/menu" style={{textDecoration:"none" ,color:"white"}}>Order Now</a></button>
                </div>
            </div>
        </>
    );
}

export default Home;