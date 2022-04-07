import axios from 'axios';
import Cookies from 'js-cookie';
import constants from '@spo/config/constants';

const url = process.env.API_URL;
const factories = {
    requestGetCartProduct: () => {
        return axios({
            method: 'GET',
            url: `${url}/online/cart`
        });
    },
    requestRemoveCartItem: (_productInfo) => {
        return axios({
            method: 'POST',
            url: `${url}/online/cart/delete`,
            data: {
                ProductId: _productInfo.ProductId,
                ColorId: _productInfo.ColorId,
                SizeId: _productInfo.SizeId
            }
        });
    },
    requestAddCart: (_productInfo) => {
        return axios({
            method: 'POST',
            url: `${url}/online/cart`,
            data: {
                ProductId: _productInfo.ProductId,
                ColorId: _productInfo.ColorId,
                SizeId: _productInfo.SizeId,
                Quantity: _productInfo.Quantity
            },

        });
    },
    requestAddCartSync: (_productInfo) => {
        return axios({
            method: 'POST',
            url: `${url}/online/cart/v2`,
            data: {
                ProductId: _productInfo.ProductId,
                ColorId: _productInfo.ColorId,
                SizeId: _productInfo.SizeId,
                Quantity: _productInfo.Quantity,
                Mode: 1
            },

        });
    },
    requestLoadCartSync: (_productInfo) => {
        let cartCookies=_productInfo
        return axios({
            method: 'GET',
            url: `${url}/online/cart/sync-cart`,
            params:{
                cartCookies
            }

        });
    },

    requestUpdateCartItem: (_productInfo) => {
        return axios({
            method: 'POST',
            url: `${url}/online/cart/product/change-quantity`,
            data: {
                ProductId: _productInfo.ProductId,
                ColorId: _productInfo.ColorId,
                SizeId: _productInfo.SizeId,
                Quantity: _productInfo.Quantity
            },
        });
    },

    // Get product info by id
    requestGetProductInfoById: (data) => {
        return axios({
            method: 'GET',
            url: `${url}/online/products/product-info`,
            params: data,
        });
    },
    requestGetRelativeProduct: (data) => {
        return axios({
            method: 'GET',
            url: `${url}/online/products/filter`,
            params: data,
        });
    },

    requestCreateTempOrder: (data) => {
        return axios({
            method: 'POST',
            url: `${url}/online/order/create-order-temp`,
            data: data,
        });
    },

    requestGetProductDetail: (data) => {
        return axios({
            method: 'GET',
            url: `${url}/online/products/${data?.ProductId}`,
        });
    },
};

export default factories;
