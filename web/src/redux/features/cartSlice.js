import { createSlice } from '@reduxjs/toolkit'
import { current } from '@reduxjs/toolkit';


const {reducer,actions} = createSlice({
    name:'cart',
    initialState:{
        cart:[]
    },
    reducers:{
        addToCart:(state, action)=>{
            const itemExist = state.cart.find(i=>i._id === action.payload._id);
            if(itemExist){
                itemExist.qty++
            }else{
                state.cart.push(action.payload);
            }  
        },
        incrementItem:(state, action)=>{
            const itemExist = state.cart.find(i=>i._id === action.payload._id);
            itemExist.qty++;
        },
        decrementItem:(state, action)=>{
            const itemExist = state.cart.find(i=>i._id === action.payload._id);
            itemExist.qty--;
        },
        removeItem:(state, action)=>{
            const remainingItems = state.cart.filter(i=>i._id !== action.payload._id);
            state.cart = remainingItems
        }
    }
})


export const  {addToCart, incrementItem, decrementItem, removeItem} = actions
export default reducer


