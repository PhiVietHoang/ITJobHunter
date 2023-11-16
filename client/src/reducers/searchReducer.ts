// reducer.ts
import { createReducer, PayloadAction } from "@reduxjs/toolkit";
import {
   setSearchQuery, UserActionRequest, UserActionReset
} from "../Actions/searchAction";

const initialState = {
   searchQuery: '',
   isActionsThere: false
};

export const searchReducer = createReducer(initialState, (builder) => {
   builder
      .addCase(setSearchQuery, (state, action) => {
         state.searchQuery = (action as PayloadAction<any>).payload;
      })
      .addCase(UserActionRequest, (state, action) => {
         state.isActionsThere = true;
      })
      .addCase(UserActionReset, (state, action) => {
         state.isActionsThere = false;
      })
});



