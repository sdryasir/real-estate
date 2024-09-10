import { createSlice } from '@reduxjs/toolkit'


const {actions, reducer} = createSlice({
    name:'products',
    initialState:{
        products:[]
    },
    reducers:{
        allProducts:(state,action)=>{
            state.products = action.payload.products
        }
    }
})


export const  {allProducts} = actions
export default reducer