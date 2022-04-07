import axios from 'axios';

const url = process.env.API_URL;
const factories = {
    requestGetRelativeProduct: (data) => {
        return axios({
            method: 'GET',
            url: `${url}/online/products/filter`,
            params: data,
        });
    },
    requestGetProductDetail: (data) => {
        return axios({
            method: 'GET',
            url: `${url}/online/products`,
            params: data,
        });
    },
    requestGetProductDetailReview: (data) => {
        return axios({
            method: 'GET',
            url: `${url}/online/reviews/product`,
            params: data,
        });
    },
    requestGetStockInfo: (data) => {
        return axios({
            method: 'GET',
            url: `${url}/online/products/product-info`,
            params: data,
        });
    },
};

export default factories;
