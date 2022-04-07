import axios from 'axios';
import constants from '@spo/config/constants';
import { v4 as uuidv4 } from 'uuid';

const url = process.env.API_URL
const factories = {
    requestSignUp: (data) => {
        // Tạo 1 function dùng để fetch data
        return axios({
            method: 'POST',
            url: `${url}/auth/user/forget-password`,
            data: data,
        });
    },
};

export default factories;
