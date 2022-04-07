import axios from 'axios';

const url = process.env.API_URL;
const factories = {
    requestGetUserProfile: () => {
        return axios({
            method: 'GET',
            url: `${url}/auth/user/profile`,
        });
    },
    requestGetUser: () => {
        return axios({
            method: 'GET',
            url: `${url}/auth/user`,
        });
    },
    requestUpdateUserProfile: (data) => {
        return axios({
            method: 'POST',
            url: `${url}/auth/user`,
            data: data,
        });
    },
    requestCheckOTP: (data) => {
        return axios({
            method: 'POST',
            url: `${url}/auth/verify/check-otp`,
            data: data,
        });
    },
    requestResendOtp: (data) => {
        return axios({
            method: 'POST',
            url: `${url}/auth/verify/resend-otp`,
            data: data,
        });
    },
    requestForgotPassword: (data) => {
        return axios({
            method: 'POST',
            url: `${url}/auth/user/forgot-password`,
            data: data,
        });
    },
    requestResetPassword: (data) => {
        return axios({
            method: 'POST',
            url: `${url}/auth/user/update-password`,
            data: data,
        });
    },
    requestCheckOTPForgotPassword: (data) => {
        return axios({
            method: 'POST',
            url: `${url}/auth/user/forgot-password/check-otp`,
            data: data,
        });
    },
    requestResendOTPForgotPassword: (data) => {
        return axios({
            method: 'POST',
            url: `${url}/auth/user/forgot-password/check-otp`,
            data: data,
        });
    },
    sendOtpChangePhone: data =>
        axios({
            method: 'POST',
            url: `${url}/auth/user/change-phone/otp/${data.Phone}`,
        }),
    sendOtpChangeEmail: data =>
        axios({
            method: 'POST',
            url: `${url}/auth/user/change-email/otp/${data.Email}`,
        }),
    updatePhone: data =>
        axios({
            method: 'POST',
            url: `${url}/auth/user/change-phone/update-phone`,
            data,
        }),
    updateEmail: data => {
        return axios({
            method: 'POST',
            url: `${url}/auth/user/change-email/update-email`,
            data,
        });
    },
};

export default factories;
