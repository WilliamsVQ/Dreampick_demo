/* eslint-disable no-console */
import axios from 'axios';

const API_URL = 'http://localhost:5050';

export const convertImage = async (file) => {
    try {
        const formData = new FormData();
        console.log(file);

        formData.append('image', file);
        formData.append('width', '180');
        formData.append('height', '180');

        const response = await axios.post(`${API_URL}/api/v1.0/convert_image/converter`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        const { downloadUrl } = response.data;
        return downloadUrl;
    } catch (error) {
        console.error(error);
    }
};
