import axios from 'axios';
import constants from '@spo/config/constants';
import Cookies from 'js-cookie';
import { arrayToString } from '@spo/lib/helper';

const url = process.env.API_URL;
const factories = {
    requestAddWishlist: (item_id) => {
        try {
            return axios({
                method: 'POST',
                url: `${url}/online/whishlist`,
                params: {
                    ProductId: item_id,
                },
            });
        } catch (error) {
            console.log('ERROR FACTORY:', error);
        }
    },
    requestGetWishlist: (data) => {
        try {
            return axios({
                method: 'GET',
                url: `${url}/online/products/filter`, // /online/products/filter?Limit=100&Type=4
                params: data,
            });
        } catch (error) {
            console.log('ERROR FACTORY:', error);
        }
    },
    requestRemoveItem: (item_id) => {
        try {
            return axios({
                method: 'DELETE',
                url: `${url}/product/wishlist/${item_id}`,
            });
        } catch (error) {
            console.log('ERROR FACTORY:', error);
        }
    },
    requestGetRelativeProduct: (data) => {
        return axios({
            method: 'GET',
            url: `${url}/online/products/filter`,
            params: data,
        });
    },
};

export default factories;
