import axios from 'axios';
import constants from '@spo/config/constants';

const url = process.env.API_URL;
const factories = {
    requestGetInformation: (data) => {
        // Tạo 1 function dùng để fetch data
        let url2="https://localhost:5017/api/1.0"
        return axios({
            method: 'GET',
            url: `${url}/master/information/${data.code}`,
        });
    },

};

export default factories;
