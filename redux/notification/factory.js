import axios from 'axios';
import Cookies from 'js-cookie';
import constants from '@spo/config/constants';

const url = process.env.API_URL;
const factories = {
    requestGetNotification: () => {
        return axios({
            method: 'GET',
            url: `${url}/notification`,
        });
    },
    requestUpdateNotification: (notification_id) => {
        return axios({
            method: 'PUT',
            url: `${url}/notification/${notification_id}`,
        });
    },
};

export default factories;
