import { createSlice } from '@reduxjs/toolkit'


const {reducer,actions} = createSlice({
    name:'cart',
    initialState:{
        cart:[]
    },
    reducers:{
        addToCart:(state, action)=>{
            const item = state.cart.find(i=>i._id === action.payload._id);
            if(item){
                item.qty += action.payload.qty
            }else{
                state.cart.push(action.payload)
            }
        },
        incrementQuantity: (state, action) => {
            const item = state.cart.find(i=> i._id === action.payload._id);
            item.qty++;
        },
        decrementQuantity: (state, action) => {
            const item = state.cart.find(i => i._id === action.payload._id);
            if (item.qty === 1) {
              item.qty = 1
            } else {
              item.qty--;
            }
        },
        removeItem: (state, action) => {
            const removeItem = state.cart.filter((item) => item._id !== action.payload._id);
            state.cart = removeItem;
        }
    }
})


export const  {addToCart, incrementQuantity, decrementQuantity, removeItem} = actions
export default reducer


