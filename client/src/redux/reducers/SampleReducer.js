import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    value : 0
}
const counter = createSlice({
    name:"Counter",
    initialState,
    reducers:{
        increment:(state) =>{
            state += 1
        },
        incrementByVal:(state,action) =>{
            state += action.payload
        },
        decrement:(state) =>{
            state -= 1
        }
    }
})

export const {increment,decrement,incrementByVal} = counter.actions

export default counter.reducer