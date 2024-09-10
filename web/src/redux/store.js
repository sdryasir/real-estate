import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/authSlice'
import { authApi } from './api/authApi'
import { productApi } from './api/productApi'
import { categoryApi } from './api/categoryApi'
import productReducer from './features/productSlice'
import categoryReducer from './features/categorySlice'
const store = configureStore({
  reducer: {
    auth:authReducer,
    products:productReducer,
    category:categoryReducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([productApi.middleware, categoryApi.middleware, authApi.middleware]),
})

export default store