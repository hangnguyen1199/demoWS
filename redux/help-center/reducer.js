import actions from './action';

const initState = {
    content: {},
    faqs: [],
};

const HelpCenterReducer = (state = initState, action) => {
    switch (action.type) {
        //----------------------------------------------
        // LOAD_POLICY_RESPONSE
        //----------------------------------------------
        case actions.GET_POLICY_RESPONSE:
            return {
                ...state,
                content: action.payload,
            };
        //----------------------------------------------
        // GET_FAQ_RESPONSE
        //----------------------------------------------
        case actions.GET_FAQ_RESPONSE:
            return {
                ...state,
                faqs: [...action.payload],
            };
        //----------------------------------------------
        // DEFAULT
        //----------------------------------------------
        default:
            return {
                ...state,
            };
    }
};

export default HelpCenterReducer;
