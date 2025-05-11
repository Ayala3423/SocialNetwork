import axios from "axios";
import Cookies from "js-cookie";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
let getToken = () => Cookies.get('token');

export function setTokenGetter(fn) {
    getToken = fn;
}

async function request(userId, url, params = {}, method = 'GET', body = null, onSuccess, onError) {
    try {
        console.log(body);
        
        const token = getToken();

        const config = {
            method,
            url: `${API_URL}/users/${userId}/${url}`,
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${token}`
            },
            params
        };
        if (method !== 'GET' && method !== 'DELETE') {
            config.data = body;
        }
        const response = await axios(config);
        console.log(response);

        const data = response.data;
        console.log(`API response: ${JSON.stringify(data)}`);

        if (onSuccess) {
            onSuccess(data)
        };
        return response.body;
    } catch (error) {
        console.error(error);
        if (onError) onError(error.message);
    }
}

export const apiService = {
    getAll: (userId, table, onSuccess, onError) =>
        request(userId, table, {}, 'GET', null, onSuccess, onError),
    getById: (userId, table, id, onSuccess, onError) =>
        request(userId, `${table}/${id}`, {}, 'GET', null, onSuccess, onError),
    getNested: (userId, base, id, nested, params, onSuccess, onError) =>
        request(userId, `${base}/${id}/${nested}`, params, 'GET', null, onSuccess, onError),
    create: (userId, table, data, onSuccess, onError) =>
        request(userId, table, {}, 'POST', data, onSuccess, onError),
    update: (userId, table, id, data, onSuccess, onError) =>
        request(userId, `${table}/${id}`, {}, 'PUT', data, onSuccess, onError),
    patch: (userId, table, id, data, onSuccess, onError) =>
        request(userId, `${table}/${id}`, {}, 'PATCH', data, onSuccess, onError),
    remove: (userId, table, id, onSuccess, onError) =>
        request(userId, `${table}/${id}`, {}, 'DELETE', null, onSuccess, onError),
};