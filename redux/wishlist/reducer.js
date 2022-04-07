import actions from './action';
import Cookies from 'js-cookie';

const initState = {
    loading: {
        loadingWishlist: false,
        loadingRelativeProduct: false
    },
    offset: {
        offset: 0,
    },
    limit: {
        limit: 0,
    },
    total: {
        total: 0,
    },
    data: {
        wishlist: [],
        relativeProducts: [],
    },
};

const WishlistReducer = (state = initState, action) => {
    switch (action.type) {
        case actions.LOAD_WISHLIST_SUCCESS:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    loadingWishlist: false,
                },
                data: {
                    ...state.data,
                    wishlist: action.response.wishlist.List,
                    relativeProducts: action.response.relative.List,
                },
                offset: {
                    ...state.offset,
                    offset: action.response.wishlist.Offset,
                },
                limit: {
                    ...state.limit,
                    limit: action.response.wishlist.Limit,
                },
                total: {
                    ...state.total,
                    total: action.response.wishlist.Total,
                },
            };
        case actions.LOADING_WISHLIST:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    loadingWishlist: true,
                },
            };
        //----------------------------------------------
        // REMOVE ITEM WISHLIST 
        //----------------------------------------------
        case actions.REMOVE_ITEM_WISHLIST_SUCCESS:
            {
                const { id } = action
                const index = state.data.wishlistProducts.findIndex(
                    (x) => x.id == id,
                );
                state.data.wishlistProducts.splice(index, 1);
                // Thực hiện lưu cookies
                var cookieData = [...state.data.wishlistProducts].map((e) => {
                    return { id: e.id, slug: e.slug };
                });
                Cookies.set('wishlist', JSON.stringify(cookieData));
            }
            return {
                ...state,
                loading: {
                    ...state.loading,
                    removingWishlist: false,
                },
                data: {
                    ...state.data,
                },
            };
        case actions.REMOVING_ITEM_WISHLIST:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    removingWishlist: true,
                },
            };
        //----------------------------------------------
        // ADD WISHLIST 
        //----------------------------------------------
        case actions.ADDING_WISHLIST:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    addingWishlist: true,
                },
            };
        case actions.ADD_WISHLIST_SUCCESS:
            {
                const { data } = action;
                const index = state.data.wishlistProducts.findIndex(
                    (x) => x.id == data.id,
                );
                if (index == -1) {
                    state.data.wishlistProducts.push(data)
                } else {
                   
                }
                var cookieData = [...state.data.wishlistProducts].map((e) => {
                    return { id: e.id, slug: e.slug };
                });
                Cookies.set('wishlist', JSON.stringify(cookieData));
            }
            return {
                ...state,
                loading: {
                    ...state.loading,
                    addingWishlist: false,
                },
                data: {
                    ...state.data,
                },
            };
        default:
            return {
                ...state,
            };
    }
};

export default WishlistReducer;
