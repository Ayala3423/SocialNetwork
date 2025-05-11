import axios from "axios";
import Cookies from "js-cookie";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
let getToken = () => Cookies.get('token');

export function setTokenGetter(fn) {
    getToken = fn;
}

async function request(userId, url, params = {}, method = 'GET', body = null, onSuccess, onError) {
    try {
        console.log("bla", params);

        const token = getToken();
        console.log(`Token: ${token}`);


        const config = {
            method,
            url: `${API_URL}/users/${userId}/${url}`,
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${token}`
            },
            params
        };
        
        if (method !== 'GET' && method !== 'DELETE' && body) {
            config.data = body;
        }

        const response = await axios(config);

        const data = response.data;
        console.log(`API response: ${JSON.stringify(data)}`);

        if (onSuccess) {
            onSuccess(data)
        };
        return data;
    } catch (error) {
        console.error(error);
        if (onError) onError(error.message);
    }
}

export const apiService = {
    getAll: (userId, table, onSuccess, onError) =>
        request(userId, table, {}, 'GET', null, onSuccess, onError),
    getByValue: (userId, table, params, onSuccess, onError) =>
        request(userId, table, params, 'GET', null, onSuccess, onError),
    getById: (userId, table, onSuccess, onError) =>
        request(userId, `${table}`, {}, 'GET', null, onSuccess, onError),
    getNested: (userId, base, id, nested, onSuccess, onError) =>
        request(userId, `${base}/${id}/${nested}`, {}, 'GET', null, onSuccess, onError),
    create: (userId, table, body, onSuccess, onError) =>
        request(userId, table, {}, 'POST', body, onSuccess, onError),
    update: (userId, table, id, data, onSuccess, onError) =>
        request(userId, `${table}/${id}`, {}, 'PUT', data, onSuccess, onError),
    patch: (userId, table, id, data, onSuccess, onError) =>
        request(userId, `${table}/${id}`, {}, 'PATCH', data, onSuccess, onError),
    remove: (userId, table, id, onSuccess, onError) =>
        request(userId, `${table}/${id}`, {}, 'DELETE', null, onSuccess, onError),
};