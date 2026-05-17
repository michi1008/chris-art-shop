import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../constants';
import { logout } from './authSlice';

const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL, credentials: 'include' });

const baseQueryWithAuth = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);
  if (result?.error?.status === 401) {
    const url = typeof args === 'string' ? args : args.url;
    // Don't auto-logout on the login endpoint — wrong password also returns 401
    const isLoginEndpoint = url?.includes('/auth');
    const { userInfo } = api.getState().auth;
    if (!isLoginEndpoint && userInfo) {
      api.dispatch(logout());
    }
  }
  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithAuth,
  tagTypes: ['Product', 'Order', 'User'],
  endpoints: (builder) => ({
    forgetPassword: builder.mutation({
      query: ({email}) => ({
        url: '/api/users/forget-password',
        method: 'POST',
        body: {email},
      }),
    }),
    resetPassword: builder.mutation({
      query: ({ token, newPassword }) => ({
        url: `/api/users/reset-password/${token}`,
        method: 'POST',
        body: { newPassword },
      }),
    }),
  }),
});

export const { useForgetPasswordMutation, useResetPasswordMutation } = apiSlice;