import axios from 'axios';
import constants from '@spo/config/constants';
import { convertStringToString } from '@spo/lib/helper';

const url = process.env.API_URL;
const factories = {
    requestSearchShop: (data) => {
        return axios({
            method: 'GET',
            url: `${url}/shop`,
            params: {
                search: data,
                limit: 0,
            },
        });
    },
};

export default factories;
