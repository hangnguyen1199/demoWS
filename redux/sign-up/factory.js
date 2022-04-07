import axios from 'axios';

const url = process.env.API_URL;
const factories = {
    requestSignUpStepOne: data => {
        return axios({
            method: 'POST',
            url: `${url}/auth/sign-up/step-1`,
            data: data,
        });
    },
    requestSignUpStepTwo: data => {
        return axios({
            method: 'POST',
            url: `${url}/auth/sign-up/step-2`,
            data: data,
        });
    },
    requestVerifyOTP: data => {
        return axios({
            method: 'POST',
            url: `${url}/auth/verify/check-otp`,
            data: data,
        });
    },
};

export default factories;
