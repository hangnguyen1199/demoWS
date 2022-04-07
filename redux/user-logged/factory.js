import constants from '@spo/config/constants';
import axios from 'axios';

const url = process.env.API_URL;
const factories = {
    requestAuthMe: () => {
        return axios({
            method: 'GET',
            url: `${url}/auth/me`,
        });
    },
    requestGetUserInfo: () => {
        return axios({
            method: 'GET',
            url: `${url}/account`,
        });
    },
    requestUpdateUserInfo: (data) => {
        return axios({
            method: 'PUT',
            url: `${url}/account`,
            data: data
        });
    },
    requestGetUserOrder: (data) => {
        return axios({
            method: 'GET',
            url: `${url}/ordering/order/history-order`,
            params: data
        });
    },
    requestGetAddress: () => {
        return axios({
            method: 'GET',
            url: `${url}/account/address`,
        });
    },
    requestAddAddress: (data) => {
        return axios({
            method: 'POST',
            url: `${url}/account/address`,
            data
        });
    },
    requestRemoveAddress: (data) => {
        return axios({
            method: 'DELETE',
            url: `${url}/account/address/${data}`
        });
    },
    requestUpdateAddress: (data) => {

        return axios({
            method: 'PUT',
            url: `${url}/account/address/${data.user_address_id}`,
            data
        });
    },
    requestChangePassword: (data) => {
        return axios({
            method: 'PUT',
            url: `${url}/account/password`,
            data: {
                newPassword: data.password,
                oldPassword: data.old_password
            }
        });
    },
    requestChangeAvatar: (data) => {
        const formData = new FormData();
        formData.append('File',data);
        return axios({
            method: 'POST',
            url: `${url}/auth/user/upload/avatar`,
            data:formData,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        });
    },
    requestUpdateDefaultAddress: (data) => {
        return axios({
            method: 'PUT',
            url: `${url}/account/default-flag`,
            params: {
                userAddressId: data
            }
        });
    },
    requestGetAddressDetail: (data) => {
        return axios({
            method: 'GET',
            url: `${url}/account/address/${data}`,
        });
    },

    requestGetOrderQr: () => {
        return axios({
            method: 'POST',
            url: `${url}/users/orders/get-qr-data`,
        })
    },

};

export default factories;
