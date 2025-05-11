import axios from "axios";
import Cookies from "js-cookie";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
let getToken = () => Cookies.get('token');

export function setTokenGetter(fn) {
    getToken = fn;
}

async function request(url, params = {}, method = 'GET', body = null, onSuccess, onError) {
    try {
        console.log("123", body);

        const token = getToken();


        const config = {
            method,
            url: `${API_URL}/${url}`,
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
    getAll: (table, onSuccess, onError) =>
        request(table, {}, 'GET', null, onSuccess, onError),
    getById: (table, id, onSuccess, onError) =>
        request(`${table}/${id}`, {}, 'GET', null, onSuccess, onError),
    getNested: (base, id, nested, params, onSuccess, onError) =>
        request(`${base}/${id}/${nested}`, params, 'GET', null, onSuccess, onError),
    create: (table, data, onSuccess, onError) =>
        request(table, {}, 'POST', data, onSuccess, onError),
    update: (table, id, data, onSuccess, onError) =>
        request(`${table}/${id}`, {}, 'PUT', data, onSuccess, onError),
    patch: (table, id, data, onSuccess, onError) =>
        request(`${table}/${id}`, {}, 'PATCH', data, onSuccess, onError),
    remove: (table, id, onSuccess, onError) =>
        request(`${table}/${id}`, {}, 'DELETE', null, onSuccess, onError),
};