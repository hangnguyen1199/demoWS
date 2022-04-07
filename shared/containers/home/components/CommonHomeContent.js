import dynamic from 'next/dynamic'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Display from '../../../components/common/display'
import PropTypes from 'prop-types';


const ListItems = dynamic(() => import('@spo/components/item/list-items'), {
    ssr: false,
})
const ListLive = dynamic(() => import('@spo/components/item/list-live'), {
    ssr: false,
})
const ListNews = dynamic(() => import('@spo/components/item/list-news-promo'), {
    ssr: false,
})
const BannerSilder = dynamic(
    () => import('@spo/components/home/banner-silder'),
    {
        ssr: false,
    }
)
const HotCategories = dynamic(() => import('./hot-categories'), { ssr: false })
const UpdatedHotCategories = dynamic(() => import('./updated-hot-categories'), {
    ssr: false,
})
import HomeActions from '@spo/redux/home/action'
import constants, { GENDER } from '../../../config/constants'
import ListItemCollection from '../../../components/category/list-item-collection'
import PageList from '../../../config/PageList'
import CenterHelp from '../../../components/spo-layout/footer-center-help';
import FooterMobile from '../../../components/footer/footer-show/footer-show-mobile';

/**
 * ****************************************************************************
 * DUNGNT CommonHomeContent CODE
 * CommonHomeContent.js
 *
 * description		:
 * created at		:	2022-02-15
 * created by		:	DungNT
 * package			:	shared/containers/home/components/CommonHomeContent.js
 * copyright			:	Copyright (c) DungNT
 * version			:	1.0.0
 * ****************************************************************************
 */
