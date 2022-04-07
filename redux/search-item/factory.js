import axios from 'axios';
import constants from '@spo/config/constants';
import { convertStringToString, arrayToString } from '@spo/lib/helper';
import Cookies from 'js-cookie';

const url = process.env.API_URL;
const factories = {
    requestFilterItem: (data) => {
        let newParam = {};
        if (data['type']) {
            newParam.type = `${data['type']}`;
        }
        if (data[constants.PARAM_URL.TYPE]) {
            if (data[constants.PARAM_URL.TYPE] == constants.TYPE_ITEM.RECENT) {
                // const itemCookie = Cookies.get('view_history');
                const itemCookie = localStorage.getItem('view_history');
                let listId = (itemCookie ? JSON.parse(itemCookie) : []).map(
                    (e) => e.id,
                );

                listId = listId.filter((x) => !isNaN(Number.parseInt(x)));

                const requestString = arrayToString(listId);
                newParam["ids"] = requestString;
            } else {
                newParam.type = `${data[constants.PARAM_URL.TYPE]}`;
            }
        }
        if (data[constants.PARAM_URL.COLOR]) {
            newParam.color = `${data[constants.PARAM_URL.COLOR]}`;
        }
        if (data[constants.PARAM_URL.TYPE_ORDER]) {
            newParam.type_order = `${data[constants.PARAM_URL.TYPE_ORDER]}`;
        }
        if (data[constants.PARAM_URL.SEARCH]) {
            newParam.search = `${data[constants.PARAM_URL.SEARCH]}`;
        }
        if (data[constants.PARAM_URL.SHOP]) {
            newParam.shop = `${data[constants.PARAM_URL.SHOP]}`;
        }
        if (data[constants.PARAM_URL.HOTTREND]) {
            newParam.hot_trend = `${data[constants.PARAM_URL.HOTTREND]}`;
        }
        if (data[constants.PARAM_URL.PRICE_FROM]) {
            newParam.price_from = `${data[constants.PARAM_URL.PRICE_FROM]}`;
        }
        if (data[constants.PARAM_URL.PRICE_TO]) {
            newParam.price_to = `${data[constants.PARAM_URL.PRICE_TO]}`;
        }
        if (data[constants.PARAM_URL.LIMIT]) {
            newParam.limit = `${data[constants.PARAM_URL.LIMIT]}`;
        }
        if (data[constants.PARAM_URL.OFFSET]) {
            newParam.offset = `${data[constants.PARAM_URL.OFFSET]}`;
        }
        if (data[constants.PARAM_URL.CATEGORY_SLUG]) {
            newParam.category_slug = `'${
                data[constants.PARAM_URL.CATEGORY_SLUG]
            }'`;
        }
        if (
            data[constants.PARAM_URL.GENDER_ITEM] &&
            data[constants.PARAM_URL.GENDER_ITEM] != 'A'
        ) {
            newParam.gender_item = `'${data[constants.PARAM_URL.GENDER_ITEM]}'`;
        }
        if (data[constants.PARAM_URL.SIZE]) {
            newParam.size = convertStringToString(
                data[constants.PARAM_URL.SIZE],
            );
        }
        if (data[constants.PARAM_URL.BRAND]) {
            newParam.brand = `${data[constants.PARAM_URL.BRAND]}`;
        }
        if (data[constants.PARAM_URL.COLLECTION]) {
            newParam.category_slug = `'${
                data[constants.PARAM_URL.COLLECTION]
            }'`;
        }
        return axios({
            method: 'GET',
            url: `${url}/product/item`,
            params: newParam,
        });
    },

    requestGetCurrentCategory: (data) => {
        return axios({
            method: 'GET',
            url: `${url}/spo-master/category/a-category`,
            params: {
                slug: data,
            },
        });
    },
    requestGetBrandName: (data) => {
        return axios({
            method: 'GET',
            url: `${url}/spo-master/brand/${data}/name`,
        });
    },
    requestGetCategoryName: (data) => {
        return axios({
            method: 'GET',
            url: `${url}/spo-master/category/${data}/name`,
        });
    },
};

export default factories;
