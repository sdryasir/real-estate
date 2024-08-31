import { createSlice } from '@reduxjs/toolkit'


const categorySlice = createSlice({
    name:'category',
    initialState:{
        title:null,
        avatar:null
    },
    reducers:{
        setCategory:(state, action)=>{
            state.title = action.payload
            state.avatar = action.payload
        },
       
    }
})


export const  {setCategory} = categorySlice.actions
export default categorySlice.reducer


