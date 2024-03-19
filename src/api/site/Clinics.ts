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
        getAllClinics: builder.query<IClinics, void>({
            query: () => "public/clinics/all",
            providesTags: ['CLINICS']
        }),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        getByIdClinics: builder.query<IClinics, number | string>({
            query: (id) => "/public/clinics/get/" + id,
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
            query: (packages: any) => ({
                url: `admin/clinics/update/${packages.id}`,
                method: "PUT",
                body: packages
            }),
            invalidatesTags: ['CLINICS']
        }),
        deleteClinics: builder.mutation<void, number | string>({
            query: (id) => ({
                url: `/admin/clinics/delete/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ['CLINICS']
        }),
    }),
});


export const {
    useGetAllClinicsQuery,
    useGetByIdClinicsQuery,
    useAddClinicsMutation,
    useUpdateClinicsMutation,
    useDeleteClinicsMutation

} = clinicsApi;

export const clinicsApiReducer = clinicsApi.reducer;

export default clinicsApi;