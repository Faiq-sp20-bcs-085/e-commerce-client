import { createSlice } from "@reduxjs/toolkit";


const CartSlicer=createSlice({
    name:'Cart',
    initialState:{
        cart:[],
        amount:0,
       
        ShippingAddress:{},
        bill:0,
        charges:20,
        totalbill:0

    },
    reducers:{
        AddToCart:(state,action)=>{

         


            const productIndex=state.cart.findIndex((item)=> item._id === action.payload._id);
            if(productIndex >=0){
                state.cart[productIndex].qty++;
                state.cart[productIndex].subtotal+=state.cart[productIndex].price;
            
            }
            else{

                state.cart.push({...action.payload , qty:1,subtotal:action.payload.price})
                state.amount++;
            }
        },

        IncreaseQuantity:(state,action)=>{

             const cartItem=state.cart.find((item)=> item._id === action.payload._id)
             if(cartItem){
                cartItem.subtotal+=cartItem.price;
                cartItem.qty++;
             }
          

        },

        DecreaseQuantity:(state,action)=>{
            const cartItem=state.cart.find((item)=>item._id === action.payload._id);
            if(cartItem){
                cartItem.subtotal-=cartItem.price
                cartItem.qty--;
            }
        },

        TotalBill:(state,action)=>{
          
          let bill=0;
           state.cart.forEach((item)=>{
            bill=bill + (item.qty  * item.price );
           })
           state.bill=bill;
           state.totalbill=state.bill + state.charges
        },

        DeleteItem:(state,action)=>{
            const FilteredCart=state.cart.filter((item)=>item._id !== action.payload._id);
            if(FilteredCart){
                state.cart=FilteredCart;
                state.amount--;
            }
        },

        ClearCart:(state,action)=>{
            state.cart=[];
            state.amount=0;
            state.totalbill=0;
        },

        ShipAddress:(state,action)=>{
            state.ShippingAddress=action.payload;
            
        }

    }


})

export const {AddToCart,TotalBill,IncreaseQuantity,DecreaseQuantity,DeleteItem,ClearCart,ShipAddress}=CartSlicer.actions;

export default CartSlicer.reducer;