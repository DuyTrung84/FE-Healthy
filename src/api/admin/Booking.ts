import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const bookingApi = createApi({
    reducerPath: "booking",
    tagTypes: ["BOOKING"],
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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        getBooking: builder.query<any, string>({
            query: (id: string) => ({
                url: `public/schedules/get`,
                method: 'GET',
                params: { id },
            }),
            providesTags: ['BOOKING']
        }),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        searchBooking: builder.mutation<any, { fromDate: string, toDate: string, page: number, resultLimit: number }>({
            query: ({ fromDate, toDate, page, resultLimit }) => ({
                url: `admin/doctors/getSchedules`,
                method: 'GET',
                params: { fromDate, toDate, page, resultLimit },
            }),
            invalidatesTags: ['BOOKING']
        }),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        addBooking: builder.mutation<any, any>({
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            query: (booking: any) => ({
                url: `admin/doctors/createSchedules`,
                method: "POST",
                body: booking
            }),
            invalidatesTags: ['BOOKING']
        }),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        updateBooking: builder.mutation<any, any>({
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            query: (booking: any) => ({
                url: `admin/doctors/updateSchedules`,
                method: "PUT",
                body: booking
            }),
            invalidatesTags: ['BOOKING']
        }),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        deleteBooking: builder.mutation<void, any>({
            query: ({ idsToDelete }) => ({
                url: `admin/doctors/deleteSchedules`,
                method: "POST",
                body: { idsToDelete }
            }),
            invalidatesTags: ['BOOKING']
        }),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        getStatusBooking: builder.query<any, string>({
            query: () => ({
                url: `public/scheduleStatus`,
                method: 'GET',
            }),
            providesTags: ['BOOKING']
        }),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        getWhoPay: builder.query<any, void>({
            query: () => "public/whoPay",
            providesTags: ["BOOKING"],
        })
    }),
});


export const {
    useGetBookingQuery,
    useSearchBookingMutation,
    useAddBookingMutation,
    useUpdateBookingMutation,
    useDeleteBookingMutation,
    useGetStatusBookingQuery,
    useGetWhoPayQuery
} = bookingApi;

export const bookingApiReducer = bookingApi.reducer;

export default bookingApi;