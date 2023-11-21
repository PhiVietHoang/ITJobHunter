import { createAction, createReducer } from "@reduxjs/toolkit";

export const loadingRequest = createAction("loadingRequest");
export const loadingSuccess = createAction("loadingSuccess");

const initialState = { uiLoader: false };

export const uiLoaderReducer = createReducer(initialState, (builder) => {
   builder
      .addCase(loadingRequest, (state) => {
         return { ...state, uiLoader: true };
      })
      .addCase(loadingSuccess, (state) => {
         return { ...state, uiLoader: false };
      })
});
