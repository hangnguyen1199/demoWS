import actions from './action';
import Cookies from 'js-cookie';

const initState = {
    loading: false,
    news: [],
    promotion: [],
    qa: [],
    total: 0
};

const AboutUsReducer = (state = initState, action) => {
    switch (action.type) {
        case actions.LOAD_NEWS:
            return {
                ...state
            }
        case actions.LOAD_NEWS_SUCCESS:
            return {
                ...state,
            };
        default:
            return {
                ...state,
            };
    }
};

export default AboutUsReducer;
