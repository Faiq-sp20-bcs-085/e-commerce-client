import { createSlice } from "@reduxjs/toolkit";


const CategorySlicer=createSlice({
    name:'Category',
    initialState:{
     products:[]
    },
    reducers:{
     setCategory:(state,action)=>{
        state.products=action.payload;
     }
    }
})
export const {setCategory}=CategorySlicer.actions;

export default CategorySlicer.reducer;