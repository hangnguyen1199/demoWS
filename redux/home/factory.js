import axios from 'axios';
import constants from '@spo/config/constants';
import Cookies from 'js-cookie';
import { arrayToString } from '@spo/lib/helper';

const url = process.env.API_URL;

const factories = {
    requestGetProductWithType: (data) => {
        let param = { ...data?.data };
        return axios({
            method: 'GET',
            url: `${url}/online/products/filter`,
            params: param,
        });
    },
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
    },
    requestFilterProduct: async data =>
		 axios({
            method: 'GET',
            url: `${url}/online/products/filter`,
            params: data,
        }),
};

export default factories;
