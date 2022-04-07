import axios from 'axios';
import constants from '../../shared/config/constants';

const url = process.env.API_URL;
const factories = {
    requestNewsList: async data => {
        let params={}
        params['Limit'] = constants.PAGINATION_PRODUCT_LIST.LIMIT
        if (data[constants.ROUTER_NAME.PAGE]) {
            params['Offset'] = (data[constants.ROUTER_NAME.PAGE] - 1) * constants.PAGINATION_PRODUCT_LIST.LIMIT;
        } else {
            params['Offset']= constants.PAGINATION_PRODUCT_LIST.OFFSET
        }
        if(data.Title){
            params['Title']=data.Title;
        }
        if(data.Type){
            params['Type']=data.Type;
        }
        return await axios({
            method: 'GET',
            url: `${url}/news/news`,
            params: params,
        });
    },
    requestNewsDetail: id => {
        return axios({
            method: 'GET',
            url: `${url}/news/news/${id}`,
        });
    },
    requestNewsSlide: () => {
        return axios({
            method: 'GET',
            url: `${url}/news/news/slide`,
        });
    },
};

export default factories;
