import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { serviceUrl } from './constants';

const api = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: serviceUrl,
    }),
    endpoints: build => ({
        getSliderData: build.query({
            query: params => ({
                params,
                url: `${params.lang}/sliders`,
            }),
            transformResponse: response => response,
        }),
    }),
    reducerPath: 'api',
});

export default api;
