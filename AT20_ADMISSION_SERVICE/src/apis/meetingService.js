
import axios from 'axios';
const API_URL = 'http://localhost:8080/api/v1/interview';

export const saveMeetingData = async (formData) => {
    try {
        const response = await axios.post(`${API_URL}/save`, formData);
        return response.data;
    } catch (error) {
    // eslint-disable-next-line no-console
        console.error(error);
    }
};

export const getMeetingData = async (formData) => {
    try {
        const response = await axios.get(`${API_URL}/interviews`, formData);
        return response.data;
    } catch (error) {
    // eslint-disable-next-line no-console
        console.error(error);
    }
};
