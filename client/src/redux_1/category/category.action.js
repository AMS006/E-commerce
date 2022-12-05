import { categoryRequest,categorySuccess,categoryFail,categoryAddSuccess,categoryDeleteRequest,categoryDeleteSuccess } from "./category.reducer"
import axios from 'axios'
export const getCategory = ()=> async(dispatch)=>{
    try {
        dispatch(categoryRequest())
        const categoryList = await axios({
            method:"GET",
            url:"http://localhost:4000/api/v1/category"
        })
        return dispatch(categorySuccess(categoryList.data.categoryList))
    } catch (error) {
        return dispatch(categoryFail(error.response.data.message))
    }
}
export const addCategory = (item) =>async(dispatch) =>{
    try {
        dispatch(categoryRequest());
        const category = await axios({
            method:"POST",
            url:"http://localhost:4000/api/v1/category",
            data:{name:item.categoryName, parentId:item.categoryParentId,type:item?.categoryType}
        })
        return dispatch(categoryAddSuccess(category));
    } catch (error) {
        return dispatch(categoryFail(error.response))
    }
}
export const deleteCategory = (list) =>async(dispatch) =>{
    try {
        dispatch(categoryDeleteRequest());
        await axios({
            method:"DELETE",
            url:"http://localhost:4000/api/v1/category",
            data:{list}
        })
        return dispatch(categoryDeleteSuccess())
    } catch (error) {
        return dispatch(categoryFail(error.response))
    }
}
export const updateCategory = (data) => async(dispatch) =>{
    try {
        dispatch(categoryRequest());
        const updatedCategory = await axios({
            method:"PUT",
            url:"http://localhost:4000/api/v1/category",
            data,
        })
        // return dispatch(categoryDeleteRequest());
    } catch (error) {
        return dispatch(categoryFail(error.response))
    }
}