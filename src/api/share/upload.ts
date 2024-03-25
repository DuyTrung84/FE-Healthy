import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IAccount } from "../../interface/Account";

const uploadApi = createApi({
    reducerPath: "upload",
    tagTypes: ["UPLOAD"],
    baseQuery: fetchBaseQuery({
        baseUrl: "http://103.148.57.141:8888/api/v1",
        prepareHeaders: (headers) => {
            const token = localStorage.getItem("token");
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers
        }
    }),
    endpoints: (builder) => ({
        upload: builder.mutation({
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            query: (image: any) => ({
                url: "/upload",
                method: "POST",
                body: image
            }),
            invalidatesTags: ['UPLOAD']
        }),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        getAccount: builder.query<IAccount, void>({
            query: () => "/account/me",
            providesTags: ["UPLOAD"],
        }),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        getStatus: builder.query<any, void>({
            query: () => "/public/objectStatus",
            providesTags: ["UPLOAD"],
        }),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        getPayment: builder.query<any, void>({
            query: () => "/public/payment",
            providesTags: ["UPLOAD"],
        })

    }),
});


export const {
    useUploadMutation,
    useGetAccountQuery,
    useGetStatusQuery,
    useGetPaymentQuery

} = uploadApi;

export const uploadApiReducer = uploadApi.reducer;

export default uploadApi;