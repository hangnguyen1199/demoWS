import axios from 'axios';
import Cookies from 'js-cookie';
import constants from '@spo/config/constants';

const url = process.env.API_URL;
const factories = {
    getUserAddress: () => {
        return axios({
            method: 'GET',
            url: `${url}/online/order/get-user-address-for-order`
        });
    },
    getUserAddressV2: () => {
        return axios({
            method: 'GET',
            url: `${url}/users/address`
        });
    },

    getVoucher: () => {
        return axios({
            method: 'GET',
            url: `${url}/online/order/voucher`
        });
    },

    calculateOrder: (data) => {
        return axios({
            method: 'POST',
            url: `${url}/online/order/calculate-order`,
            data: data
        });
    },
    calculateOrderSync: (data) => {
        return axios({
            method: 'POST',
            url: `${url}/online/order/calculate-order-v2`,
            data: data
        });
    },

    createOrder: (data) => {
        return axios({
            method: 'POST',
            url: `${url}/online/order`,
            data: data
        });
    },

    createOrderSync: (data) => {
        return axios({
            method: 'POST',
            url: `${url}/online/order/v2`,
            data: data
        });
    },

    createAddress: (data) => {
        return axios({
            method: 'POST',
            url: `${url}/users/address/user-address`,
            data: data
        });
    },
    createAddressV2: (data) => {
        return axios({
            method: 'POST',
            url: `${url}/users/address`,
            data: data
        });
    },
    deleteAddressV2: (data) => {
        return axios({
            method: 'DELETE',
            url: `${url}/users/address/${data}`,
        });
    },
};

export default factories;
