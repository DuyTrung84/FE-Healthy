import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const serviceApi = createApi({
    reducerPath: "service",
    tagTypes: ["SERVICE"],
    baseQuery: fetchBaseQuery({
        baseUrl: "http://103.148.57.141:8888/api/v1/admin/user/",
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
        getAllService: builder.mutation<any, number | string>({
            query: (id) => "getAllService/" + id,
            invalidatesTags: ['SERVICE']
        }),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        getByIdService: builder.query<any, number | string>({
            query: (id) => "getDetailByServiceId/" + id,
            providesTags: ['SERVICE']
        }),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        deleterServiceDoctor: builder.mutation<void, any>({
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            query: (service: any) => ({
                url: `deleteServiceBaseOnDoctor`,
                method: "DELETE",
                body: service
            }),
        }),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        addService: builder.mutation<any, any>({
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            query: (service: any) => ({
                url: `createServiceBaseOnDoctor`,
                method: "POST",
                body: service
            }),
            invalidatesTags: ['SERVICE']
        }),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        updateService: builder.mutation<any, any>({
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            query: (service: any) => ({
                url: `updateServiceBaseOnDoctor`,
                method: "PUT",
                body: service
            }),
            invalidatesTags: ['SERVICE']
        }),
    }),
});


export const {
    useGetAllServiceMutation,
    useGetByIdServiceQuery,
    useAddServiceMutation,
    useUpdateServiceMutation,
    useDeleterServiceDoctorMutation

} = serviceApi;

export const serviceApiReducer = serviceApi.reducer;

export default serviceApi;