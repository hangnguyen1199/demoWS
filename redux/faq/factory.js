import axios from 'axios';

const url = process.env.API_URL;
const factories = {
    requestGetTopic: data => {
        // Tạo 1 function dùng để fetch data
        return axios({
            method: 'GET',
            url: `${url}/master/library/topic-faq`,
            params: data,
        });
    },
    requestGetQuestions: data => {
        return axios({
            method: 'GET',
            url: `${url}/master/faq`,
            params: data,
        });
    },
    requestGetAnswer: data => {
        return axios({
            method: 'GET',
            url: `${url}/master/faq/${data.Id}`,
            params: data,
        });
    },
};

export default factories;
