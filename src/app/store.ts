import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
    FLUSH,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
    REHYDRATE,
    persistReducer,
    persistStore,
} from 'redux-persist';

import storage from 'redux-persist/lib/storage';
import authApi, { authApiReducer } from '../api/share/Auth';
import areaApi, { areaApiReducer } from '../api/share/area';
import specialtyApi, { specialtyApiReducer } from '../api/admin/Specialty';
import clinicsApi, { clinicsApiReducer } from '../api/site/Clinics';
import uploadApi, { uploadApiReducer } from '../api/share/upload';
import accountApi, { accountApiReducer } from '../api/admin/Account';

// Định nghĩa kiểu cho RootState
interface RootState {
    [authApi.reducerPath]: ReturnType<typeof authApiReducer>;
    [areaApi.reducerPath]: ReturnType<typeof areaApiReducer>;
    [specialtyApi.reducerPath]: ReturnType<typeof specialtyApiReducer>;
    [clinicsApi.reducerPath]: ReturnType<typeof clinicsApiReducer>;
    [uploadApi.reducerPath]: ReturnType<typeof uploadApiReducer>;
    [accountApi.reducerPath]: ReturnType<typeof accountApiReducer>;
}

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart', "auth"]
}

const rootReducer = combineReducers<RootState>({
    [authApi.reducerPath]: authApiReducer,
    [areaApi.reducerPath]: areaApiReducer,
    [specialtyApi.reducerPath]: specialtyApiReducer,
    [clinicsApi.reducerPath]: clinicsApiReducer,
    [uploadApi.reducerPath]: uploadApiReducer,
    [accountApi.reducerPath]: accountApiReducer,
})

const middleware = [
    authApi.middleware,
    areaApi.middleware,
    specialtyApi.middleware,
    clinicsApi.middleware,
    uploadApi.middleware,
    accountApi.middleware,
]

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat(...middleware),
})

export type AppDispatch = typeof store.dispatch

export default persistStore(store);
