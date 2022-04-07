import axios from 'axios';

const url = process.env.API_URL;
const factories = {
    requestNewsList: async data => {
        return await axios({
            method: 'GET',
            url: `${url}/news/news`,
            params: data,
        });
    },

    requestNotificationList: async (data) => {
        return await axios({
            method: 'GET',
            url: `${url}/users/notifications`,
            params: data
        })
    },

    requestPromotionList: async (data) => {
        return await axios({
            method: 'GET',
            url: `${url}/news/promotions`,
            params: data
        })
    }
};

export default factories;
