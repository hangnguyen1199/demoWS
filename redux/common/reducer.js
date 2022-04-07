import actions from './action';

const initState = {
    loading: {
        loadingMethodVerify: false,
        loadingUnitShipment: false,
        loadingShipStatus: false,
        loadingPaymentSTT: false,
        loadingItemType: false,
        loadingGender: false,
        loadingCategory: false, // HAIDT
        loadingSetting: false, // HAIDT
        loadingHottrend: false,
        loaddingImressedShop: false,
        loadingCollection: false,
        loadingTopBrand: false,
        loadingAddressType: false,
        loadingListBrand: false,
        loadingColor: false,
        loadingSize: false,
        loadingCountry: false,
        loadingCity: false,
        loadingDistrict: false,
        loadingWard: false,
        loadingBanking: false,
        loadingBranch: false,
        loadingColorFilter: false,
        loadingSizeFilter: false,
        loadingSlide: false,
        loadingRankConfig: false,
        loadingShoppingGuide: false,
    },
    data: {
        listMethodVerify: [],
        listUnitShipment: [],
        listShipStatus: [],
        listPaymentSTT: [],
        listItemType: [],
        listGender: [],
        listCategory: [], //HaiDT
        settingMaster: [], //HaiDT
        brandMaster: [],
        listHottrend: [],
        listImpressedShop: [],
        listCollection: [],
        listTopBrand: [],
        listBrand: [],
        listBrandAlphabet: [],
        listAddressType: [],
        listColor: [],
        listSize: [],
        listCountry: [],
        listCity: [],
        listDistrict: [],
        listWard: [],
        listBanking: [],
        listBranch: [],
        Banner: {},
        listCategories: [], // DungNT
        listRankConfig: [],
        listSizeMaster: [], // DungNT add
        listCategoryMasterAll: [], // DungNT add
        listReturnReason: [], // DungNT add
        shoppingGuide: {}, // DungVS add
    },
    GenderMaster: [
        {
            Name: 'Nam',
            Value: 'M',
        },
        {
            Name: 'Nữ',
            Value: 'F',
        },
        {
            Name: 'Khác',
            Value: 'S',
        },
    ],
    RelationMaster: [
        { Value: '1', Name: 'Bố ' },
        { Value: '2', Name: 'Mẹ' },
        { Value: '3', Name: 'Vợ' },
        { Value: '4', Name: 'Chồng' },
        { Value: '5', Name: 'Con' },
        { Value: '6', Name: 'Anh/Chị/Em ruột' },
    ],
    YesNo2Master: [
        { Value: 1, Name: 'Chưa bao giờ' },
        { Value: 2, Name: 'Đã từng' },
    ],
    SocialMaster: [
        { Value: 1, Name: 'fm.com.vn' },
        { Value: 2, Name: 'Mạng xã hội' },
        { Value: 3, Name: 'Ứng dụng FM Plus' },
        { Value: 4, Name: 'Bạn bè giới thiệu' },
        { Value: 5, Name: 'Trang tuyển dụng' },
        { Value: 6, Name: 'Khác' },
    ],
    MaritalStatusMaster: [
        { Value: 1, Name: 'Độc thân' },
        { Value: 2, Name: 'Đã kết hôn' },
        { Value: 3, Name: 'Đã ly hôn' },
    ],
    YesNoMaster: [
        { Value: 1, Name: 'Có' },
        { Value: 0, Name: 'Không' },
    ],
    TypeTrainingMaster: [
        { Value: 1, Name: 'Chính quy' },
        { Value: 2, Name: 'Vừa học vừa làm' },
        { Value: 3, Name: 'Từ xa' },
    ],
    DegreeOfTypeMaster: [
        { Value: 1, Name: 'Xuất sắc' },
        { Value: 2, Name: 'Giỏi' },
        { Value: 3, Name: 'Khá' },
        { Value: 4, Name: 'Trung bình' },
    ],
    DegreeMaster: [
        { Value: 1, Name: 'Bằng cấp' },
        { Value: 2, Name: 'Chứng chỉ' },
    ],
    LanguageMaster: [
        { Value: 1, Name: 'Tiếng Anh' },
        { Value: 2, Name: 'Tiếng Trung' },
        { Value: 2, Name: 'Tiếng Nhật' },
        { Value: 2, Name: 'Tiếng Hàn' },
        { Value: 2, Name: 'Ngoại ngữ khác' },
    ],
    ReviewType: [
        { Value: 1, Name: 'Tốt' },
        { Value: 2, Name: 'Khá' },
        { Value: 3, Name: 'Trung bình' },
    ],
};

