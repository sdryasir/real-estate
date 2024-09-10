import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { clearUserInfo, setIsAuthenticated, setUserInfo } from '../features/authSlice';



export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8000/',
        credentials: 'include'
    }),
    endpoints: (builder) => ({
        loginUser: builder.mutation({
            query: (data) => ({
                url: `auth/login`,
                method: 'POST',
                body: data,
            }),
            async onQueryStarted(arg, {dispatch,queryFulfilled}) {
                
                try {
                    await queryFulfilled;
                    dispatch(authApi.endpoints.getMe.initiate(null));
                } catch (err) {
                    console.log('11111111111');
                    
                }
            }
        }),
        registerUser: builder.mutation({
            query: (data) => ({
                url: `auth/register`,
                method: 'POST',
                body: data,
            })
        }),
        getMe: builder.query({
            query: () => '/me',
            async onQueryStarted(arg, {dispatch,queryFulfilled}) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setUserInfo(data));
                    dispatch(setIsAuthenticated(true));
                } catch (err) {
                    console.log(err);
                }
            }
        }),
        logout: builder.query({
            query: () => `auth/logout`,
            async onQueryStarted(arg, {dispatch,queryFulfilled}) {
                try {
                    // dispatch(clearUserInfo());
                } catch (err) {
                    // dispatch(clearUserInfo())
                }
            }
        }),
    })
})

export const { useLoginUserMutation, useRegisterUserMutation, useGetMeQuery, useLazyLogoutQuery } = authApi