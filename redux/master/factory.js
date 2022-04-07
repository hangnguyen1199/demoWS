import constants from '@spo/config/constants';
import axios from 'axios';

const url = process.env.API_URL;
const factories = {
    requestGetProvinceMaster: () => {
        return axios({
            method: 'GET',
            url: `${url}/master/provinces`,
        });
    },
    requestGetDistrictMaster: (data) => {
        return axios({
            method: 'GET',
            url: `${url}/master/districts`,
            params:data
        });
    },
    requestGetCommunesMaster: (data) => {
        return axios({
            method: 'GET',
            url: `${url}/master/communes`,
            params:data
        });
    },

};

export default factories;
