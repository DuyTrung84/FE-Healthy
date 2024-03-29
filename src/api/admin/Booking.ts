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
        searchBooking: builder.mutation<any, string>({
            query: (id: string) => ({
                url: `public/schedules/get`,
                method: 'GET',
                params: { id },
            }),
            invalidatesTags: ['BOOKING']
        }),

    }),
});


export const {
    useGetBookingQuery,
    useSearchBookingMutation
} = bookingApi;

export const bookingApiReducer = bookingApi.reducer;

export default bookingApi;