import axios from 'axios'
import { GET_USER_DETAILS_SUCCESS } from '../user/user.type'
import {
    GET_CATEGORY_REQUEST,
    GET_CATEGORY_SUCCESS,
    GET_CATEGORY_FAIL,
    // ADD_CATEGORY_REQUEST,
    // ADD_CATEGORY_SUCCESS,
    // ADD_CATEGORY_FAIL,
    // DELETE_CATEGORY_REQUEST,
    // DELETE_CATEGORY_SUCCESS,
    // DELETE_CATEGORY_FAIL,
    // UPDATE_CATEGORY_REQUEST,
    // UPDATE_CATEGORY_SUCCESS,
    // UPDATE_CATEGORY_FAIL
} from './category.type'

export const getCategory = ()=> async(dispatch)=>{
    try {
        dispatch({type:GET_CATEGORY_REQUEST})
        const categoryList = await axios({
            method:"GET",
            url:"http://localhost:4000/api/v1/category"
        })
        return dispatch({type:GET_CATEGORY_SUCCESS,payload:categoryList.data.categoryList})
    } catch (error) {
        return dispatch({type:GET_CATEGORY_FAIL, payload: error.response.data.message})
    }
}
// export const addCategory = ({name,parentId})=> async(dispatch)=>{
//     try {
//         dispatch({type:GET_CATEGORY_REQUEST})
//         const categoryList = await axios({
//             method:"GET",
//             url:"http://localhost:4000/api/v1/category",
//             data:{name,parentId}
//         })
//         return dispatch({type:GET_CATEGORY_SUCCESS,payload:categoryList.data.categoryList})
//     } catch (error) {
//         return dispatch({type:GET_CATEGORY_FAIL, payload: error.response.data.message})
//     }
// }
