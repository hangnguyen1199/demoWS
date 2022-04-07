import axios from 'axios';

const url = process.env.API_URL;
const Factories = {
    getCity: async (data) =>
        await axios({
            method: 'GET',
            url: `${url}/master/provinces`,
            params: data,
        }),
    getDistricts: async (data) =>
        await axios({
            method: 'GET',
            url: `${url}/master/districts`,
            params: data,
        }),
    getWards: async (data) =>
        await axios({
            method: 'GET',
            url: `${url}/master/communes`,
            params: data,
        }),
    getListStores: async (data) =>
        await axios({
            method: 'GET',
            url: `${url}/master/branch`,
            params: data,
        }),
};

export default Factories;
