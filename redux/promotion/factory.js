import Axios from 'axios';
import constants from '../../shared/config/constants';

const url = process.env.API_URL;

const Factories = {
    getPromotionList: (data) => {
        let params={}
        params['Limit'] = constants.PAGINATION_PRODUCT_LIST.LIMIT
        if(data.Title){
            params['Title']=data.Title;
        }
        if(data.BranchId){
            params['BranchId']=data.Title;
        }
        if (data[constants.ROUTER_NAME.PAGE]) {
            params['Offset'] = (data[constants.ROUTER_NAME.PAGE] - 1) * constants.PAGINATION_PRODUCT_LIST.LIMIT;
        } else {
            params['Offset']= constants.PAGINATION_PRODUCT_LIST.OFFSET
        }
        return Axios.get(`${url}/news/promotions`, {
            params: params,
        });
    },
};
export default Factories;
