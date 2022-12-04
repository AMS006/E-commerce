import {
GET_CATEGORY_REQUEST,
GET_CATEGORY_SUCCESS,
GET_CATEGORY_FAIL,
ADD_CATEGORY_REQUEST,
ADD_CATEGORY_SUCCESS,
ADD_CATEGORY_FAIL,
DELETE_CATEGORY_REQUEST,
DELETE_CATEGORY_SUCCESS,
DELETE_CATEGORY_FAIL,
UPDATE_CATEGORY_REQUEST,
UPDATE_CATEGORY_SUCCESS,
UPDATE_CATEGORY_FAIL
} from './category.type'
const initialState = {
    categoryList : [],
    loading:false,
    error:""
}
const categoryReducer = (state = initialState, action)=>{
    switch (action.type) {
        case GET_CATEGORY_REQUEST:
        case ADD_CATEGORY_REQUEST:
        case UPDATE_CATEGORY_REQUEST:
        case DELETE_CATEGORY_REQUEST:
            return{
                ...state,
                loading:true
            }
        case GET_CATEGORY_SUCCESS:
            return{
                ...state,
                categoryList: action.payload,
                loading:false
            }
        case ADD_CATEGORY_SUCCESS:
        const category = action.payload.data
            return{
                ...state,
                loading:false
            }
        case DELETE_CATEGORY_SUCCESS:
            return{
                ...state,
                loading:false
            }
        case GET_CATEGORY_FAIL:
        case ADD_CATEGORY_FAIL:
        case UPDATE_CATEGORY_FAIL:
        case DELETE_CATEGORY_FAIL:
            return{
                ...state,
                loading:false,
                error:action.payload
            }
    
        default:
            return{
                ...state,
                loading:false
            }
    }
}
export default categoryReducer