import axios from 'axios';

const url = process.env.API_URL;
const factories = {
    requestSignIn: (data) => {
        // Tạo 1 function dùng để fetch data
        return axios({
            method: 'POST',
            url: `${url}/auth/login`,
            data: data,
        });
    },
    requestUserInfo: () => {
        // Tạo 1 function dùng để fetch data
        return axios({
            method: 'GET',
            url: `${url}/auth/user`,
        });
    },
    requestRefreshToken: (refreshTokenInfo) => {
        return axios({
            method: 'GET',
            url: `${url}/auth/refresh-token`,
            data: {
                "JwtToken": refreshTokenInfo.token,
                "RefreshToken": refreshTokenInfo.refreshToken
            }
        });
    },
    requestAuthSocial: (data) => {
        // Tạo 1 function dùng để fetch data
        return axios({
            method: 'POST',
            url: `${url}/auth/login/social`,
            data: data,
        });
    },
};

export default factories;
