import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getAllCategory } from '../features/categorySlice';

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
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    dispatch(categoryApi.endpoints.getAllCategory.initiate(null))     
                } catch (error) {
                    console.log('Error from adding category', error);

                }
            }
        }),
        getAllCategory: builder.query({
            query: () => `/category/all`,
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const {data} = await queryFulfilled;
                    dispatch(getAllCategory(data))
                } catch (error) {
                   console.log('Error from getAllCategory api', error);                 
                }
            }
        }),
        deleteCategory: builder.mutation({
            query: (id) => ({
                url: `category/delete/${id}`,
                method: 'DELETE',
            }),
        }),
        updateCategory : builder.mutation ({
            query: (data) => ({
                url: `/category/update`,
                method: 'PUT',
                body: data,
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    console.log(data);
                } catch (error) {
                    console.log('Error from update product api', error);
                }
            }
        })
    })
})

export const { useCreateCategoryMutation, useGetAllCategoryQuery, useDeleteCategoryMutation , useUpdateCategoryMutation} = categoryApi