const ShopRegisterReducer = (state = initState, action) => {
    switch (action.type) {
        // ---------------------------------------------
        // RANK CONFIG HAiDT
        //----------------------------------------------
        case actions.LOAD_RANK_CONFIG_MASTER_SUCCESS:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    loadingRankConfig: false,
                },
                data: {
                    ...state.data,
                    listRankConfig: action.items,
                },
            };
        case actions.LOADING_RANK_CONFIG_MASTER:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    loadingRankConfig: true,
                },
            };
            // ---------------------------------------------
            // SETTING HAiDT
            //----------------------------------------------
        case actions.LOAD_SETTING_MASTER_SUCCESS:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    loadingSetting: false,
                },
                data: {
                    ...state.data,
                    settingMaster: action.items,
                },
            };
        case actions.LOADING_SETTING_MASTER:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    loadingSetting: true,
                },
            };
            //----------------------------------------------
            // CATEGORY HAiDT
            //----------------------------------------------
        case actions.LOAD_CATEGORY_MASTER_BY_GENDER_SUCCESS:
            return {
                ...state,
                data: {
                    ...state.data,
                    listCategories: action.items,
                },
            };
        case actions.LOAD_CATEGORY_MASTER_SUCCESS:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    loadingCategory: false,
                },
                data: {
                    ...state.data,
                    listCategory: action.items,
                },
            };
        case actions.LOADING_CATEGORY_MASTER:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    loadingCategory: true,
                },
            };
        case actions.LOADING_METHOD_VERIFY:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    loadingMethodVerify: true,
                },
            };
            // shipments
        case actions.LOAD_UNIT_SHIPMENT_SUCCESS:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    loadingUnitShipment: false,
                },
                data: {
                    ...state.data,
                    listUnitShipment: action.items,
                },
            };
        case actions.LOADING_UNIT_SHIPMENT:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    loadingUnitShipment: true,
                },
            };
            // ship status
        case actions.LOAD_SHIP_STATUS_SUCCESS:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    loadingShipStatus: false,
                },
                data: {
                    ...state.data,
                    listShipStatus: action.items,
                },
            };
        case actions.LOADING_SHIP_STATUS:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    loadingShipStatus: true,
                },
            };
            // payment status
        case actions.LOAD_PAYMENT_STT_SUCCESS:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    loadingPaymentSTT: false,
                },
                data: {
                    ...state.data,
                    listPaymentSTT: action.items,
                },
            };
        case actions.LOADING_PAYMENT_STT:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    loadingPaymentSTT: true,
                },
            };
            // item type
        case actions.LOAD_ITEM_TYPE_SUCCESS:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    loadingItemType: false,
                },
                data: {
                    ...state.data,
                    listItemType: action.items,
                },
            };
        case actions.LOADING_ITEM_TYPE:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    loadingItemType: true,
                },
            };
            // genders
        case actions.LOAD_GENDER_SUCCESS:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    loadingGender: false,
                },
                data: {
                    ...state.data,
                    listGender: action.items,
                },
            };
        case actions.LOADING_GENDER:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    loadingGender: true,
                },
            };
            //----------------------------------------------
            // BRAND MASTER
            //----------------------------------------------
        case actions.LOAD_BRAND_MASTER_FULL_SUCCESS:
            return {
                ...state,
                data: {
                    ...state.data,
                    brandMaster: action.data,
                },
            };
            //----------------------------------------------
            // LOAD HOTTREND
            //----------------------------------------------
        case actions.LOAD_HOTTREND_SUCCESS:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    loadingHottrend: false,
                },
                data: {
                    ...state.data,
                    listHottrend: action.data,
                },
            };
        case actions.LOADING_HOTTREND:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    loadingHottrend: true,
                },
            };
        case actions.LOAD_HOTTREND_FAILURE:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    loadingHottrend: false,
                },
            };
            //----------------------------------------------
            // IMPRESSED SHOP
            //----------------------------------------------
        case actions.LOAD_IMPRESS_SHOP_SUCCESS:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    loaddingImressedShop: false,
                },
                data: {
                    ...state.data,
                    listImpressedShop: action.data,
                },
            };
        case actions.LOADING_IMPRESS_SHOP:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    loaddingImressedShop: true,
                },
            };
        case actions.LOAD_IMPRESS_SHOP_FAILURE:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    loaddingImressedShop: false,
                },
            };
            //----------------------------------------------
            // COLLECTION
            //----------------------------------------------
        case actions.LOAD_COLLECTION_SUCCESS:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    loadingCollection: false,
                },
                data: {
                    ...state.data,
                    listCollection: action.data,
                },
            };
        case actions.LOADING_COLLECTION:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    loadingCollection: true,
                },
            };
        case actions.LOAD_COLLECTION_FAILURE:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    loadingCollection: false,
                },
            };
            //----------------------------------------------
            // HOT BRAND
            //----------------------------------------------
        case actions.LOAD_TOP_BRAND_SUCCESS:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    loadingTopBrand: false,
                },
                data: {
                    ...state.data,
                    listTopBrand: action.data,
                },
            };
        case actions.LOADING_TOP_BRAND:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    loadingTopBrand: true,
                },
            };
        case actions.LOAD_TOP_BRAND_FAILURE:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    loadingTopBrand: false,
                },
            };
            //----------------------------------------------
            // LOAD SPO BRAND
            //----------------------------------------------
        case actions.LOAD_SPO_BRAND_SUCCESS:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    loadingListBrand: false,
                },
                data: {
                    ...state.data,
                    listBrand: action.data.listBrand,
                    listBrandAlphabet: action.data.listAlphabet,
                },
            };
        case actions.LOADING_SPO_BRAND:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    loadingListBrand: true,
                },
            };
        case actions.LOAD_SPO_BRAND_FAILURE:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    loadingListBrand: false,
                },
            };
            //----------------------------------------------
            // LOAD COLOR
            //----------------------------------------------
        case actions.LOAD_COLOR_SUCCESS:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    loadingColor: false,
                },
                data: {
                    ...state.data,
                    listColor: action.data,
                },
            };
        case actions.LOADING_COLOR:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    loadingColor: true,
                },
            };
        case actions.LOAD_COLOR_FAILURE:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    loadingColor: false,
                },
            };
            //----------------------------------------------
            // LOAD SIZE
            //----------------------------------------------
        case actions.LOAD_SIZE_SUCCESS:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    loadingSize: false,
                },
                data: {
                    ...state.data,
                    listSize: action.data,
                },
            };
        case actions.LOADING_SIZE:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    loadingSize: true,
                },
            };
        case actions.LOAD_SIZE_FAILURE:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    loadingSize: false,
                },
            };
            //----------------------------------------------
            // LOAD SIZE FILTER
            //----------------------------------------------
        case actions.LOAD_SIZE_FILTER_SUCCESS:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    loadingSizeFilter: false,
                },
                data: {
                    ...state.data,
                    listSize: action.data,
                },
            };
        case actions.LOADING_SIZE_FILTER:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    loadingSizeFilter: true,
                },
            };
        case actions.LOAD_SIZE_FILTER_FAILURE:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    loadingSizeFilter: false,
                },
            };
            //----------------------------------------------
            // LOAD COLOR FILTER
            //----------------------------------------------
        case actions.LOAD_COLOR_FILTER_SUCCESS:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    loadingColorFilter: false,
                },
                data: {
                    ...state.data,
                    listColor: action.data,
                },
            };
        case actions.LOADING_COLOR_FILTER:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    loadingColorFilter: true,
                },
            };
        case actions.LOAD_COLOR_FILTER_FAILURE:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    loadingColorFilter: false,
                },
            };
            //----------------------------------------------
            // BANKING
            //----------------------------------------------
        case actions.LOAD_BANKING_MASTER_SUCCESS:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    loadingBanking: false,
                },
                data: {
                    ...state.data,
                    listBanking: action.items,
                },
            };
        case actions.LOADING_BANKING_MASTER:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    loadingBanking: true,
                },
            };
            //----------------------------------------------
            // BRANCH BANKING
            //----------------------------------------------
        case actions.LOAD_BRANCH_MASTER_SUCCESS:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    loadingBranch: false,
                },
                data: {
                    ...state.data,
                    listBranch: [...action.items],
                },
            };
            //----------------------------------------------
            // SLIDE
            //----------------------------------------------
        case actions.LOAD_SLIDE_SUCCESS:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    loadingSlide: false,
                },
                data: {
                    ...state.data,
                    Banner: action.payload,
                },
            };
        case actions.LOADING_SLIDE:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    loadingSlide: true,
                },
            };
        case actions.LOAD_SIZE_MASTER_SUCCESS:
            return {
                ...state,
                data: {
                    ...state.data,
                    listSizeMaster: action.data,
                },
            };
        case actions.LOAD_CATEGORY_MASTER_ALL_SUCCESS:
            return {
                ...state,
                data: {
                    ...state.data,
                    listCategoryMasterAll: action.data,
                },
            };
            //----------------------------------------------
            // RETURN REASON
            //----------------------------------------------
        case actions.LOAD_RETURN_REASON_SETTING_SUCCESS:
            return {
                ...state,
                data: {
                    ...state.data,
                    listReturnReason: [...action.data],
                },
            };
            //-----------------------------------------------
            // SHOPPING GUIDE
            //-----------------------------------------------
        case actions.LOAD_SHOPPING_GUIDE_SUCCESS:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    loadingShoppingGuide: false,
                },
                data: {
                    ...state.data,
                    shoppingGuide: action.data,
                },
            };
        case actions.LOADING_SHOPPING_GUIDE:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    loadingShoppingGuide: true,
                },
            };
        case actions.LOAD_SHOPPING_GUIDE_FAILURE:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    loadingShoppingGuide: false,
                },
            };
        default:
            return {
                ...state,
            };
    }
};

export default ShopRegisterReducer;
