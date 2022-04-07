import actions from './action';

const initState = {
    loading: false,
    data: {
        information: {}
        // aboutUs: {},
        // accountPolicy: {},
        // bannedPolicy: {},
        // commonPolicy: {},
        // complainPolicy: {},
        // contactInformation: {},
        // contractPolicy: {},
        // operationPolicy: {},
        // orderPolicy: {},
        // paymentPolicy: {},
        // productPolicy: {},
        // receiptExportPolicy: {},
        // returnOrederPolicy: {},
        // securityPolicy: {},
    },
};

const RegulationReducer = (state = initState, action) => {
    switch (action.type) {
        //----------------------------------------------
        // LOAD ABOUT US 
        //----------------------------------------------
        case actions.LOAD_INFORMATION_SYSTEM_SUCCESS:
            return {
                ...state,
                loading: false,
                data: {
                    ...state.data,
                    information: action.data
                }
            };
        case actions.LOADING_INFORMATION_SYSTEM:
            return {
                ...state,
                loading: true,
            };
        case actions.LOAD_INFORMATION_SYSTEM_FAILURE:
            return {
                ...state,
                loading: false,
            };
        default:
            return {
                ...state,
            };
    }
};

export default RegulationReducer;
