import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/authSlice'
import { authApi } from './api/authApi'
import { productApi } from './api/productApi'
import { categoryApi } from './api/categoryApi'

const store = configureStore({
  reducer: {
    auth:authReducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [authApi.reducerPath]: authApi.reducer,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([productApi.middleware, categoryApi.middleware, authApi.middleware]),
})

export default store