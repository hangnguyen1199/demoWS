import axios from 'axios';
import constants from '@spo/config/constants';

const factories = {
    requestCheckAccountAuthentication: () => {
        // Tạo 1 function dùng để fetch data
        try {
            return axios({
                method: 'GET',
                url: `${constants.BASE_API_URL}/auth/check-account-authentication`,
            });
        } catch (error) {
            throw error;
        }
    },
};

export default factories;
