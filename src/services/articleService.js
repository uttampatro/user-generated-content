import * as config from '../config/api';
import axios from './axios';
const getAllArticles = async ({ page, limit }) => {
    try {
        const response = await axios.get(
            `${config.apiConfig.baseUrl}/v1/fetchAllArticles?page=${page}&limit=${limit}`
        );
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

const getArticle = async id => {
    try {
        const response = await axios.get(
            `${config.apiConfig.baseUrl}/v1/fetchArticle/${id}`
        );
        // console.log(response)
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

const getUsersArticles = async (id, { page, limit }) => {
    try {
        const response = await axios.get(
            `${config.apiConfig.baseUrl}/v1/articlesByWriter/${id}?page=${page}&limit=${limit}`
        );
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export { getAllArticles, getArticle, getUsersArticles };
