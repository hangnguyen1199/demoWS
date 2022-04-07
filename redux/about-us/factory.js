import axios from 'axios';
import Cookies from 'js-cookie';
import constants from '@spo/config/constants';

const url = process.env.API_URL;
const factories = {
    requestGetNews: (data) => {
        let param = { ...data?.data };
        return axios({
            method: 'GET',
            url: `${url}/news/news`,
            params: param,
        });
    },

    requestGetPromotions: (data) => {
        let param = { ...data?.data };
        return axios({
            method: 'GET',
            url: `${url}/news/promotions`,
            params: param,
        });
    }
};

export default factories;
