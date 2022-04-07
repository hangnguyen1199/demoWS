import Utils from '../../shared/utils/utils'
import actions from './action'

const initState = {
    loading: false,
    limit: 10,
    offset: 0,
    products: [],
    suggests: [],
    others: [],
    searchInputStatus: false,
    data: {},
    searchScreen: {},
}

const MenuSearchReducer = (state = initState, action) => {
    switch (action.type) {
        //----------------------------------------------
        // LOAD_NEWS_LIST
        //----------------------------------------------
        case actions.FETCH_KEYWORD_SEARCH:
            return {
                ...state,
                loading: true,
            }

        case actions.FETCH_KEYWORD_SEARCH_SUCCESS:
            return {
                ...state,
                data: action.payload,
            }

        case actions.FETCH_KEYWORD_SEARCH_FAILURE:
            return {
                ...state,
                loading: false,
            }

        case actions.OPEN_SEARCH_INPUT:
            return {
                ...state,
                searchInputStatus: true,
            }
        case actions.CLOSE_SEARCH_INPUT:
            return {
                ...state,
                searchInputStatus: false,
            }
        case actions.FETCH_KEYWORD_SEARCH_SCREEN_SUCCESS:
            return {
                ...state,
                searchScreen :action.payload,
            }

        //----------------------------------------------
        // DEFAULT
        //----------------------------------------------
        default:
            return {
                ...state,
            }
    }
}

export default MenuSearchReducer
