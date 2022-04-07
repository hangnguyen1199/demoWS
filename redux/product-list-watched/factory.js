import axios from 'axios';
import constants from './../../shared/config/constants';


const url = process.env.API_URL;

const factories = {
    requestGetProductWithFilter: (data) => {
        let param = { ...data?.data };
        return axios({
            method: 'GET',
            url: `${url}/online/products/viewed-history`,
            params: param,
        });
    },
    requestGetRelativeProduct: (data) => {
        return axios({
            method: 'GET',
            url: `${url}/online/products/filter`,
            params: data,
        });
    },
};

export default factories;
