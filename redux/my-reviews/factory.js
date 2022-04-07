import axios from 'axios';
import Cookies from 'js-cookie';
import constants from '@spo/config/constants';

const url = process.env.API_URL;
const factories = {
    getReviewsForOrder: (queryParams) => {
        return axios({
            method: 'GET',
            url: `${url}/user/reviews`,
            params: queryParams
        });
    },

    getReviewsForChat: (queryParams) => {
        return axios({
            method: 'GET',
            url: `${url}/chat/customer-care/reviews`,
            params: queryParams
        });
    },

    getSettingReview: () => {
        return axios({
            method: 'GET',
            url: `${url}/user/reviews/setting`,
        });
    },

    saveChatReview: (data) => {
        return axios({
            method: 'POST',
            url: `${url}/user/reviews/chat`,
            data: data
        });
    },

    getChatDetail: (queryParams) => {
        return axios({
            method: 'GET',
            url: `${url}/chat/customer-care/old-convention`,
            params: queryParams
        });
    },
};

export default factories;
