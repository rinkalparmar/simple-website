import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  // [{
  //     itemid: 132,
  //     count: 2,
  // }, i]
  count: 0,
  items: [],
  totalPrice: 0

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
      // state.count += 1;
      const loginData = JSON.parse(localStorage.getItem("loginData")) || {};
      const userId = loginData?.id;

      if (!userId) {
        return;
      }

      const cartData = JSON.parse(localStorage.getItem("cartData")) || [];
      const userfind = cartData.find((u) => u.userId === userId);
      console.log("action???? ", userfind);

      if (userfind) {
        const existing = userfind.items.find(i => i.id === action.payload.id);
        console.log("existing", existing);
        if (existing) {
          existing.quantity += action.payload.quantity;
          existing.totalPrice += existing.price * existing.quantity;
        }
        else {
          userfind.items.push(action.payload);
        }
      } else {
        cartData.push({ userId, items: [action.payload] });
      }
      localStorage.setItem("cartData", JSON.stringify(cartData));

      state.items = ([...state.items, action.payload]);//this store in redux dev tool also store exist data so..
      state.count += action.payload.quantity;
      state.totalPrice += action.payload.totalPrice;
    },
    fetchCartData: (state, action) => {
      const loginData = JSON.parse(localStorage.getItem("loginData")) || {};
      const userId = loginData?.id;
      console.log("show userId", userId);

      if (!userId) {
        state.count = 0;
        state.items = [];
        state.totalPrice = 0;
        return;
      }
      const cartData = JSON.parse(localStorage.getItem("cartData")) || [];

      const findUser = cartData.find((u) => u.userId === userId);
      console.log("objectfindUser", findUser);

      if (findUser) {
        state.items = findUser.items;
        state.count = findUser.items.reduce((init, item) => init + item.quantity, 0);
        state.totalPrice = findUser.items.reduce((init, item) => init + item.totalPrice, 0);
      }
      else {
        state.count = 0;
        state.items = [];
        state.totalPrice = 0;
      }

    },
    removeItems: (state, action) => {
      // if (state.count > 0) state.count -= 1;
      const loginData = JSON.parse(localStorage.getItem("loginData")) || {};
      const userId = loginData?.id;

      if (!userId) {
        return;
      }
      const cartData = JSON.parse(localStorage.getItem("cartData")) || [];
      const findUser = cartData.findIndex((u) => u.userId === userId);

      console.log("findUser---------------------", findUser);

      // cartData = cartData[findUser];
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
        }).filter(Boolean);

        cartData[findUser].items = updateCartData;
        localStorage.setItem("cartData", JSON.stringify(cartData));

        state.items = updateCartData;
        state.count = updateCartData.reduce((init, item) => init + item.quantity, 0);
        state.totalPrice = updateCartData.reduce((init, item) => init + item.totalPrice, 0);

      }

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
        state.count = userfind.items.reduce((total, item) => total + item.quantity, 0);
      }
      else {
        state.count = 0;
      }
    },

  }
});
export default cartSlice.reducer;
export const { setCount, updateCount, addItem, removeItems, fetchCartData } = cartSlice.actions;



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