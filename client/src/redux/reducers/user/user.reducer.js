import {LOGIN_REQUEST,LOGIN_SUCCESS,LOGIN_FAIL,ADMIN_LOGIN_REQUEST,ADMIN_LOGIN_SUCCESS,ADMIN_LOGIN_FAIL,SIGNUP_REQUEST,SIGNUP_SUCCESS,SIGNUP_FAIL,LOGOUT_REQUEST,LOGOUT_SUCCESS,LOGOUT_FAIL,GET_USER_DETAILS_REQUEST,GET_USER_DETAILS_SUCCESS,GET_USER_DETAILS_FAIL} from './user.type'

const initialState = {
    user:{},
    loading:false,
    error:""
}
const userReducer = (state = initialState, action) =>{
    switch(action.type){
        case LOGIN_REQUEST:
        case SIGNUP_REQUEST:
        case LOGOUT_REQUEST:
        case GET_USER_DETAILS_REQUEST:
        case ADMIN_LOGIN_REQUEST:
            return{
                ...state,
                loading:true
            }
        case LOGIN_SUCCESS:
        case SIGNUP_SUCCESS:
        case GET_USER_DETAILS_SUCCESS:
        case ADMIN_LOGIN_SUCCESS:
            return{
                ...state,
                user: {...action.payload},
                loading:false
            }
        case LOGIN_FAIL:
        case SIGNUP_FAIL:
        case LOGOUT_FAIL:
        case GET_USER_DETAILS_FAIL:
        case ADMIN_LOGIN_FAIL:
            return{
                ...state,
                loading:false,
                error:action.payload
            }
        case LOGOUT_SUCCESS:
            return{
                ...state,
                user:{},
                token:"",
                loading:false
                }
        default:
            return{
                ...state
            }
    }
}
export default userReducer;