
const PageList = {
    SIGNIN: {
        SERVER: '/dang-nhap',
        DESTINATION: '/sign-in'
    },
    SIGNUP: {
        SERVER: '/dang-ky',
        DESTINATION: '/sign-up'
    },
    ACCOUNT_INFO: {
        SERVER: '/tai-khoan',
        DESTINATION: '/account-info'
    },
    INTRODUCE: {
        SERVER: '/gioi-thieu',
        DESTINATION: '/introduce'
    },
    ITEM: {
        INDEX:'/san-pham/',
        CLIENT:'/san-pham/[slug]',
        SERVER: '/san-pham/:slug',
        DESTINATION: '/item/:slug',
        ROUTE: '/item/[slug]',
        NAME: "ITEM"
    },
    CONTACT: {
        SERVER: '/lien-he',
        DESTINATION: '/contact'
    },
    PRODUCT_LIST: {
        SERVER: '/danh-sach-san-pham',
        DESTINATION: '/product-list'
    },
    PRODUCT_LIST_NEW: {
        SERVER: '/san-pham-moi',
        DESTINATION: '/product-list-new'
    },
    PRODUCT_LIST_TOP: {
        SERVER: '/tim-kiem-hang-dau',
        DESTINATION: '/product-list-top'
    },
    PRODUCT_LIST_TREND: {
        SERVER: '/xu-huong',
        DESTINATION: '/product-list-trend'
    },
    SUPPER_SALE: {
        SERVER: '/sieu-sale',
        DESTINATION: '/product-list-supper-sale'
    },
    CATEGORY: {
        INDEX:'/danh-muc/',
        CLIENT:'/danh-muc/[slug]',
        SERVER: '/danh-muc/:slug',
        DESTINATION: '/category/:slug',
        ROUTE: '/category/[slug]',
        NAME: "CATEGORY"
    },
    ORDER_MANAGEMENT: {
        SERVER: '/tai-khoan/quan-ly-don-hang',
        DESTINATION: '/account/order-management'
    },
    ORDER_MANAGEMENT_SLUG: {
        INDEX: '/tai-khoan/quan-ly-don-hang/',
        CLIENT: '/tai-khoan/quan-ly-don-hang/[slug]',
        SERVER: '/tai-khoan/quan-ly-don-hang/:slug',
        DESTINATION: '/account/order-management/:slug',
        ROUTE: '/account/order-management/[slug]',
        NAME: "ORDER_MANAGEMENT_SLUG"
    },
    WISHLIST: {
        SERVER: '/san-pham-da-thich',
        DESTINATION: '/wishlist'
    },
    WATCHED: {
        SERVER: '/san-pham-da-xem',
        DESTINATION: '/watched'
    },
    MY_REVIEWS: {
        SERVER: '/tai-khoan/danh-gia-cua-toi',
        DESTINATION: '/account/my-reviews'
    },
    MAIL_BOX: {
        SERVER: '/hop-thu',
        DESTINATION: '/mail-box'
    },
    SHOPPING_GUIDE: {
        SERVER: '/huong-dan-mua-hang',
        DESTINATION: '/shopping-guide'
    },
    SIZE_GUIDE: {
        SERVER: '/huong-dan-chon-size',
        DESTINATION: '/size-guide'
    },
    POLICY: {
        SERVER: '/dieu-khoan-va-chinh-sach',
        DESTINATION: '/policy'
    },
    FAQ: {
        SERVER: '/cau-hoi-thuong-gap',
        DESTINATION: '/faq'
    },
    CART: {
        SERVER: '/gio-hang',
        DESTINATION: '/cart'
    },
    ORDER: {
        INDEX:	'/thanh-toan/',
        SERVER: '/thanh-toan',
        DESTINATION: '/order'
    },
    WALLET: {
        SERVER: '/vi-fm',
        DESTINATION: '/wallet'
    },
    BRANCH_LIST: {
        SERVER: '/he-thong-cua-hang',
        DESTINATION: '/branch-list'
    },
    RECRUITMENT: {
        SERVER: '/tuyen-dung',
        DESTINATION: '/recruitment'
    },
    RECRUITMENT_SLUG: {
        INDEX: '/tuyen-dung/',
        CLIENT: '/tuyen-dung/[slug]',
        SERVER: '/tuyen-dung/:slug',
        DESTINATION: '/recruitment/:slug',
        ROUTE: '/recruitment/[slug]',
        NAME: 'RECRUITMENT_SLUG'
    },
    PROMOTION: {
        SERVER: '/khuyen-mai',
        DESTINATION: '/promotion'
    },
    HOUR_GOLD: {
        SERVER: '/gio-vang',
        DESTINATION: '/product-list-golden-hour'
    },
    PROMOTION_SLUG: {
        INDEX: '/khuyen-mai/',
        CLIENT: '/khuyen-mai/[slug]',
        SERVER: '/khuyen-mai/:slug',
        DESTINATION: '/promotion/:slug',
        ROUTE: '/promotion/[slug]',
        NAME: "PROMOTION_SLUG"
    },
    NEWS: {
        SERVER: '/tin-tuc',
        DESTINATION: '/news'
    },
    NEWS_SLUG: {
        INDEX: '/tin-tuc/',
        CLIENT: '/tin-tuc/[slug]',
        SERVER: '/tin-tuc/:slug',
        DESTINATION: '/news/:slug',
        ROUTE: '/news/[slug]',
        NAME: "NEWS_SLUG"
    },
    CATEGORY_MOBILE: {
        INDEX:'/danh-muc-m/',
        CLIENT:'/danh-muc-m/[slug]',
        SERVER: '/danh-muc-m/:slug',
        DESTINATION: '/category-mobile/:slug',
        ROUTE: '/category-mobile/[slug]',
        NAME: "CATEGORY_MOBILE"
    },
    SEARCH: {
        SERVER: '/tim-kiem',
        DESTINATION: '/search'
    },
    TRACKING_ORDER:{
        SERVER:'/don-hang',
        DESTINATION: '/tracking-order'
    },
    ORDER_SUCCESS:{
        SERVER:'/dat-hang-thanh-cong',
        DESTINATION: '/order-success'
    },
    PRODUCT_CARE:{
        SERVER: '/co-the-ban-quan-tam',
        DESTINATION: '/co-the-ban-quan-tam'
    }

}
module.exports = PageList
//  export default PageList