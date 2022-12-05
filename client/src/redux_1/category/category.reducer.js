import {createSlice, current} from '@reduxjs/toolkit'
// import { useSelector } from 'react-redux';

const initialState = {
    category:undefined,
    loading:false,
    error:""
}
const generateCategory = (parentId, categories, category) => {
    let myCategories = [];

    if(parentId == undefined){
        return [
            ...categories,
            {
                _id: category._id,
                name: category.name,
                type: category?.type,
                childrens: []
            }
        ];
    }
    for(let cat of categories){
        if(cat._id == parentId){
            const newCategory = {
                _id: category._id,
                name: category.name,
                parentId: category.parentId,
                type: category?.type,
                childrens: []
            };
            myCategories.push({
                ...cat,
                childrens: cat.childrens.length > 0 ? [...cat.childrens, newCategory] : [newCategory]
            })
        }else{
            myCategories.push({
                ...cat,
                childrens: cat.childrens ? generateCategory(parentId, cat.childrens, category) : []
            });
        }

        
    }
    return myCategories;
}

const categorySlice = createSlice({
    name:"category",
    initialState,
    reducers:{
        categoryRequest:(state) =>{
            state.loading = false
        },
        categoryDeleteRequest:(state) =>{
            state.loading = false
        },
        categorySuccess:(state,action)=>{
            state.category = action.payload
            state.loading = false
        },
        categoryDeleteSuccess:(state) =>{
            state.loading = false
        },
        categoryFail:(state,action)=>{
            state.category = {}
            state.loading = false
            state.error = action.payload
        },
        categoryAddSuccess:(state,action) =>{
            const updatedCategory = generateCategory(action.payload.data.category.parentId,current(state.category),action.payload.data.category)
            state.category = updatedCategory;
            state.loading = false
        }
    }
})

export const {categoryRequest,categorySuccess,categoryFail,categoryLogout,categoryAddSuccess,categoryDeleteRequest,categoryDeleteSuccess} = categorySlice.actions

export default categorySlice.reducer