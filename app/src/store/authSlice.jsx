import { createSlice } from "@reduxjs/toolkit";

const exitsUsers = JSON.parse(localStorage.getItem("userData")) || [];

const initialState = {
    errors: null,
    isAuthenticate: false,
    users: exitsUsers,
};

const authSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        signup: (state, action) => {
            state.users = action.payload;
            // console.log("state.users", state.users);
            localStorage.setItem("userData", JSON.stringify(state.users));

        },
        login: (state, action) => {
            state.isAuthenticate = action.payload;
            localStorage.setItem("isAuthenticate", JSON.stringify(state.isAuthenticate));
        },

        setErrors: (state, action) => {
            state.errors = action.payload;
            console.log("errros", state.errors);
        }
    },
});

console.log(authSlice.actions);
export default authSlice.reducer;
export const { signup, login, setErrors } = authSlice.actions;