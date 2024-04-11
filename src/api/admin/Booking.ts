import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface IManage {
    fromDate?: string;
    toDate?: string;
    fromTime?: string;
    toTime?: string;
    doctorId?: string;
    type?: string;
    status?: string;
    clinicId?: string;
    specialityId?: string;
    page?: number;
    resultLimit?: number;
}

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
        searchBooking: builder.mutation<any, { idDoctor: string, fromDate: string, toDate: string }>({
            query: ({ idDoctor, fromDate, toDate }) => ({
                url: `admin/doctors/getSchedules`,
                method: 'GET',
                params: { idDoctor, fromDate, toDate },
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
            query: ({ idDoctor, idsToDelete }) => ({
                url: `admin/doctors/deleteSchedules`,
                method: "POST",
                body: { idDoctor, idsToDelete }
            }),
            invalidatesTags: ['BOOKING']
        }),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        getStatusBooking: builder.query<any, void>({
            query: () => ({
                url: `public/bookingStatus`,
                method: 'GET',
            }),
            providesTags: ['BOOKING']
        }),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        getWhoPay: builder.query<any, void>({
            query: () => "public/whoPay",
            providesTags: ["BOOKING"],
        }),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        getBookingById: builder.query<any, number | string>({
            query: (id) => "/public/schedules/detail/" + id,
            providesTags: ['BOOKING']
        }),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        searchManage: builder.mutation<any, IManage>({
            query: (IManage) => ({
                url: `/admin/booking/search`,
                method: 'GET',
                params: IManage,
            }),
            invalidatesTags: ['BOOKING']
        }),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        exportManage: builder.mutation<any, IManage>({
            query: (IManage) => ({
                url: `/admin/booking/export`,
                method: 'GET',
                params: IManage,
            }),
            invalidatesTags: ['BOOKING']
        }),
    }),
});


export const {
    useGetBookingQuery,
    useSearchBookingMutation,
    useAddBookingMutation,
    useUpdateBookingMutation,
    useDeleteBookingMutation,
    useGetStatusBookingQuery,
    useGetWhoPayQuery,
    useGetBookingByIdQuery,
    useSearchManageMutation,
    useExportManageMutation,
} = bookingApi;

export const bookingApiReducer = bookingApi.reducer;

export default bookingApi;