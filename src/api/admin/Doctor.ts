import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        getByIdDoctor: builder.query<any, number | string>({
            query: (id) => "/public/doctors/get/" + id,
            providesTags: ['DOCTOR']
        }),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        updateDoctor: builder.mutation<any, any>({
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            query: (doctor: any) => ({
                url: `admin/user/update`,
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
    useUpdateDoctorMutation,

} = doctorApi;

export const doctorApiReducer = doctorApi.reducer;

export default doctorApi;