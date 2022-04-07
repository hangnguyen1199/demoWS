import PageList from './PageList'

// ======== DEV ===========
export const BASE_API_URL = 'https://api.fmplustest.xyz/api/1.0'
export const SIGNALR_URL = 'https://api.fmplusdev.xyz'
export const API_KEY = 'PnVdWXApSHQlUiJDey14aFU4TVVROT1aP0tAOVhwSGE'
export const GENDER = {
    Fm: {
        Id: null,
        Tag: 'Fm',
        FilterParams: null,
        Slug: null,
    },
    Male: {
        Id: 1,
        Tag: 'Male',
        FilterParams: 1,
        Slug: 'nam',
    },
    Female: {
        Id: 2,
        Tag: 'Female',
        FilterParams: 2,
        Slug: 'nu',
    },
    Unisex: {
        Id: 3,
        Tag: 'Unisex',
        FilterParams: 3,
    },
    Couple: {
        Id: 4,
        Tag: 'Couple',
        FilterParams: 4,
        Slug: 'do-cap',
    },
    Boy: {
        Id: 5,
        Tag: 'Boy',
        FilterParams: 5,
        Slug: 'con-trai',
    },
    Girls: {
        Id: 6,
        Tag: 'Girls',
        FilterParams: 6,
        Slug: 'con-gai',
    },
    Child: {
        Id: 99,
        Tag: 'Child',
        FilterParams: '5,6',
        Slug: 'tre-em',
        Title: 'Trẻ em',
    },
}
const constants = {
    BASE_API_URL: 'https://api.fmplusdev.xyz/api/1.0',
    LOCAL_HOST: '',
    GENDER_SLUG: {
        nam: 1,
        nu: 2,
        unisex: 3,
        'do-cap': 4,
        'be-trai': 5,
        'be-gai': 6,
        'tre-em': 99,
    },
    GENDER_ID: {
        1: 'nam',
        2: 'nu',
        3: 'unisex',
        4: 'do-cap',
        5: 'be-trai',
        6: 'be-gai',
        99: 'tre-em',
    },
    COLOR: {
        PRIMARY: '#f29d21',
        GRAY: 'whitesmoke',
        BLACK: '#000000',
        WHITE: '#ffffff',
        RED: '#FF2C00',
    },
    TITLE: 'FM Style Shop',
    TIME_RESEND: 60,
    TYPE_SEARCH: {
        PRODUCT_TYPE: {
            PRODUCT_RECENTLY: 1, // Sản phẩm gần đây
            PRODUCT_NEW: 2, // Sản phẩm mới
            PRODUCT_TOP: 3, // Sản phẩm xem nhiều
            PRODUCT_WHISHLIST: 4, // Whishlist
            PRODUCT_TREND: 5, // Trending
            PRODUCT_SEARCH_TOP: 6, // Tìm kiếm hàng đầu
            PRODUCT_CARE: 7, // Có thể bạn quan tâm
        },
        PROMOTION: {
            PROMOTION_GOLDEN_HOUR: 10, // Giờ Vàng
            PROMOTION_SUPPER_SALE: 20, // Siêu sale
        },
    },
    REVIEW: {
        GOOD: 3,
        NORMAL: 2,
        BAD: 1,
    },
    PRODUCT_TYPE: {
        GOLDEN_HOUR: 10,
        NEWEST: 2,
        SUPPER_SALE: 20,
        TREND: 5,
    },
    // TAGTYPE: {
    //     GOLDEN_HOUR: 1, // 1: Giờ vàng
    //     SUPPER_SALE: 2, // 2: Siêu Sale
    //     TOP: 3, // 3: TOP
    //     TREND: 4, // 4: Trending
    //     NEW: 5, // 5: New
    // },
    TAGTYPE: {
        GOLDEN_HOUR: 99, // 1: Giờ vàng
        SUPPER_SALE: 99, // 2: Siêu Sale
        TOP: 99, // 3: TOP
        TREND: 99, // 4: Trending
        NEW: 99, // 5: New
    },
    limitCategory: 9,
    phone: '0974 063 762',
    email: 'cskh@fmstyle.com.vn',
    PAGINATION: {
        LIMIT: 12,
        OFFSET: 0,
    },
    PAGINATION_PRODUCT_LIST: {
        LIMIT: 20,
        OFFSET: 0,
    },
    COLOR_CATEGORY_DEFAULT: 1,
    WINDOW_SIZE: {
        SMALL: 576,
        // MEDIUM: 768,
        MEDIUM: 992,
    },
    TYPE_VIEW_ITEM: {
        GRID: 'GRID',
        LIST: 'LIST',
        LARGER: 'LARGER',
    },
    ALERT: {
        ERROR: 'Xảy ra lỗi, Xin vui lòng thử lại!',
        UPDATE: 'Cập nhật thành công!',
    },
    CONFLICT: {
        NICKNAME: { NAME: 'Nickname đã tồn tại' },
        EMAIL: { NAME: 'Email đã tồn tại' },
        PHONE: { NAME: 'Số điện thoại đã tồn tại' },
    },
    TITLE_TAB: 'FM Style | ',
    EMPTY_CATEGORY_MESS: 'Chưa có dữ liệu',
    TIME_REFRESH_TOKEN: 300000,

    TOAST_TYPE: {
        SUCCESS: 'success',
        WARNING: 'warning',
        ERROR: 'error',
    },
    PLUGIN: {
        RECAPTCHA: {
            SITE_KEY: '6LcQ8accAAAAAOT8Y--wDnSZi88Bmy3hm7XC72oE',
            SECRET_KEY: '6LcQ8accAAAAAGLnjVWATZFS7N7LIYNIKmJfxZid',
        },
    },
    VIEW: {
        hotsale: 'SẢN PHẨM BÁN CHẠY',
        hot: 'GỢI Ý CHO BẠN',
        new: 'SẢN PHẨM MỚI',
        recent: 'SẢN PHẨM GẦN ĐÂY',
    },
    ROW_PER_PAGE: {
        5: { CODE: 5, VALUE: 5 },
        10: { CODE: 10, VALUE: 10 },
        25: { CODE: 25, VALUE: 25 },
        50: { CODE: 50, VALUE: 50 },
        100: { CODE: 100, VALUE: 100 },
    },
    LOAD_MORE_END_TEXT: 'Không còn sản phẩm ',
    CONFIRM_SERVICE: {
        DEFAUTL: 0,
        ONLY_BUTTON_OK: 1,
    },
    DELAY_LOAD_SCRIPT_TIME: 5000,
    NEXT_PUBLIC_GOOGLE_ANALYTICS: '',
    ORDER_STATUS: {
        TEMP: '00', // Đơn hàng tạm
        NEW: '10', // Đơn hàng mới
        CONFIRMED: '20', // Đã xác nhận
        PREPARING: '30', // Đang chuẩn bị
        DELIVERING: '40', // Đang vận chuyển
        DELIVERED: '50', // Đã giao hàng
        CONFIRM_SHIPPED: '60', // Đã xác nhận giao hàng
        REFUNDING: '70', // Đang trả hàng
        RETURNED: '80', // Đã trả hàng
        CONFIRM_REFUNDED: '90', //Đã xác nhận trả hàng
        CLAIMING: '100', // Đang khiếu nại
        CANCEL: '110', // Đã huỷ
        FINISHED: '120', // Đã hoàng thành
    },
    TITLE_POPUPS: {
        name: 'FM Plus',
    },
    SOCIAL_MEDIA: {
        fb: 'https://www.facebook.com/fm.com.vn',
        zalo: 'https://zalo.me/2024745257008896577',
        tiktok: 'https://www.tiktok.com/@fm.com.vn',
        inst: 'https://www.instagram.com/fmstylefashion',
        shopee: 'https://shopee.vn/fmstyle',
        lazada: 'https://www.lazada.vn/shop/fmstyle-shop',
        tiki: 'https://tiki.vn/cua-hang/fm-style-official?',
        FB: {
            FB_APP_ID: '339086867855237',
            FB_PAGE_ID: '100214492559391',
            WHITELIST_MESSENGER_PAGE: ['/san-pham'],
        },
    },
    PARAM_URL: {
        OFFSET: 'o',
        LIMIT: 'l',
        COLOR: 'c',
        SIZE: 's',
        PRICE_FROM: 'p_f',
        PRICE_TO: 'p_t',
        CATEGORY_SLUG: 'cat',
        CATEGORY_NAME: 'cn',
        GENDER_ITEM: 'g',
        HOTTREND: 'h_t',
        BRAND: 'br',
        CATEGORIES: 'cats',
        KEYWORD: 'keyword',
        TYPE_ORDER: 't_o',
        TYPE: 't',
        SHOP: 'shop',
        STAT: 'stat',
        VIEW: 'view',
        BRAND_NAME: 'brand_name',
        DATE_FROM: 'df',
        DATE_TO: 'dt',
        ORDER_TRACKING_STATUS: 'order_tr',
        TAB: 'tab',
        MODE: 'mode',
        SELECTED: 'selected',
        COUNT_FROM: 'cf',
        COUNT_TO: 'ct',
        SALE_COUNT_FROM: 'scf',
        SALE_COUNT_TO: 'sct',
        ITEM_STATUS: 'status',
        ID: 'id',
        COLLECTION: 'collection',
    },
    SEARCH_PRODUCT_TAB: '1',
    SEARCH_NEWS_TAB: '2',
    SEARCH_PROMO_TAB: '3',
    SEARCH_FAQ_TAB: '4',
    VOUCHER_TYPE: {
        MSMH: '1',
        MPVC: '3',
    },
    HISTORY_POINT_TYPE: 2,
    WHITELIST_ANIMATION_TOP: [
        PageList.PRODUCT_LIST.SERVER,
        PageList.PRODUCT_LIST_TOP.SERVER,
        PageList.SUPPER_SALE.SERVER,
        PageList.PRODUCT_LIST_NEW.SERVER,
        PageList.PRODUCT_LIST_TREND.SERVER,
        PageList.NEWS.SERVER,
        PageList.PROMOTION.SERVER,
        // PageList.ITEM.INDEX,
        '/co-the-ban-quan-tam',
        PageList.CATEGORY.SERVER,
    ],
    PAGE_URL: {
        MAY_BE_YOU_CARE: '/co-the-ban-quan-tam',
    },
    V002: {
        VERIFYED: '2',
    },
    TYPE_SUBMIT_FILTER: {
        HANDLE_SUBMIT_GENDER: 1,
        HANDLE_SUBMIT_CATEGORY: 2,
        HANDLE_SUBMIT_SIZE: 3,
    },
    TYPE_SHOW_FILTER_MOBILE: {
        SHOW_CATEGORY: 1,
        SHOW_SIZE: 2,
        SHOW_SORT: 3,
        SHOW_PRICE: 4,
        SHOW_PROMOTION: 5,
        SHOW_GENDER: 6,
    },
    ROUTER_NAME: {
        GENDER: 'g',
        CATEGORY: 'c',
        SIZE: 's',
        SORT_BY_PRICE: 'sort',
        PROMOTION: 'pr',
        COLOR: 'clor',
        PRICE_FROM: 'pf',
        PRICE_TO: 'pt',
        PAGE: 'pg',
        QUERY_TIME: 'time',
        KEYWORD: 'key',
        HOT_CATEGORY:'ch',
        BRANCH_ID:'BranchId',
        TITLE:'Title',
        OFFSET:'Offset'
    },
    TYPE_CATEGORY: {
        CATEGORY_PRODUCT_LIST_CATEGORY: 1,
        CATEGORY_PRODUCT_LIST: 2,
        CATEGORY_PRODUCT_LIST_GENDER: 3,
    },
    
    FAQ: {
        MEMBER_POLICY: {
            ID: '1',
            NAME: 'Quyền lợi thẻ thành viên',
        },
        ORDER_ONLINE: {
            ID: '2',
            NAME: 'Mua hàng online',
        }, PAYMENT: {
            ID: '3',
            NAME: 'Phương thức thanh toán',
        },
        RETURN_POLICY: {
            ID: '4',
            NAME: 'Chính sách bảo hành - đổi - trả hàng',
        },
        ACCOUNT: {
            ID: '5',
            NAME: 'Tài khoản',
        },
       
       
    },

    FILTER_NEWS_TYPE:{
        OTHER: 1
    },
    TYPE_CATEGORY_HOME:{
        Type: 1
    },
    BANNER_POSITION: {
        TOP: 10,
        PROMOTION: 20,
        COLLECTION: 30,
    },
    PAYMENT_METHOD:{
        TRANSFER: 30
    },
    SORT_FILTER:{
        PRICE_DESC:{
            NAME:'Giá cao đến thấp',
            VALUE:'price_desc',
        },
        PRICE_ASC:{
            NAME:'Giá thấp đến cao',
            VALUE:'price_asc',
        }
    }
};


export default constants
