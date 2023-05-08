import axios from 'axios';
import { SERVICE_URL } from './constants';

export const getHomeSliders = async lang => {
    const data = await axios.get(`${SERVICE_URL}/${lang}/sliders`);

    return data.data;
};

export const getHomeBLogsByType = async ({ lang, type }) => {
    const data = await axios.get(`${SERVICE_URL}/${lang}/blogs/${type}/main-page`);

    return data.data;
};

export const getSections = async lang => {
    const data = await axios.get(`${SERVICE_URL}/${lang}/sections`);

    return data.data;
};

export const getBlogsDataByType = async ({ lang, type, ...queryParams }) => {
    const data = await axios.get(`${SERVICE_URL}/${lang}/blogs/${type}`, { params: queryParams });

    return data.data;
};
