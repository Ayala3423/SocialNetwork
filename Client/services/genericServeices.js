import axios from "axios";

const API_URL = "http://localhost:5000";

const apiService = {
    getAll: async (table, params = {}) => {
        try {
            const response = await axios.get(`${API_URL}/${table}`, { params });
            return response.data;
        } catch (error) {
            handleError(error, `GET ALL from ${table}`);
        }
    },

    getById: async (table, id) => {
        try {
            const response = await axios.get(`${API_URL}/${table}/${id}`);
            return response.data;
        } catch (error) {
            handleError(error, `GET ${table}/${id}`);
        }
    },

    getNested: async (baseTable, id, nestedTable, params = {}) => {
        try {
            const response = await axios.get(`${API_URL}/${baseTable}/${id}/${nestedTable}`, { params });
            return response.data;
        } catch (error) {
            handleError(error, `GET ${baseTable}/${id}/${nestedTable}`);
        }
    },

    create: async (table, data) => {
        try {
            const response = await axios.post(`${API_URL}/${table}`, data);
            return response.data;
        } catch (error) {
            handleError(error, `POST to ${table}`);
        }
    },

    update: async (table, id, data) => {
        try {
            const response = await axios.put(`${API_URL}/${table}/${id}`, data);
            return response.data;
        } catch (error) {
            handleError(error, `PUT ${table}/${id}`);
        }
    },

    patch: async (table, id, data) => {
        try {
            const response = await axios.patch(`${API_URL}/${table}/${id}`, data);
            return response.data;
        } catch (error) {
            handleError(error, `PATCH ${table}/${id}`);
        }
    },

    remove: async (table, id) => {
        try {
            const response = await axios.delete(`${API_URL}/${table}/${id}`);
            return response.data;
        } catch (error) {
            handleError(error, `DELETE ${table}/${id}`);
        }
    }
};

function handleError(error, context) {
    const message = error.response?.data?.message || error.message || "Unknown error";
    console.error(`Error during ${context}:`, message);
    throw new Error(message);
}

export default apiService;