import Actions from './action';

const initState = {
    cities: [],
    districts: [],
    wards: [],
    stores: [],
    recruitmentCities: [],
    promotionBranchs: [],
};
const LocationReducer = (state = initState, action) => {
    switch (action.type) {
        case Actions.GET_CITY_RECRUITMENT:
        case Actions.GET_WARD:
        case Actions.GET_DISTRICT:
        case Actions.GET_CITY:
            return {
                ...state,
            };
        case Actions.GET_CITY_SUCCESS:
            return {
                ...state,
                cities: action.payload,
            };
        case Actions.GET_DISTRICT_SUCCESS:
            return {
                ...state,
                districts: action.payload,
            };
        case Actions.GET_WARD_SUCCESS:
            return {
                ...state,
                wards: action.payload,
            };
        case Actions.GET_CITY_RECRUITMENT_SUCCESS:
        {
            return {
                ...state,
                recruitmentCities: action.payload,
            };
        }
        default:
            return {
                ...state,
            };
    }
};
export default LocationReducer;
