import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IProvinces } from "../../interface/Area";


export interface RefreshTokenResponse {
    data?: {
        token: string;
        refreshToken: string;
    };
    message?: string;
}

const areaApi = createApi({
    reducerPath: "area",
    tagTypes: ["AREA"],
    baseQuery: fetchBaseQuery({
        baseUrl: "http://103.148.57.141:8888/api/v1",
        prepareHeaders: (headers) => {
            const rfToken = localStorage.getItem("rfToken");
            if (rfToken) {
                headers.set("Authorization", `Bearer ${rfToken}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getProvinces: builder.query<IProvinces, void>({
            query: () => "/area/provinces",
            providesTags: ["AREA"],
        }),
        getDistricts: builder.query({
            query: (provinceCode: string) => `/area/districts?provinceCode=${provinceCode}`,
            providesTags: ["AREA"],
        }),
        getWards: builder.query({
            query: (districtCode: string) => `/area/wards?districtCode=${districtCode}`,
            providesTags: ["AREA"],
        }),
        refreshToken: builder.mutation<RefreshTokenResponse, void>({
            query: () => "/auth/refresh",
            invalidatesTags: ['AREA'],
        }),
    }),
});


export const {
    useGetProvincesQuery,
    useGetDistrictsQuery,
    useGetWardsQuery,
    useRefreshTokenMutation

} = areaApi;

export const areaApiReducer = areaApi.reducer;

export default areaApi;