import axios from 'axios';

const url = process.env.API_URL;

const factories = {
    requestSearchKeyword: async data => {
        return await axios({
            method: 'GET',
            url: `${url}/online/search`,
            params: data,
        });
    },
};

export default factories;
