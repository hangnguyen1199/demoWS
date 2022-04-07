import Utils from '../../shared/utils/utils';
import Actions from './action';

const initialState = {
    list: {
        Total: null,
        Offset: 0,
        Limit: 12,
        Recruitments: [],
    },
    listMobile: {
        Total: 0,
        Offset: 0,
        Limit: 12,
        Recruitments: [],
    },
    positions: [],
    detail: {},
    loading: true
};
const RecruitmentReducer = (state = initialState, action) => {
    switch (action.type) {
        //----------------------------------------------
        // LOAD_RECRUITMENT_LIST
        //----------------------------------------------
        case Actions.LOAD_RECRUITMENT_LIST_MOBILE_RESPONSE:
            return {
                ...state,
                list: action.payload,
                listMobile: Utils.handlePagination(
                    state.listMobile,
                    action.payload,
                    action.isLoadMore,
                    'Recruitments',
                ),
            };
        case Actions.LOAD_RECRUITMENT_LIST_RESPONSE:
            return {
                ...state,
                list: action.payload,
            };

        //----------------------------------------------
        // LOAD_RECRUITMENT_DETAIL
        //----------------------------------------------
        case Actions.LOAD_RECRUITMENT_DETAIL_RESPONSE:
            return {
                ...state,
                detail: action.payload,
            };

        //----------------------------------------------
        // LOAD_POSITION_TYPE
        //----------------------------------------------
        case Actions.LOAD_POSITION_TYPE_RESPONSE:
            return {
                ...state,
                positions: action.payload,
            };
        case Actions.LOAD_RECRUITMENT_LIST_LOADING:
            return {
                ...state,
                loading:false
            }
        default:
            return {
                ...state,
            };
    }
};
export default RecruitmentReducer;
