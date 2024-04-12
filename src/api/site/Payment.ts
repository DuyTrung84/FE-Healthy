import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const paymentApi = createApi({
    reducerPath: "payment",
    tagTypes: ["PAYMENT"],
    baseQuery: fetchBaseQuery({
        baseUrl: "http://103.148.57.141:8888/api/v1/payment/",
        prepareHeaders: (headers) => {
            const token = localStorage.getItem("token");
            if (token) {

                headers.set('authorization', `Bearer ${token}`);
            }
            return headers
        }
    }),
    endpoints: (builder) => ({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        createFreeOrder: builder.mutation<any, any>({
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            query: (payment: any) => ({
                url: "createFreeOrder",
                method: "POST",
                body: payment
            }),
            invalidatesTags: ['PAYMENT']
        }),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        createPayment: builder.mutation<any, any>({
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            query: (payment: any) => ({
                url: "createPayment",
                method: "POST",
                body: payment
            }),
            invalidatesTags: ['PAYMENT']
        }),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        resultPayment: builder.mutation<any, any>({
            query: (result) => ({
                url: 'checkPaymentResult',
                method: 'GET',
                params: result,
            }),
            invalidatesTags: ['PAYMENT']
        }),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        cancelAppointment: builder.mutation<any, any>({
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            query: (payment: any) => ({
                url: "cancelAppointment",
                method: "POST",
                body: payment
            }),
            invalidatesTags: ['PAYMENT']
        }),
    }),
});


export const {
    useCreateFreeOrderMutation,
    useCreatePaymentMutation,
    useResultPaymentMutation,
    useCancelAppointmentMutation
} = paymentApi;

export const paymentApiReducer = paymentApi.reducer;

export default paymentApi;