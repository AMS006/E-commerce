import {createSlice, current} from '@reduxjs/toolkit'

const initialState = {
    products:undefined,
    loading:false,
    error:""
}
const productSlice = createSlice({
    name:'products',
    initialState,
    reducers:{
        productRequest:(state)=>{
            state.loading = true
        },
        productFail:(state)=>{
            state.loading = false
            state.products = undefined
        },
        getProductSuccess:(state,action)=>{
            state.loading = false
            state.products  =  action.payload
        },
        addProductSuccess:(state,action)=>{
            state.loading = false
            state.products.push(action.payload)
        },
    }

})

export const {productRequest,getProductSuccess,productFail,addProductSuccess} = productSlice.actions
export default productSlice.reducer
