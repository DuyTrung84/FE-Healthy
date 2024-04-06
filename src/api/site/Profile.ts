import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const profileApi = createApi({
    reducerPath: "profiles",
    tagTypes: ["PROFILES"],
    baseQuery: fetchBaseQuery({
        baseUrl: "http://103.148.57.141:8888/api/v1/user/profiles/",
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
        getAllProfile: builder.query<any, void>({
            query: () => "getAll",
            providesTags: ['PROFILES']
        }),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        getProfileById: builder.query<any, number | string>({
            query: (id) => `getById/${id}`,
            providesTags: ['PROFILES']
        }),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        getProfileById2: builder.mutation<any, number | string>({
            query: (id) => `getById/${id}`,
            invalidatesTags: ['PROFILES']
        }),
        addProfile: builder.mutation({
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            query: (profile: any) => ({
                url: "create",
                method: "POST",
                body: profile
            }),
            invalidatesTags: ['PROFILES']
        }),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        updateProfile: builder.mutation<any, any>({
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            query: (packages: any) => ({
                url: `update`,
                method: "PUT",
                body: packages
            }),
            invalidatesTags: ['PROFILES']
        }),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        deleteProfile: builder.mutation<void, any>({
            query: ({ idsToDelete }) => ({
                url: `delete`,
                method: "DELETE",
                body: { idsToDelete }
            }),
            invalidatesTags: ['PROFILES']
        }),
    }),
});


export const {
    useGetAllProfileQuery,
    useGetProfileByIdQuery,
    useAddProfileMutation,
    useUpdateProfileMutation,
    useDeleteProfileMutation,
    useGetProfileById2Mutation

} = profileApi;

export const profileApiReducer = profileApi.reducer;

export default profileApi;