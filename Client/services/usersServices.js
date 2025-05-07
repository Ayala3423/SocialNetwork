import axios from "axios";
import Cookies from "js-cookie";

const API_URL = "http://localhost:5000";

export const signup = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/signup`, data);
        return response.data;
    } catch (error) {
        console.error("Error signing up:", error.response?.data || error.message);
        throw error;
    }
};

export const login = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/login`, data);
        return response.data;
    } catch (error) {
        console.error("Error logging in:", error.response?.data || error.message);
        throw error;
    }
};