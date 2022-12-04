import { configureStore } from "@reduxjs/toolkit";
import userSlice from './user/user.reducer'
import categorySlice from './category/category.reducer'
export const store = configureStore({
    reducer:{
        user:userSlice,
        category: categorySlice
    }
})