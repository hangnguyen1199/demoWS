
import axios from 'axios';
import constants, { GENDER } from './../../shared/config/constants';


const url = process.env.API_URL;

const factories = {
    requestGetProductWithFilter: (data) => {
        let param = {};
        if (data.Type) {
            param['Type'] = data.Type;
        }
        param['Limit'] = constants.PAGINATION_PRODUCT_LIST.LIMIT
        if (data.data[constants.ROUTER_NAME.PAGE]) {
            param['Offset'] = (data.data[constants.ROUTER_NAME.PAGE] - 1) * constants.PAGINATION_PRODUCT_LIST.LIMIT;
        } else {
            param['Offset']= constants.PAGINATION_PRODUCT_LIST.OFFSET
        }
        if (data.data[constants.ROUTER_NAME.SIZE]) {
            param["SizeId"] = data.data[constants.ROUTER_NAME.SIZE]
        }
        if (data.data[constants.ROUTER_NAME.SORT_BY_PRICE]) {
            param["Sort"] = data.data[constants.ROUTER_NAME.SORT_BY_PRICE]
        }else{
            param["Sort"]= constants.SORT_FILTER.PRICE_ASC['VALUE']
        }
        if (data.data[constants.ROUTER_NAME.PROMOTION]) {
            param["TypeOfPromotion"] = data.data[constants.ROUTER_NAME.PROMOTION]
        }
        if (data.data[constants.ROUTER_NAME.PRICE_FROM]) {
            param["PriceFrom"] = data.data[constants.ROUTER_NAME.PRICE_FROM]
        }
        if (data.data[constants.ROUTER_NAME.PRICE_TO]) {
            param["PriceTo"] = data.data[constants.ROUTER_NAME.PRICE_TO]
        }
        if (data.data[constants.ROUTER_NAME.GENDER]) {
            param["Gender"] = data.data[constants.ROUTER_NAME.GENDER]
            if(data.data[constants.ROUTER_NAME.GENDER] == GENDER.Child.Id){
                param["Gender"] = GENDER.Child.FilterParams
            }
        }
        if (data.data[constants.ROUTER_NAME.CATEGORY]) {
            param["CategoryId"] = data.data[constants.ROUTER_NAME.CATEGORY]
        }
        if (data.data[constants.ROUTER_NAME.QUERY_TIME]) {
            param['QueryTime'] = data.data[constants.ROUTER_NAME.QUERY_TIME]
        }
        if (data.data[constants.ROUTER_NAME.KEYWORD]) {
            param['Search'] = data.data[constants.ROUTER_NAME.KEYWORD];
        }
        return axios({
            method: 'GET',
            url: `${url}/online/products/filter`,
            params: param,
        });
    },
    requestGetPromotionTime: (data) => {
        return axios({
            method: 'GET',
            url: `${url}/online/products/promotion-time`,
            params: data,
        });
    },
};

export default factories;
