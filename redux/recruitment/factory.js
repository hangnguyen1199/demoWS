import axios from 'axios';
import constants from '../../shared/config/constants';

const url = process.env.API_URL;
const Factories = {
    getRecruitmentList: (data) => {
        let params={}
        params['Limit']=constants.PAGINATION_PRODUCT_LIST.LIMIT
        if(data[constants.ROUTER_NAME.PAGE]){
            params['Offset']=  ( data[constants.ROUTER_NAME.PAGE] - 1 )  * constants.PAGINATION_PRODUCT_LIST.LIMIT
        }else{
            params['Offset']=constants.PAGINATION_PRODUCT_LIST.OFFSET
        }
        if(data.ProviceId){
            params['ProviceId']=data.ProviceId;
        }
        if(data.Position){
            params['Position']=data.Position;
        }
        return axios.get(`${url}/news/recruitments`, {
            params: {
                ...params,
            },
        });
    },
    getPositionsList: (data) => {
        return axios({
            method: 'GET',
            url: `${url}/master/library/position`,
            params: data,
        });
    },
    onApply: (data) => {
        const formData = new FormData();

        for (const key in data) {
            if (Object.hasOwnProperty.call(data, key)) {
                if (Array.isArray(data[key])) {
                    data[key]?.map((item, index) => {
                        for (let exKey in item) {
                            formData.append(`${key}[${index}][${exKey}]`, item[exKey]);
                        }
                    });
                } else {
                    formData.append(key, data[key]);
                }
            }
        }

        return axios({
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            url: `${url}/online/recruiment/apply`,
            data: formData,
        });
    },
};

export default Factories;
