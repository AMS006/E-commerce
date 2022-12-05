import axios from 'axios'
import { categoryRequest,categorySuccess } from '../category/category.reducer'
import { productRequest,getProductSuccess } from '../product/product.reducer'
export const initialData = () => async(dispatch) =>{
    try {
        dispatch(categoryRequest());
        dispatch(productRequest());
        const initialData = await axios({
            method:"GET",
            url:"http://localhost:4000/api/v1/initialData"
        })
        const {categoryList,products} = initialData.data
        console.log(categoryList);
        dispatch(categorySuccess(categoryList));
        dispatch(getProductSuccess(products));
    } catch (error) {
        // return dispatch(categoryFail(error.response.data.message))
    }
}