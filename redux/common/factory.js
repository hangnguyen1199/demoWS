import constants, { BASE_API_URL } from '@spo/config/constants';

import axios from 'axios';
import { GENDER } from '../../shared/config/constants';

const url = process.env.API_URL;
const factories = {
    requestGetSetting: () => {
        try {
            return axios({
                method: 'GET',
                url: `${url}/master/settings/app-setting`,
            });
        } catch (error) {}
    },
    requestGetSize: (data) => {
        if(data["Gender"] == GENDER.Child.Id){
            data["Gender"] = GENDER.Child.FilterParams
        }
        try {
            return axios({
                method: 'GET',
                url: `${url}/master/sizes/have-product`,
                params: data,
            });
        } catch (error) {}
    },
    requestGetCategory: (data) => {
        try {
            return axios({
                method: 'GET',
                url: `${url}/master/category/have-product-ver2`,
                params: data,
            });
        } catch (error) {}
    },
    requestGetCategoryByGender: (data) => {
        if(data["Gender"] == GENDER.Child.Id){
            data["Gender"] = GENDER.Child.FilterParams
        }
        try {
            return axios({
                method: 'GET',
                url: `${url}/master/category/have-product`,
                params: data,
            });
        } catch (error) {}
    },
    requestGetRankConfig: () => {
        try {
            return axios({
                method: 'GET',
                url: `${url}/master/rank-configs`,
            });
        } catch (error) {}
    },
    // Son added START 2021/12/06
    requestGetBranchBanking: (data) => {
        try {
            return axios({
                method: 'GET',
                url: `${url}/master/branch`,
                params: data,
            });
        } catch (error) {}
    },
    // Son added END 2021/12/06
    requestUserReviewsSetting: () =>
        axios({
            method: 'GET',
            url: `${url}/user/reviews/setting`,
        }),
    checkInput: (data) => {
        return axios({
            method: 'GET',
            url: `${url}/auth/sign-up/check-input`,
            params: data,
        });
    },
    requestGetSizeMaster: (data) => {
        try {
            return axios({
                method: 'GET',
                url: `${url}/master/sizes`,
                params: data,
            });
        } catch (error) {}
    },
    requestGetCategoryMasterAll: (data) => {
        try {
            return axios({
                method: 'GET',
                url: `${url}/master/category`,
                params: data,
            });
        } catch (error) {}
    },
    requestGetReturnReasonSetting: (data) => {
        try {
            return axios({
                method: 'GET',
                url: `${url}/master/library/refund-reason`,
                params: data,
            });
        } catch (error) {}
    },
    requestGetShoppingGuide: (data) => {
        try {
            return axios({
                method: 'GET',
                url: `${url}/master/settings/shopping-guid`,
                params: data,
            });
        } catch (error) {}
    },
};

export default factories;
