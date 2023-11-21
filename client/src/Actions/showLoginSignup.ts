import {
    SHOW_LOGIN,
    SHOW_SIGNUP
 } from "../Constants/LoginSignUpPageConstants";
 
 
 export const showLogin = () => async (dispatch: any) => {
    dispatch({
       type: SHOW_LOGIN
    });
 };
 
 export const showSignup = () => async (dispatch: any) => {
    dispatch({
       type: SHOW_SIGNUP
    });
 }