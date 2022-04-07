import actions from './action';
import Cookies from 'js-cookie';
import axios from 'axios';

const initState = {
    data: {
        Genders: [
            {
                Key: "M",
                Value: 'Nam',
            },
            {
                Key: "F",
                Value: 'Nữ',
            },
            {
                Key: "O",
                Value: 'Khác',
            },
        ],
        Provinces:[]
    },
};

const MasterReducer = (state = initState, action) => {
    switch (action.type) {
        case actions.GET_PROVINCE_MASTER_SUCCESS:
            return {
                ...state,
                data: {
                    ...state.data,
                    Provinces: action.data,
                },
            };
        default:
            return {
                ...state,
            };
    }
};

export default MasterReducer;
