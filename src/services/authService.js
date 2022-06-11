import * as config from '../config/api';
import axios from './axios';

const register = async ({ email, password }) => {
    try {
        const response = await axios.post(
            `${config.apiConfig.baseUrl}/v1/register`,
            {
                email,
                password,
            }
        );
        if (response.data) {
            localStorage.setItem(
                'accessToken',
                JSON.stringify(response.data.accessToken)
            );
        }
        // console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

const login = async ({ email, password }) => {
    try {
        const response = await axios.post(
            `${config.apiConfig.baseUrl}/v1/login`,
            {
                email,
                password,
            }
        );
        if (response.data) {
            localStorage.setItem(
                'accessToken',
                JSON.stringify(response.data)
            );
        }
        // console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

const logout = async () => {
    try {
        localStorage.clear();
    } catch (err) {
        console.log(err);
    }
};

export {register, login, logout };
