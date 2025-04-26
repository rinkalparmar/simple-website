
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateCount, removeItems } from '../store/cartSlice';


function ShowItem() {
  const [items, setItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateCount());
  }, [dispatch]);

  useEffect(() => {

    const loginData = JSON.parse(localStorage.getItem("loginData")) || {};
    const userId = loginData?.id;
    console.log("show userId", userId);

    if (!userId) {
      return;
    }

    const cartData = JSON.parse(localStorage.getItem("cartData")) || [];

    const findUser = cartData.find((u) => u.userId === userId);

    if (findUser) {
      setItems(findUser.items);

      const total = findUser.items.reduce((init, item) => init + item.totalPrice, 0);//this total price instatnt of price beacuse when quantity more then those make added so,,
      setTotalPrice(total);
    }

  }, []);

  const removeItem = (id) => {

    const loginData = JSON.parse(localStorage.getItem("loginData")) || {};
    const userId = loginData?.id;

    if (!userId) {
      return;
    }

    const cartData = JSON.parse(localStorage.getItem("cartData")) || [];

    const findUser = cartData.findIndex((u) => u.userId === userId);

    if (findUser !== -1) {
      const updateCartData = cartData[findUser].items.map((item) => {
        if (item.id === id) {
          if (item.quantity > 1) {
            item.quantity -= 1;
            item.totalPrice = item.price * item.quantity;
          }
          else {
            return null;
          }
        }
        return item;
      }).filter(Boolean);
      cartData[findUser].items = updateCartData;

      localStorage.setItem("cartData", JSON.stringify(cartData));
      setItems(updateCartData);


      const total = updateCartData.reduce((init, item) => init + item.totalPrice, 0);
      setTotalPrice(total);
      dispatch(removeItems());

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
                  <p className="card-text"><strong>Quantity:</strong> {item.quantity}</p>
                  <p className="card-text"><strong>Total Price:</strong> ₹{item.totalPrice}</p>
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

/**
 * 
import React, { useEffect, useState } from 'react';
import { useContext } from 'react';//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
import Context from '../redux/Context';//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@


function ShowItem() {
  const [items, setItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  // const { removeItem: updateCartCount ,countDisplay} = useContext(Context);//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@rename the removeItem to updateCartCount
  const { countDisplay } = useContext(Context);//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@rename the removeItem to updateCartCount


  useEffect(() => {

    const loginData = JSON.parse(localStorage.getItem("loginData")) || {};
    const userId = loginData?.id;
    console.log("show userId", userId);

    if (!userId) {
      return;
    }

    const cartData = JSON.parse(localStorage.getItem("cartData")) || [];

    const findUser = cartData.find((u) => u.userId === userId);
    console.log("findUser", findUser);

    if (findUser) {
      setItems(findUser.items);

      const total = findUser.items.reduce((init, item) => init + item.price, 0);
      setTotalPrice(total);
    }

  }, []);
  console.log("items", items);

  const removeItem = (id) => {
    debugger;
    const loginData = JSON.parse(localStorage.getItem("loginData")) || {};
    const userId = loginData?.id;
    console.log("remove userId", userId);

    if (!userId) {
      return;
    }

    // const orderCount = JSON.parse(localStorage.getItem("orderCount"));
    // const removeCount = orderCount - 1;
    // updateCartCount(removeCount);
    // localStorage.setItem("orderCount", JSON.stringify(removeCount));


    const cartData = JSON.parse(localStorage.getItem("cartData")) || [];

    const findUser = cartData.findIndex((u) => u.userId === userId);
    console.log("findUser", findUser);

    if (findUser !== -1) {
      const updateCartData = cartData[findUser].items.filter((item) => item.id !== id);
      console.log("updateCartData", updateCartData);
      cartData[findUser].items = updateCartData;

      localStorage.setItem("cartData", JSON.stringify(cartData));
      setItems(updateCartData);

      countDisplay();

      const total = updateCartData.reduce((init, item) => init + item.price, 0);
      setTotalPrice(total);

    }
  };


  console.log("items", items);
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

 */
