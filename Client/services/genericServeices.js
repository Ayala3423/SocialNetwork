import axios from "axios";
import Cookies from "js-cookie";
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
let getToken = () => Cookies.get('token');

export function setTokenGetter(fn) {
    getToken = fn;
}

async function request(url, params = {}, method = 'GET', body = null, onSuccess, onError) {
    try {
        const token = getToken();
        const config = {
            method,
            url: `${API_URL}/${url}`,
            headers: {
                authorization: `Bearer ${token}`
            },
            params
        };
        if (method !== 'GET' && method !== 'DELETE') {
            config.body = body;
        }
        const response = await axios(config);
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        if (onSuccess)
            onSuccess(data);
        return response.body;
    } catch (error) {
        console.error(error);
        if (onError) onError(error.message);
    }
}

export const apiService = {
    getAll: (table, onSuccess, onError) =>
        request({ url: table, method: 'GET', onSuccess, onError }),
    getById: (table, id, onSuccess, onError) =>
        request({ url: `${table}/${id}`, method: 'GET', onSuccess, onError }),
    getNested: (base, id, nested, onSuccess, onError) =>
        request({ url: `${base}/${id}/${nested}`, method: 'GET', params, onSuccess, onError }),
    create: (table, data, onSuccess, onError) =>
        request({ url: table, method: 'POST', data, onSuccess, onError }),
    update: (table, id, data, onSuccess, onError) =>
        request({ url: `${table}/${id}`, method: 'PUT', data, onSuccess, onError }),
    patch: (table, id, data, onSuccess, onError) =>
        request({ url: `${table}/${id}`, method: 'PATCH', data, onSuccess, onError }),
    remove: (table, id, onSuccess, onError) =>
        request({ url: `${table}/${id}`, method: 'DELETE', onSuccess, onError }),
};
