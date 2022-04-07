import actions from "./action";

const initState = {};

const RewardReducer = (state = initState, action) => {
    switch (action.type) {
        case actions.LOAD_REWARD_LIST_SUCCESS:
            return action.payload;
        default:
            return {
                ...state,
            };
    }
};

export default RewardReducer;
