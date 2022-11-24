import axios from 'axios'
import {LOGIN_REQUEST,LOGIN_SUCCESS,LOGIN_FAIL,ADMIN_LOGIN_REQUEST,ADMIN_LOGIN_SUCCESS,ADMIN_LOGIN_FAIL,SIGNUP_REQUEST,SIGNUP_SUCCESS,SIGNUP_FAIL,LOGOUT_REQUEST,LOGOUT_SUCCESS,LOGOUT_FAIL,GET_USER_DETAILS_REQUEST,GET_USER_DETAILS_SUCCESS,GET_USER_DETAILS_FAIL} from './user.type'


export const login = (user) => async(dispatch) =>{
    try {
        dispatch({type:LOGIN_REQUEST});
        const config = { headers: { "Content-Type": "application/json" } };
        const userData = await axios({
            method:"POST",
            url:"http://localhost:4000/api/v1/user/login",
            data: user,
            config
        })
        return dispatch({type:LOGIN_SUCCESS,payload:userData.data})
    }catch (error) {
        return dispatch({type:LOGIN_FAIL,payload: error.response.data.message});
    }
}
export const adminLogin = (user) => async(dispatch) =>{
    try {
        dispatch({type:ADMIN_LOGIN_REQUEST});
        // console.log(user);
        const config = { headers: { "Content-Type": "application/json" } };
        const userData = await axios({
            method:"POST",
            url:"http://localhost:4000/api/v1/user/adminLogin",
            data: user,
            config
        })
        return dispatch({type:ADMIN_LOGIN_SUCCESS,payload:userData.data})
    }catch (error) {
        return dispatch({type:ADMIN_LOGIN_FAIL,payload: error.response.data.message});
    }
}

export const signUp = (user) => async(dispatch) =>{
    try {
        dispatch({type:SIGNUP_REQUEST});
        // console.log(user);
        const config = { headers: { "Content-Type": "application/json" } };
        const userData = await axios({
            method:"POST",
            url:"http://localhost:4000/api/v1/user/signup",
            data: user,
            config
        })
        // console.log(user);
        return dispatch({type:SIGNUP_SUCCESS,payload:userData.data})
    } catch (error) {
        return dispatch({type:SIGNUP_FAIL,payload: error.response.data.message});
    }
}
export const logout = () => async(dispatch) =>{
    try {
        dispatch({type:LOGOUT_REQUEST});
        const config = { headers: { "Content-Type": "application/json" } };
        await axios({
            method:"GET",
            url:"http://localhost:4000/api/v1/user/logout",
            config
        })
        return dispatch({type:LOGOUT_SUCCESS})
    } catch (error) {
        return dispatch({type:LOGOUT_FAIL,payload: error.response.data.message});
    }
}
export const getUserDetails = () => async(dispatch) =>{
    try {
        dispatch({type:GET_USER_DETAILS_REQUEST})
        const user = await axios({
            
            method:"GET",
            url:"http://localhost:4000/api/v1/user/me"
        })
        return dispatch({type:GET_USER_DETAILS_SUCCESS,payload:user.data});

    } catch (error) {
        dispatch({type:GET_USER_DETAILS_FAIL,payload: error.response.data.message})
    }
}