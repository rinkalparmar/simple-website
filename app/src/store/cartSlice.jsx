import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    count: 0,
};

const cartSlice = createSlice({
    name: "carts",
    initialState,
    reducers: {
        setCount: (state, action) => {
            state.carts = action.payload;
            console.log("state.carts", state.carts);
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
                state.count = userfind.items.length;
            }
            else {
                state.count = 0;
            }
        },

    }
});
export default cartSlice.reducer;
export const { setCount, updateCount, addItem, removeItems } = cartSlice.actions;