import { createSlice } from "@reduxjs/toolkit";


const UserSlicer=createSlice({
    name:'User',
    initialState:{
        user:{}
    },
    reducers:{
        settingUser:(state,action)=>{
            state.user=action.payload
        },
        logout:(state,action)=>{
            state.user={};
        }
    }
})

export const {settingUser,logout}=UserSlicer.actions;

export default UserSlicer.reducer