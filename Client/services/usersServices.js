import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const registerAuth = async (endpoint, body, onSuccess, onError) => {
    try {
        const response = await axios.post(
            `${API_URL}/${endpoint}`,
            body,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
        const data = response.data;
        if (onSuccess) onSuccess(data);
        return data;
    } catch (error) {
        console.error(error);
        if (onError) onError(error.message);
    }
};

export const signup = (body) => registerAuth("signup", body);
export const login = (body) => registerAuth("login", body);