const CommonHomeContent = (props) => {
    const {
        Gender,
        GenderText,
        CategoryNumOfRow = 2,
        // loading,
        // data,
        isShowCollection = false,
        isShowNews = true,
        isShowPromotions = false,
        isChild = false,
        isShowBannerPromotion = true,
    } = props
    const SettingMaster = useSelector(
        (state) => state.Common?.data?.settingMaster
    )
    const SettingMasterLoading = useSelector(
        (state) => state.Common?.loading?.loadingSetting
    )
    const Loading = useSelector(
        (state) => state.Common?.loading?.loadingCategory
    )
    const {
        productInHome,
        data: { listPromotion, listNews },
        loading,
    } = useSelector((state) => state.Home)
    const [categoryList, setCategoryList] = useState([])
    const {
        productNewest,
        productTrending,
        productGoldenHour,
        productSuperPromotion,
        productTopViewer,
        productCare,
        productSuggestList = {},
    } = productInHome[GenderText]
    const {
        data: { wishlistProducts },
    } = useSelector((state) => state.Wishlist)
    const [slides, setSlides] = useState([])
    const dispatch = useDispatch()
    useEffect(() => {
        if (Gender == GENDER.Fm.Id) {
            setCategoryList(SettingMaster?.CategoriesInHomePage)
        } else if (Gender == GENDER.Child.Id) {
            setCategoryList(SettingMaster?.CategoriesInHomePageAsChild ?? [])
        } else if (SettingMaster?.CategoriesGender) {
            let genderIndex = SettingMaster?.CategoriesGender?.findIndex(
                (x) => x.GenderId == Gender
            )
            if (genderIndex != -1) {
                setCategoryList(
                    SettingMaster?.CategoriesGender[genderIndex].List
                )
            } else {
                setCategoryList([])
            }
        } else {
            setCategoryList([])
        }
    }, [SettingMaster?.CategoriesGender, SettingMaster?.CategoriesGender])

    useEffect(() => {
        let RootSlide = SettingMaster?.Slides
        if (RootSlide) {
            // let defaultSlides = [...RootSlide]?.filter(
            //     (x) => x.GenderId == null || x.GenderId == 0
            // )
            let _slides = [...RootSlide]?.filter((x) => {
                let arr = x.GenderId.toString().split(',')
                let el = arr.find(
                    (i) => i == Gender || (Gender == null && i == '0')
                )
                return el != null
            })

            setSlides(_slides.length > 0 ? _slides : null)
        }
    }, [SettingMaster?.Slides])

    const fetchData = (isRefresh) => {
        let _gender =
            Gender != GENDER.Child.Id ? Gender : GENDER.Child.FilterParams
        dispatch({
            type: HomeActions.GET_PRODUCT_IN_HOME,
            data: {
                Gender: _gender,
                GenderText: GenderText,
                Type: '2',
                TypeText: 'productNewest',
            },
        })
        dispatch({
            type: HomeActions.GET_PRODUCT_IN_HOME,
            data: {
                Gender: _gender,
                GenderText: GenderText,
                Type: '5',
                TypeText: 'productTrending',
            },
        })
        dispatch({
            type: HomeActions.GET_PRODUCT_IN_HOME,
            data: {
                Gender: _gender,
                GenderText: GenderText,
                Type: constants.TYPE_SEARCH.PRODUCT_TYPE.PRODUCT_CARE,
                TypeText: 'productCare',
                Limit: 10,
                Offset: 0
            },
        })
        dispatch({
            type: HomeActions.GET_PRODUCT_IN_HOME,
            data: {
                Gender: _gender,
                GenderText: GenderText,
                TypeOfPromotion:
                    constants.TYPE_SEARCH.PROMOTION.PROMOTION_GOLDEN_HOUR,
                TypeText: 'productGoldenHour',
            },
        })
        dispatch({
            type: HomeActions.GET_PRODUCT_IN_HOME,
            data: {
                Gender: _gender,
                GenderText: GenderText,
                TypeOfPromotion:
                    constants.TYPE_SEARCH.PROMOTION.PROMOTION_SUPPER_SALE,
                TypeText: 'productSuperPromotion',
            },
        })
        dispatch({
            type: HomeActions.GET_PRODUCT_IN_HOME,
            data: {
                Gender: _gender,
                GenderText: GenderText,
                Type: '6',
                TypeText: 'productTopViewer',
            },
        })
        if (isShowNews) {
            let newsParam = {}
            newsParam.Limit = 4
            newsParam.Offset = 0
            dispatch({
                type: HomeActions.LOAD_NEWS,
                data: { data: newsParam },
            })
        }
        if (isShowPromotions) {
            let promotionParam = {}
            promotionParam.Limit = 3
            promotionParam.Offset = 0
            dispatch({
                type: HomeActions.LOAD_PROMOTION,
                data: { data: promotionParam },
            })
        }
    }

    useEffect(() => {
        fetchData()
    }, [])
    // dummy data
    let itemsLive = []
    let param = {}
    if (props.Gender) {
        param[constants.ROUTER_NAME.GENDER] = props.Gender
    }
    return (
        <div className="col-12 col-lg-12 px-0 px-lg-0 order-2 overflow-hidden home-content">
            <div>
                <div className="wrap_home_top" style={{ background: 'white' }}>
                    <BannerSilder
                        data={slides?.filter(
                            (x) => x.Position == constants.BANNER_POSITION.TOP
                        )}
                        loading={SettingMasterLoading}
                    />
                </div>
                {/* {categoryList?.length > 0 && (
                    <div
                        className={`wrap_list_home home_category_container ${
                            isChild ? 'category_child_container' : ''
                        }`}
                    >
                        <UpdatedHotCategories
                            NumOfRow={CategoryNumOfRow}
                            categoryList={categoryList}
                            categorySubList={
                                SettingMaster?.CategoriesInHomePageAsTopChild ??
                                []
                            }
                            isChild={isChild}
                            title={'MUA THEO THỂ LOẠI'}
                            settings={props.settings}
                            loading={Loading}
                        ></UpdatedHotCategories>
                    </div>
                )} */}
                <div
                    className={`wrap_list_home home_category_container ${
                        isChild ? 'category_child_container' : ''
                    }`}
                >
                    <UpdatedHotCategories
                        NumOfRow={CategoryNumOfRow}
                        categoryList={categoryList}
                        categorySubList={
                            SettingMaster?.CategoriesInHomePageAsTopChild ?? []
                        }
                        isChild={isChild}
                        title={'MUA THEO THỂ LOẠI'}
                        settings={props.settings}
                        loading={Loading}
                    ></UpdatedHotCategories>
                </div>

                <div className="wrap_list_home">
                    <ListItems
                        lazy_offset={0}
                        sectionTitle={'TÌM KIẾM HÀNG ĐẦU'}
                        items={productTopViewer}
                        loading={loading.listSearchTop}
                        isFullWidth={false}
                        wishlist={wishlistProducts}
                        isViewInSlider={true}
                        isBorderTop={false}
                        textColor="#000000"
                        seeAllPath={PageList.PRODUCT_LIST_TOP.SERVER}
                        params={param}
                    />
                </div>
                <div className="wrap_list_home">
                    <ListItems
                        lazy_offset={0}
                        sectionTitle={'Giờ Vàng'}
                        items={productGoldenHour}
                        // loading={loading.loadingGoldenHourProduct}
                        isFullWidth={false}
                        wishlist={wishlistProducts}
                        isViewInSlider={true}
                        isBorderTop={false}
                        isShowCountTime={true}
                        textColor="#000000"
                        seeAllPath={PageList.HOUR_GOLD.SERVER}
                        params={param}
                    />
                </div>
                <div className="wrap_list_home">
                    <ListLive
                        lazy_offset={0}
                        sectionTitle={'FM LIVE'}
                        items={itemsLive}
                        isBorderTop={false}
                        loading={false}
                        textColor="#000000"
                    />
                </div>
                <div className="wrap_list_home">
                    <ListItems
                        lazy_offset={0}
                        sectionTitle={'Siêu sale'}
                        items={productSuperPromotion}
                        // loading={loading.loadingSupperSaleProduct}
                        isFullWidth={false}
                        isBorderTop={false}
                        wishlist={wishlistProducts}
                        isViewInSlider={true}
                        isShowCountTime={true}
                        textColor="#000000"
                        seeAllPath={PageList.SUPPER_SALE.SERVER}
                        className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3 col-xlg-2-5 px-3 _common_col"
                        params={param}
                    />
                </div>
                {isShowPromotions && (
                    <div className="wrap_list_home promotion-home-block no_min_height">
                        <ListNews
                            lazy_offset={0}
                            sectionTitle={'KHUYẾN MÃI'}
                            items={listPromotion}
                            loading={loading.loadingPromotion}
                            isFullWidth={false}
                            isBorderTop={false}
                            textColor="#000000"
                            seeAllPath={PageList.PROMOTION.SERVER}
                            prefix="promotion"
                        />
                    </div>
                )}
                {isShowBannerPromotion && (
                    <div className="wrap_list_home promotion-home-block no_min_height home_block_banner_promotion">
                        <BannerSilder
                            data={slides?.filter(
                                (x) =>
                                    x.Position ==
                                    constants.BANNER_POSITION.PROMOTION
                            )}
                        />
                    </div>
                )}
                <div className="wrap_list_home">
                    <ListItems
                        lazy_offset={0}
                        sectionTitle={'Sản phẩm mới'}
                        items={productNewest}
                        // loading={loading.loadingNewestProduct}
                        isFullWidth={false}
                        isBorderTop={false}
                        isViewInSlider={true}
                        wishlist={wishlistProducts}
                        textColor="#000000"
                        seeAllPath={PageList.PRODUCT_LIST_NEW.SERVER}
                        params={param}
                    />
                </div>
                <div className="wrap_list_home">
                    <ListItems
                        lazy_offset={0}
                        sectionTitle={'Xu hướng'}
                        items={productTrending}
                        // loading={loading.loadingTrendingProduct}
                        isViewInSlider={true}
                        isFullWidth={false}
                        isBorderTop={false}
                        wishlist={wishlistProducts}
                        textColor="#000000"
                        seeAllPath={PageList.PRODUCT_LIST_TREND.SERVER}
                        params={param}
                    />
                </div>
                {isShowNews && (
                    <div className="wrap_list_home no_min_height news-home-block">
                        <ListNews
                            lazy_offset={0}
                            sectionTitle={'TIN TỨC'}
                            items={listNews}
                            loading={loading.loadingNewestProduct}
                            isFullWidth={false}
                            isBorderTop={false}
                            textColor="#000000"
                            seeAllPath={PageList.NEWS.SERVER}
                            prefix="news"
                        />
                    </div>
                )}
                {productTrending.length > 0 && isShowCollection && (
                    // <Display>
                    //     <div className="wrap_list_home list-item-child">
                    //         <div className="header-list-child">
                    //             <p>BỘ SƯU TẬP</p>
                    //         </div>
                    //         <ListItemCollection
                    //             lazy_offset={0}
                    //             sectionTitle={'Xu hướng'}
                    //             items={productTrending}
                    //             loading={loading.loadingTrendingProduct}
                    //             isViewInSlider={true}
                    //             isFullWidth={false}
                    //             isBorderTop={true}
                    //             wishlist={wishlistProducts}
                    //             textColor="#000000"
                    //         />
                    //     </div>
                    // </Display>
                    <div
                        className="wrap_list_home no_min_height news-home-block"
                        style={{ marginTop: 30, marginBottom: 30 }}
                    >
                        <BannerSilder
                            data={slides?.filter(
                                (x) =>
                                    x.Position ==
                                    constants.BANNER_POSITION.COLLECTION
                            )}
                        />
                    </div>
                )}
                <div className="wrap_list_home">
                    <Display>
                        <ListItems
                            lazy_offset={0}
                            sectionTitle={'Bạn có thể quan tâm'}
                            items={productCare}
                            // loading={loading.loadingTrendingProduct}
                            isViewInSlider={false}
                            isFullWidth={false}
                            isBorderTop={false}
                            wishlist={wishlistProducts}
                            textColor="#000000"
                            seeAllPath={PageList.PRODUCT_CARE.SERVER}
                            params={param}
                        />
                    </Display>
                    <Display mobile={true}>
                        <ListItems
                            lazy_offset={0}
                            sectionTitle={'Bạn có thể quan tâm'}
                            items={productCare}
                            // loading={loading.loadingTrendingProduct}
                            isViewInSlider={false}
                            isFullWidth={false}
                            isBorderTop={false}
                            wishlist={wishlistProducts}
                            textColor="#000000"
                            seeAllPath={PageList.PRODUCT_CARE.SERVER}
                            params={param}
                        />
                    </Display>
                </div>
                <Display mobile={true}>
                    <div className="mt-2">
                        <FooterMobile />
                    </div>
                </Display>
            </div>
        </div>
    );
}
CommonHomeContent.propTypes = {
    settings: PropTypes.object,
}
CommonHomeContent.defaultProps = {    
    settings              : {
        infinite      : false,
        dots          : true,
        speed         : 500,
        slidesToShow  : 4,
        slidesToScroll: 2,
        rows          : 2,
        initialSlide  : 0,
    },
};

export default CommonHomeContent
