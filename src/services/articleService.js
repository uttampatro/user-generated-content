import * as config from '../config/api';
import axios from './axios';
const getAllArticles = async ({ page, limit }) => {
    try {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) throw new Error('Access token does not exists');

        const response = await axios.get(
            `${config.apiConfig.baseUrl}/v1/fetchAllArticles?page=${page}&limit=${limit}`,
            { headers: { Authorization: accessToken } }
        );
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

const getArticle = async id => {
    try {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) throw new Error('Access token does not exists');

        const response = await axios.get(
            `${config.apiConfig.baseUrl}/v1/fetchArticle/${id}`,
            { headers: { Authorization: accessToken } }
        );
        // console.log(response)
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

const getUsersArticles = async (id, { page, limit }) => {
    try {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) throw new Error('Access token does not exists');

        const response = await axios.get(
            `${config.apiConfig.baseUrl}/v1/articlesByWriter/${id}?page=${page}&limit=${limit}`,
            { headers: { Authorization: accessToken } }
        );
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

const deleteArticle = async id => {
    try {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) throw new Error('Access token does not exists');

        const response = await axios.delete(
            `${config.apiConfig.baseUrl}/v1/deleteArticle/${id}`,
            { headers: { Authorization: accessToken } }
        );
        console.log(response)
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export { getAllArticles, getArticle, getUsersArticles, deleteArticle };
