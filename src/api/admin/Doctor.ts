import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ISpecialty } from "../../interface/Specialty";

const doctorApi = createApi({
    reducerPath: "doctor",
    tagTypes: ["DOCTOR"],
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
        searchDoctors: builder.mutation<any, { name: string | null; clinic: string | null; speciality: string | null; page: number; resultLimit: number }>({
            query: ({ name, clinic, speciality, page, resultLimit }) => ({
                url: 'public/doctors/all',
                method: 'GET',
                params: { name, clinic, speciality, page, resultLimit },
            }),
            invalidatesTags: ['DOCTOR']
        }),
        getByIdDoctor: builder.query<ISpecialty, number | string>({
            query: (id) => "/public/doctors/get/" + id,
            providesTags: ['DOCTOR']
        }),
        updateDoctor: builder.mutation<ISpecialty, ISpecialty>({
            query: (doctor: ISpecialty) => ({
                url: `admin/doctors/update`,
                method: "PUT",
                body: doctor
            }),
            invalidatesTags: ['DOCTOR']
        }),
    }),
});


export const {
    useGetByIdDoctorQuery,
    useSearchDoctorsMutation,
    useUpdateDoctorMutation

} = doctorApi;

export const doctorApiReducer = doctorApi.reducer;

export default doctorApi;