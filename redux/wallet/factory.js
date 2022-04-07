import axios from "axios";

const url = process.env.API_URL;
const factories = {
    requestGetPointHistories: async (data) => {
        return await axios({
            method: "GET",
            url: `${url}/users/point/history`,
            params: data,
        });
    },
    requestGetVouchers: async (data) => {
        return await axios({
            method: "GET",
            url: `${url}/users/vouchers`,
            params: data,
        });
    },
    requestGetPointHistoryDetail: async (data) => {
        return axios({
            method: "GET",
            url: `${url}/users/orders/${data.code}`,
            params: {
                Type: data.type,
            },
        });
    },
};

export default factories;
