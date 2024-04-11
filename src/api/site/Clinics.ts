import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IClinics } from "../../interface/Clinics";

const clinicsApi = createApi({
    reducerPath: "clinics",
    tagTypes: ["CLINICS"],
    baseQuery: fetchBaseQuery({
        baseUrl: "http://103.148.57.141:8888/api/v1",
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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        getAllClinics: builder.query<IClinics, { search?: string | null; province?: string | null; status?: string | null; page?: number; resultLimit?: number }>({
            query: ({ search, status, page, resultLimit, province }) => ({
                url: 'public/clinics/all',
                method: 'GET',
                params: { search, status, page, resultLimit, province },
            }),
            providesTags: ['CLINICS']
        }),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        searchClinics: builder.mutation<IClinics, { search: string | null; province: string | null; status: string | null; page: number; resultLimit: number }>({
            query: ({ search, status, page, resultLimit, province }) => ({
                url: 'public/clinics/all',
                method: 'GET',
                params: { search, status, page, resultLimit, province },
            }),

            invalidatesTags: ['CLINICS']
        }),
        getByIdClinics: builder.query<IClinics, number | string>({
            query: (id) => "/public/clinics/get/" + id,
            providesTags: ['CLINICS']
        }),
        getChildrenClinics: builder.query<IClinics, number | string>({
            query: (id) => "/public/clinics/children/all/" + id,
            providesTags: ['CLINICS']
        }),
        addClinics: builder.mutation({
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            query: (packages: any) => ({
                url: "/admin/clinics/create",
                method: "POST",
                body: packages
            }),
            invalidatesTags: ['CLINICS']
        }),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        updateClinics: builder.mutation<any, any>({
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            query: ({ id, ...packages }: any) => ({
                url: `admin/clinics/update/${id}`,
                method: "PUT",
                body: packages
            }),
            invalidatesTags: ['CLINICS']
        }),
        deleteClinics: builder.mutation<void, { id: number | string; status: string }>({
            query: ({ id, status }) => ({
                url: `/admin/clinics/delete/${id}`,
                method: "DELETE",
                params: { status }
            }),
            invalidatesTags: ['CLINICS']
        }),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        getHistoryBooking: builder.mutation<any, { fromDate?: string | null; toDate?: string | null; status: string | null; page: number; resultLimit: number }>({
            query: ({ fromDate, toDate, status, page, resultLimit }) => ({
                url: 'user/booking/userGetBookingHistory',
                method: 'POST',
                body: { fromDate, toDate, status, page, resultLimit },
            }),

            invalidatesTags: ['CLINICS']
        }),
    }),
});


export const {
    useGetAllClinicsQuery,
    useGetByIdClinicsQuery,
    useGetChildrenClinicsQuery,
    useAddClinicsMutation,
    useUpdateClinicsMutation,
    useDeleteClinicsMutation,
    useSearchClinicsMutation,
    useGetHistoryBookingMutation,

} = clinicsApi;

export const clinicsApiReducer = clinicsApi.reducer;

export default clinicsApi;