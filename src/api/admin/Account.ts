import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IAccount } from "../../interface/Account";


const accountApi = createApi({
    reducerPath: "account",
    tagTypes: ["ACCOUNT"],
    baseQuery: fetchBaseQuery({
        baseUrl: "http://103.148.57.141:8888/api/v1/admin/user",
        prepareHeaders: (headers) => {
            const token = localStorage.getItem("token");
            if (token) {
                console.log(token);
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers
        }
    }),
    endpoints: (builder) => ({
        getAllAccount: builder.mutation<IAccount, { keyword: string | null; role: string | null; page: number; resultLimit: number }>({
            query: ({ keyword, role, page, resultLimit }) => ({
                url: "/getAll",
                method: "POST",
                body: { keyword, role, page, resultLimit }
            }),
            invalidatesTags: ['ACCOUNT']
        }),
        addAccount: builder.mutation<IAccount, IAccount>({
            query: (account: IAccount) => ({
                url: "/create",
                method: "POST",
                body: account
            }),
            invalidatesTags: ['ACCOUNT']
        }),
        deleteAccount: builder.mutation<void, { id: string; status: string }>({
            query: ({ id, status }) => ({
                url: `${id}`,
                method: "DELETE",
                params: { status }
            }),
            invalidatesTags: ['ACCOUNT']
        }),
        getRole: builder.query<void, void>({
            query: () => "/role",
            providesTags: ['ACCOUNT']
        }),

    }),
});


export const {
    useAddAccountMutation,
    useDeleteAccountMutation,
    useGetRoleQuery,
    useGetAllAccountMutation

} = accountApi;

export const accountApiReducer = accountApi.reducer;

export default accountApi;