import axios from "axios";

const registerAuth = async (endpoint, body, onSuccess, onError) => {
    try {
        const response = await axios.post(`${API_URL}/${endpoint}`, body);
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
};

export const signup = (body) => registerAuth("signup", body);
export const login = (body) => registerAuth("login", body);