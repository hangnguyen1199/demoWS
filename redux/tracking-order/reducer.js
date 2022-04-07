import actions from './action'

let initialState = {
    loading: false,
    TrackingOrder: {},
}

const myReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.LOAD_TRACKING_ORDER_LOADING:
            return {
                ...state,
                loading: true,
            }
        case actions.LOAD_TRACKING_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                TrackingOrder: action.payload,
            }
        default:
            return {
                ...state,
            }
    }
}

export default myReducer
