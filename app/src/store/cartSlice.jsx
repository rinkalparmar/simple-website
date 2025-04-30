import { createSlice } from "@reduxjs/toolkit";
import { useId } from "react";


const initialState = {
  // [{
  //   userId:1  itemid: 132,
  //     count: 2,
  // }, {userId:1  itemid: 132,count: 2,}]
  count: 0,
  items: [],
  totalPrice: 0,
  allInfo: []

};

const cartSlice = createSlice({
  name: "carts",
  initialState,
  reducers: {
    setCount: (state, action) => {
      state.count = action.payload;
      console.log("state.count", state.count);
    },

    addItem: (state, action) => {
      const loginData = JSON.parse(localStorage.getItem("loginData")) || {};
      const userId = loginData?.id;

      if (!userId) {
        return;
      }

      const cartData = JSON.parse(localStorage.getItem("cartData")) || [];

      const userfind = cartData.find((u) => u.userId === userId);

      if (userfind) {
        const existing = userfind.items.find(i => i.id === action.payload.id);
        console.log("existing", existing);
        if (existing) {
          existing.quantity += action.payload.quantity;
          existing.totalPrice += action.payload.totalPrice;
        }
        else {
          userfind.items.push(action.payload);
        }
      } else {
        cartData.push({ userId, items: [action.payload] });
      }
      localStorage.setItem("cartData", JSON.stringify(cartData));

      const updated = cartData.find((u) => u.userId === userId);
      // console.log("updated", updated);

      state.items = updated.items;
      state.count = updated.items.reduce((init, item) => init + item.quantity, 0);;
      state.totalPrice = updated.items.reduce((init, item) => init + item.totalPrice, 0);


      const itemId = action.payload.id;
      const quantity = action.payload.quantity;
      console.log("itemId", itemId);
      console.log("quantity", quantity);

      let allInfo = JSON.parse(localStorage.getItem("allInfo")) || [];
      console.log("object;;;;;;;;allInfo", allInfo);

      const existingInfo = allInfo.find(
        (entry) => entry.userId === userId && entry.itemId === itemId
      );
      console.log(";;;;;;;;;existingInfo", existingInfo);

      if (existingInfo) {
        existingInfo.count += quantity;
      } else {
        allInfo.push({
          userId,
          itemId,
          count: quantity
        });
      }
      localStorage.setItem("allInfo", JSON.stringify(allInfo));
      state.allInfo = allInfo;
    },

    // fetchCartData1: (state, action) => {
    //   const loginData = JSON.parse(localStorage.getItem("loginData")) || {};
    //   const userId = loginData?.id;
    //   console.log("show userId", userId);

    //   if (!userId) {
    //     state.count = 0;
    //     state.items = [];
    //     state.totalPrice = 0;
    //     return;
    //   }
    //   const cartData = JSON.parse(localStorage.getItem("cartData")) || [];

    //   const findUser = cartData.find((u) => u.userId === userId);
    //   console.log("objectfindUser", findUser);

    //   if (findUser) {
    //     state.items = findUser.items;
    //     state.count = findUser.items.reduce((init, item) => init + item.quantity, 0);
    //     state.totalPrice = findUser.items.reduce((init, item) => init + item.totalPrice, 0);
    //   }
    //   else {
    //     state.count = 0;
    //     state.items = [];
    //     state.totalPrice = 0;
    //   }

    // },

    removeItems: (state, action) => {
      // debugger;
      const loginData = JSON.parse(localStorage.getItem("loginData")) || {};
      const userId = loginData?.id;

      if (!userId) {
        return;
      }
      const cartData = JSON.parse(localStorage.getItem("cartData")) || [];
      const findUser = cartData.findIndex((u) => u.userId === userId);

      console.log("findUser---------------------", findUser);

      if (findUser !== -1) {
        const updateCartData = cartData[findUser].items.map((item) => {
          if (item.id === action.payload) {
            if (item.quantity > 1) {
              item.quantity -= 1;
              item.totalPrice = item.price * item.quantity;
              // return item;
              return { ...item };
            }
            else {

              return null;//when last item then remove to ui
            }
          }
          return item;//if not change then return same items
        }).filter(Boolean);//when last item there then delete from ui

        cartData[findUser].items = updateCartData;
        localStorage.setItem("cartData", JSON.stringify(cartData));

        state.items = updateCartData;
        state.count = updateCartData.reduce((init, item) => init + item.quantity, 0);
        state.totalPrice = updateCartData.reduce((init, item) => init + item.totalPrice, 0);

        // const allInfo = JSON.parse(localStorage.getItem("allInfo")) || [];

        // const updateAllInfoForRemove = allInfo.map((info) => {
        //   if (info.userId === userId && info.itemIds === action.payload) {
        //     if (info.count > 1) {
        //       info.count -= 1;
        //     }
        //     else {
        //       return null;//when last item then remove to ui
        //     }
        //   }
        //   return info;
        // }).filter(Boolean);
        // localStorage.setItem("allInfo", JSON.stringify(updateAllInfoForRemove));
      }
    },

    fetchCartData: (state, action) => {
      const loginData = JSON.parse(localStorage.getItem("loginData")) || {};
      const userId = loginData?.id;
      console.log("userId", userId);


      if (!userId) {
        state.count = 0;
        state.items = [];
        state.totalPrice = 0;
        return;
      }

      const cartData = JSON.parse(localStorage.getItem("cartData")) || [];
      console.log("cartData", cartData);

      const userfind = cartData.find((u) => u.userId === userId);
      console.log("userfind", userfind);

      if (userfind) {
        state.items = userfind.items;
        state.count = userfind.items.reduce((total, item) => total + item.quantity, 0);
        state.totalPrice = userfind.items.reduce((init, item) => init + item.totalPrice, 0);

      }
      else {
        state.count = 0;
        state.items = [];
        state.totalPrice = 0;
      }
    },

    removeItemFromCart: (state, action) => {
      state.count = 0;
      state.items = [];
      state.totalPrice = 0;
    },



  }
});
export default cartSlice.reducer;
export const { setCount, fetchCartData, addItem, removeItems, removeItemFromCart, fetchCartData1 } = cartSlice.actions;



/**
 * import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    // [{
    //     itemid: 132,
    //     count: 2,
    // }, i]
    count: 0,
};

const cartSlice = createSlice({
    name: "carts",
    initialState,
    reducers: {
        setCount: (state, action) => {
            state.count = action.payload;
            console.log("state.count", state.count);
        },
        addItem: (state, action) => {
            state.count += 1;
        },
        removeItems: (state, action) => {
            if (state.count > 0) state.count -= 1;

        },
        updateCount: (state, action) => {
            const loginData = JSON.parse(localStorage.getItem("loginData")) || {};
            const userId = loginData?.id;
            console.log("userId", userId);


            if (!userId) {
                state.count = 0;
                return;
            }

            const cartData = JSON.parse(localStorage.getItem("cartData")) || [];
            console.log("cartData", cartData);

            const userfind = cartData.find((u) => u.userId === userId);
            console.log("userfind", userfind);

            if (userfind) {
                // state.count = userfind.items.length;
                // state.count = userfind.items.reduce((total, item) => total + item.quantity, 0);
                state.count = userfind.items.reduce((total, item) => total + item.quantity, 0);
            }
            else {
                state.count = 0;
            }
        },

    }
});
export default cartSlice.reducer;
export const { setCount, updateCount, addItem, removeItems } = cartSlice.actions;
 */