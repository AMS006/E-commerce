import {LOGIN_REQUEST,LOGIN_SUCCESS,LOGIN_FAIL,SIGNUP_REQUEST,SIGNUP_SUCCESS,SIGNUP_FAIL,LOGOUT_REQUEST,LOGOUT_SUCCESS,LOGOUT_FAIL} from './auth.type'

const initialState = {
    user:{
        name:"",
        email:"",
        role:"",
        phoneNumber:"",
        avatar:""
    },
    token:"",
    loading:false,
    error:""
}
export default authReducer = (state = initialState, action) =>{
    switch(action.type){
        case LOGIN_REQUEST:
            return{
                ...state,
                loading:true
            }
        case LOGIN_SUCCESS:
            return{
                ...state,
                user:action.payload.user,
                token:action.payload.token,
                loading:false
            }
        case LOGIN_FAIL:
            return{
                ...state,
                loading:false,
                error:action.payload.message
            }
        case SIGNUP_REQUEST:
            return{
                ...state,
                loading:true
            }
        case SIGNUP_SUCCESS:
            return{
                ...state,
                user:action.payload.user,
                token:action.payload.token,
                loading:false
                }
        case SIGNUP_FAIL:
            return{
                ...state,
                loading:false,
                error:action.payload.message
            }
    }
}
