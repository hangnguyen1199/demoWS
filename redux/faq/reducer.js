import actions from "./action";

const initState = {
    Topic       : [],
    Questions   : [],
    Answer      : {},
    SearchResult: [],
    DataFAQ     : {
        MemberPolicy: [],
        OrderOnline : [],
        Payment     : [],
        ReturnPolicy:[],
        Account     : [],
    },
};

const FAQReducer = (state = initState, action) => {
    switch (action.type) {
    //----------------------------------------------
    // LOAD_FAQ_TOPIC
    //----------------------------------------------
        case actions.LOAD_FAQ_TOPIC_SUCCESS:
            return {
                ...state,
                Topic: action.payload,
            };
            //----------------------------------------------
            // LOAD_FAQ_QUESTIONS
            //----------------------------------------------
        case actions.LOAD_FAQ_QUESTIONS_SUCCESS:
            return {
                ...state,
                Questions: action.payload,
            };
            //----------------------------------------------
            // LOAD_FAQ_ANSWER
            //----------------------------------------------
        case actions.LOAD_FAQ_ANSWER_SUCCESS:
            return {
                ...state,
                Answer: action.payload,
            };
            //----------------------------------------------
            // LOAD_FAQ_QUESTIONS
            //----------------------------------------------
        case actions.SEARCH_FAQ_SUCCESS:
            return {
                ...state,
                SearchResult: action.payload,
            };
            //----------------------------------------------
            // LOAD_FAQ_QUESTIONS
            //----------------------------------------------
        case actions.SEARCH_FAQ_BY_TYPE_SUCCESS:
            return {
                ...state,
                DataFAQ: {
                    ...state.DataFAQ,
                    [action.typeName]: action.payload,
                },
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

export default FAQReducer;
