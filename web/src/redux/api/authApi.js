import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setUserInfo, setIsAuthenticated, clearUserInfo } from '../features/authSlice';



export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8000/',
        credentials: 'include'
    }),
    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query: (data) => ({
                url: `auth/register`,
                method: 'POST',
                body: data,
            })
        }), 
        login: builder.mutation({
            query: (data) => ({
                url: `auth/login`,
                method: 'POST',
                body: data,
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    dispatch(authApi.endpoints.getUserProfile.initiate(null));
                } catch (error) {
                    
                }
            }
        }), 
        getUserProfile: builder.query({
            query: () => `me`,
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const {data} = await queryFulfilled;
                    if(!data.success){
                        dispatch(setIsAuthenticated(false));
                        return;
                    }
                    dispatch(setUserInfo(data.user));
                    dispatch(setIsAuthenticated(true));
                } catch (error) {
                    dispatch(clearUserInfo());
                    dispatch(setIsAuthenticated(false));
                }
            }

        }),
        logout: builder.query({
            query: () => `auth/logout`,
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    dispatch(clearUserInfo());
                    dispatch(setIsAuthenticated(false));
                } catch (error) {
                    dispatch(clearUserInfo());
                    dispatch(setIsAuthenticated(false));
                }
            }
        }),
    })
})

export const { useRegisterUserMutation, useLoginMutation, useGetUserProfileQuery, useLazyLogoutQuery} = authApi