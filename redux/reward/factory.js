import axios from "axios";
import constants from "@spo/config/constants";

const url = process.env.API_URL;
const factories = {
    requestGetUsersReward: () => {
        return axios({
            method: "GET",
            url: `${url}/users/reward`,
        });
    },
    requestPostUserRewardReceive: (data) => {
        return axios({
            method: "POST",
            url: `${url}/users/reward/recieve`,
            data: data,
        });
    },
};

export default factories;
