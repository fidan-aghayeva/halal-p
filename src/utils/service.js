import axios from 'axios';
import { SERVICE_URL } from './constants';

export const getHomeSliders = async lang => {
    try {
        const data = await axios.get(`${SERVICE_URL}/${lang}/sliders`);

        return data.data;
    } catch (error) {
        console.log(error);
    }
};

export const getHomeBlogsByType = async ({ lang, type }) => {
    try {
        const data = await axios.get(`${SERVICE_URL}/${lang}/blogs/${type}/main-page`);

        return data.data;
    } catch (error) {
        console.log(error);
    }
};

export const getSections = async lang => {
    try {
        const data = await axios.get(`${SERVICE_URL}/${lang}/sections`);

        return data.data;
    } catch (error) {
        console.log(error);
    }
};

export const getBlogsDataByType = async ({ lang, type, ...queryParams }) => {
    try {
        const data = await axios.get(`${SERVICE_URL}/${lang}/blogs/${type}`, { params: queryParams });

        return data.data;
    } catch (error) {
        console.log(error);
    }
};

export const getBlogsDataByTypeAndId = async ({ lang, type, id }) => {
    try {
        const data = await axios.get(`${SERVICE_URL}/${lang}/blogs/${type}/${id}`);

        return data.data;
    } catch (error) {
        console.log(error);
    }
};

export const getEmployees = async lang => {
    try {
        const data = await axios.get(`${SERVICE_URL}/${lang}/employees`);

        return data.data;
    } catch (error) {
        console.log(error);
    }
};

export const getCustomers = async type => {
    try {
        const data = await axios.get(`${SERVICE_URL}/az/customers`, { params: { type } });

        return data.data;
    } catch (error) {
        console.log(error);
    }
};

export const getContacts = async lang => {
    try {
        const data = await axios.get(`${SERVICE_URL}/${lang}/contacts`);

        return data.data;
    } catch (error) {
        console.log(error);
    }
};

export const getPageDescriptionByType = async ({ lang, type }) => {
    try {
        const data = await axios.get(`${SERVICE_URL}/${lang}/companies/page-desc`, { params: { type } });

        return data.data;
    } catch (error) {
        console.log(error);
    }
};

export const getMainSiteData = async lang => {
    try {
        const data = await axios.get(`${SERVICE_URL}/${lang}/companies`);

        return data.data;
    } catch (error) {
        console.log(error);
    }
};

export const getCategories = async lang => {
    try {
        const data = await axios.get(`${SERVICE_URL}/${lang}/categories`);

        return data.data;
    } catch (error) {
        console.log(error);
    }
};

export const getProducts = async ({ lang, ...params }) => {
    try {
        const data = await axios.get(`${SERVICE_URL}/${lang}/products`, { params });

        return data.data;
    } catch (error) {
        console.log(error);
    }
};

export const getOurAdvantages = async lang => {
    try {
        const data = await axios.get(`${SERVICE_URL}/${lang}/differences`);

        return data.data;
    } catch (error) {
        console.log(error);
    }
};
