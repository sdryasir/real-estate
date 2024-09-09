import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { allProducts } from '../features/productSlice';

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
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    dispatch(productApi.endpoints.getAllProducts.initiate(null));
                    console.log('from on query after adding products calling getAllProducts');
                } catch (error) {
                    console.log('Error from adding products', error);

                }
            }
        }),
        getAllProducts: builder.query({
            query: () => '/products/all',
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(allProducts(data));
                } catch (error) {
                    console.log('Error from get all product api', error);
                }
            }
        }),
        deleteProduct: builder.mutation({
            query: (id) => ({
                url: `products/delete/${id}`,
                method: 'DELETE',

            }),
        }),
        updateProduct: builder.mutation({
            query: (data) => ({
                url: '/products/update',
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
    }),
})

export const { useAddProductMutation, useGetAllProductsQuery, useDeleteProductMutation, useUpdateProductMutation } = productApi