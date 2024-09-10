import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const productApi = createApi({
    reducerPath: 'productApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8000/',
        credentials: 'include'
    }),
    endpoints: (builder) => ({
        addProduct: builder.mutation({
            query: (data) => ({
                url: `/products/new`,
                method: 'POST',
                body: data,
            })
        }),
        getAllProducts: builder.query({
            query: data => '/products/all'
        }),
    })
})

export const {useAddProductMutation, useGetAllProductsQuery } = productApi