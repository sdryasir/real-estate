import { createSlice } from '@reduxjs/toolkit'


const {reducer,actions} = createSlice({
    name:'category',
    initialState:{
        category:[]
    },
    reducers:{
        getAllCategory:(state, action)=>{
            state.category = action.payload.category
        }
    }
})


export const  {getAllCategory} = actions
export default reducer


