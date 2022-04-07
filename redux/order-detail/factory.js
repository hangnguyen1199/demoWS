import axios from 'axios';
import constants from '@spo/config/constants';
import { v4 as uuidv4 } from 'uuid';

const url = process.env.API_URL;
const factories = {
    requestGetOrderDetail: (data) => {
        return axios({
            method: 'GET',
            url: `${url}/online/order/order-info`,
            params: data,
        });
    },
};
export default factories;
