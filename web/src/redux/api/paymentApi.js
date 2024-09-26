import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const paymentApi = createApi({
    reducerPath: 'paymentApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8000/',
    }),
    endpoints: (builder) => ({
        makePayment: builder.mutation({
            query: (data) => ({
                url: `/create-checkout-session`,
                method: 'POST',
                body: data,
            })
        }),
    }),
})

export const { useMakePaymentMutation} = paymentApi