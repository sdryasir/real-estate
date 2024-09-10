import { createSlice, current } from '@reduxjs/toolkit'


const {actions, reducer} = createSlice({
    name:'auth',
    initialState:{
        user:null,
        isAuthenticated:false
    },
    reducers:{
        setUserInfo:(state, action)=>{
            state.user = action.payload
        },
        setIsAuthenticated:(state, action)=>{
            state.isAuthenticated = action.payload
        },
        clearUserInfo:(state, action)=>{
        }
    }
})


export const  {setUserInfo, clearUserInfo, setIsAuthenticated} = actions
export default reducer