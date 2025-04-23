import React, { useEffect, useState } from 'react';
import { useContext } from 'react';//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
import Context from '../redux/Context';//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@


function ShowItem() {
  const [items, setItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);


  const { removeItem: updateCartCount } = useContext(Context);//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@rename the removeItem to updateCartCount

  useEffect(() => {
    const logindata = JSON.parse(localStorage.getItem("logindata"));
    const userEmail = logindata?.email;

    if (userEmail) {
      const userOrders = JSON.parse(localStorage.getItem(`orders_${userEmail}`)) || [];
      setItems(userOrders);

      const total = userOrders.reduce((init, item) => init + item.price, 0);//init means set 0 value
      setTotalPrice(total);
    }

  }, []);


  const removeItem = (id) => {
    const logindata = JSON.parse(localStorage.getItem("logindata"));
    const userEmail = logindata?.email;
    // console.log(userEmail);

    const removeCount = JSON.parse(localStorage.getItem("orderCount"));
    console.log("remove", removeCount);
    const removeitem = removeCount - 1;



    if (userEmail) {
      const userOrders = JSON.parse(localStorage.getItem(`orders_${userEmail}`)) || [];
      console.log("userOrders", userOrders);
      // console.log(items);

      const findId = userOrders.filter((item) => item.id !== id);
      // console.log("object", findId);

      localStorage.setItem(`orders_${userEmail}`, JSON.stringify(findId));
      updateCartCount(); //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

      localStorage.setItem("orderCount", JSON.stringify(removeitem));

      setItems(findId);
      const newTotalPrice = findId.reduce((init, item) => init + item.price, 0);
      setTotalPrice(newTotalPrice);

    }
  };

  return (
    <div>
      <h1 className="text-center" style={{ marginTop: "45px" }}>Your Ordered Items</h1>
      <button className='btn btn-success float-right'>Total Payment ₹{totalPrice}</button>
      <div className="row" style={{ margin: "30px" }}>
        {
          items.map((item, index) => (
            <div className="col-sm-4" key={index}>
              <div className="card" style={{ width: '18rem', margin: "4px" }}>
                <img src={item.image} className="card-img-top" style={{ height: "250px" }} alt={item.name} />
                <div className="card-body">
                  <h5 className="card-title">{item.name}</h5>
                  <p className="card-text">{item.description}</p>
                  <p className="card-text"><strong>Price:</strong> ₹{item.price}</p>
                  <button className='btn btn-danger' onClick={() => removeItem(item.id)}>Remove Item</button>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default ShowItem;


