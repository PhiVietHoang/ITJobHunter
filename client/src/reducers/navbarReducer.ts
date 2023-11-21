import { createReducer } from "@reduxjs/toolkit"

// Initial State
const initialState = {
   loginPage: false
};

// Reducers
export const navbarReducer = createReducer(initialState, (builder) => {
   builder
      .addCase("showLogin", (state) => {
         state.loginPage = true;
      })
      .addCase("showSignUp", (state) => {
         state.loginPage = false;
      })
});
