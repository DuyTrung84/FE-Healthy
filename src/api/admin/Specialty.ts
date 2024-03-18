import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ISpecialty } from "../../interface/Specialty";

const specialtyApi = createApi({
    reducerPath: "specialty",
    tagTypes: ["SPECIALTY"],
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
        getAllSpecialty: builder.query<ISpecialty, void>({
            query: () => "public/specialities/all",
            providesTags: ['SPECIALTY']
        }),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        getByIdSpecialty: builder.query<ISpecialty, number | string>({
            query: (id) => "/public/specialities/get/" + id,
            providesTags: ['SPECIALTY']
        }),

        addSpecialty: builder.mutation<ISpecialty, ISpecialty>({
            query: (specialty: ISpecialty) => ({
                url: "/admin/specialities/create",
                method: "POST",
                body: specialty
            }),
            invalidatesTags: ['SPECIALTY']
        }),
        updateSpecialty: builder.mutation<ISpecialty, ISpecialty>({
            query: (specialty: ISpecialty) => ({
                url: `admin/specialities/update/${specialty.id}`,
                method: "PUT",
                body: specialty
            }),
            invalidatesTags: ['SPECIALTY']
        }),
        deleteSpecialty: builder.mutation<void, number | string>({
            query: (id) => ({
                url: `/admin/specialities/delete/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ['SPECIALTY']
        }),
    }),
});


export const {
    useGetAllSpecialtyQuery,
    useGetByIdSpecialtyQuery,
    useAddSpecialtyMutation,
    useUpdateSpecialtyMutation,
    useDeleteSpecialtyMutation,

} = specialtyApi;

export const specialtyApiReducer = specialtyApi.reducer;

export default specialtyApi;