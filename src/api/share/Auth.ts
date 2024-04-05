import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface AuthSignup {
    email?: string;
    password?: string;
    name?: string;
    passwordConfirm?: string;
    lastName?: string;
    phone?: string;
    agreement?: string;

}
export interface AuthSignin {
    email?: string;
    password?: string;
    rememberMe?: boolean;
    token?: string;
    refreshToken?: string;
    role?: string
}

const authApi = createApi({
    reducerPath: "auth",
    tagTypes: ["AUTH"],
    baseQuery: fetchBaseQuery({
        baseUrl: "http://103.148.57.141:8888/api/v1/auth",
        prepareHeaders: (headers) => {
            const token = localStorage.getItem("token");
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        signup: builder.mutation<{ message: string; status: string; errors: any }, AuthSignup>({
            query: (account) => ({
                url: "register",
                method: "POST",
                body: account,
            }),
        }),
        signin: builder.mutation<{ errorMessage: string; token: string, errorCode: string, refreshToken: string, role: string, data: AuthSignin }, AuthSignin>({
            query: (account) => ({
                url: "login",
                method: "POST",
                body: account,
            }),
        }),
        logOut: builder.mutation<void, void>({
            query: (account) => ({
                url: "/company/logout",
                method: "DELETE",
                body: account,
            }),
        }),
        emailVerificaiton: builder.query<string, string>({
            query: (token) => "/email-verification/" + token,
            providesTags: ["AUTH"],
        }),
    }),
});

export const {
    useSignupMutation,
    useSigninMutation,
    useEmailVerificaitonQuery,
    useLogOutMutation,

} = authApi;

export const authApiReducer = authApi.reducer;

export default authApi;