
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
    // debugger;
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



  // const removeItem = (id) => {
  //   // debugger;
  //   const userData = JSON.parse(localStorage.getItem("userData"));
  //   const userId = userData?.id;

  //   if (!userId) return;

  //   const removeCount = JSON.parse(localStorage.getItem("orderCount"));
  //   console.log("remove", removeCount);
  //   const removeitem = removeCount - 1;
  //   localStorage.setItem("orderCount", JSON.stringify(removeitem));


  //   const cartData = JSON.parse(localStorage.getItem(`cartData`)) || [];
  //   console.log("cartData", cartData);
  //   // console.log(items);

  //   const UpdateCartData = cartData.map((citem) => citem.userId === userId ? { ...citem, items: citem.items.filter((item) => item.id !== id) } : citem);

  //   localStorage.setItem("cartData", JSON.stringify(UpdateCartData));

  //   const userCart = UpdateCartData.find(cart => cart.userId === userId);
  //   const items = userCart?.items || [];
  //   // const findId = cartData.filter((item) => item.id !== id);
  //   // console.log("object", findId);

  //   // localStorage.setItem(`cartData`, JSON.stringify(findId));
  //   setItems(items);


  //   const newTotalPrice = items.reduce((init, item) => init + item.price, 0);//
  //   setTotalPrice(newTotalPrice);//

  //   updateCartCount(); //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//

  // };

  // const removeItem = (id) => {
  //   const userData = JSON.parse(localStorage.getItem("userData"));
  //   const userId = userData?.id;

  //   if (!userId) return;

  //   // Get current cart data
  //   const cartData = JSON.parse(localStorage.getItem("cartData")) || [];

  //   // Update the cart data by filtering out the item to be removed
  //   const updatedCartData = cartData.map((citem) =>
  //     citem.userId === userId
  //       ? { ...citem, items: citem.items.filter((item) => item.id !== id) }
  //       : citem
  //   );

  //   // Save the updated cart data to localStorage
  //   localStorage.setItem("cartData", JSON.stringify(updatedCartData));

  //   // Get the updated items for the user and update the state
  //   const updatedUserCart = updatedCartData.find(cart => cart.userId === userId);
  //   const updatedItems = updatedUserCart?.items || [];
  //   setItems(updatedItems);

  //   // Recalculate the total price after removal
  //   const newTotalPrice = updatedItems.reduce((init, item) => init + item.price, 0);
  //   setTotalPrice(newTotalPrice);

  //   // Call updateCartCount (if it updates the context/cart state)
  //   updateCartCount();
  // };


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
