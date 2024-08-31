import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'



export const categoryApi = createApi({
    reducerPath: 'categoryApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8000',
        credentials: 'include'
    }),
    endpoints: (builder) => ({
        createCategory: builder.mutation({
            query: (data) => ({
                url: `/category/new`,
                method: 'POST',
                body: data,
            }),
        }),
    })
})

export const { useCreateCategoryMutation } = categoryApi