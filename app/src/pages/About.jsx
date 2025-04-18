import React from 'react';
import french from '../assets/french2.jpeg';
import Footer from './Footer';

function About() {
  return (
    <>


      <h1 className='text-center mt-5' style={{ marginTop: '8px' }}>About Us</h1>
      <div className='mt-5' >
        <img src={french} alt="" height="500px" width="600px" className='rounded' style={{ float: "left" }} />
      </div>
      <div className='text-center mt-5 mx-10'>
        <p className='w-50 mx-auto'>
          Welcome to our restaurant! We are delighted to have you here. Our mission is to provide you with an unforgettable dining experience, where every bite is a celebration of flavor and every moment is filled with joy. Our talented chefs are dedicated to crafting exquisite dishes using the finest ingredients, ensuring that each meal is a masterpiece. Whether you're here for a special occasion or just a casual meal, we strive to make your visit exceptional. Thank you for choosing us, and we look forward to serving you soon!
        </p>
        <p className='w-50 mx-auto font-weight-bold'>
          We are passionate about food and believe that dining is not just about eating, but about creating memories. Our team is committed to providing exceptional service, ensuring that you feel welcomed and valued from the moment you step through our doors. We take pride in our diverse menu, which features a variety of cuisines to cater to every palate. Whether you're craving classic comfort food or adventurous culinary creations, we have something for everyone. Join us for a delightful culinary journey that will tantalize your taste buds and leave you wanting more!
        </p>
      </div>

      <Footer />
    </>
  );
}

export default About;