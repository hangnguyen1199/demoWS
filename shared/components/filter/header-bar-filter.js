/* eslint-disable key-spacing */
import React, { useEffect, useRef, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import CommonActions from '@spo/redux/common/action';
import Display from '../common/display';
import GenderFilter from './component-header-bar/gender-filter';
import CategoryFilter from './component-header-bar/category-filter';
import $ from 'jquery'
import SizePromotionFilter from './component-header-bar/size-promotion-filter';
import RenderBreadCrumb from './component-header-bar/render-breadCrumb';
import IconRowLeftFill from './../common/icon-row-left-fill';
import RenderDataFilter from './component-header-bar/render-data-filter';
import { scrollToRef } from './../../library/helper';
import IconArrowRightFill from './../common/icon-row-right-fill';
import { useRouter } from 'next/router';
import constants from '@spo/config/constants';
import HeaderFilterMobile from './component-header-bar/filter-mobile';
import GenderFilterChild from './component-header-bar/gender-fillter-child';

function HeaderBar(props) {
    const ref = useRef(null);
    const common = useSelector(state => state.Common);
    const ref_hidden = useRef(null);
    const router = useRouter();
    const { typeCategory } = props;
    const [openModalOverlay, setOpenModalOverlay] = useState(null);
    const [totalFilter, setTotalFilter] = useState({
        totalGender: 0,
        totalCategory: 0,
        totalSize: 0
    });
    const dispatch = useDispatch();
    useEffect(() => {
        if (openModalOverlay) {
            $('html').addClass('overlay-hidden-filter');
        } else {
            $('html').removeClass('overlay-hidden-filter');
        }
        return () => {
            $('html').removeClass('overlay-hidden-filter');
        }
    }, [openModalOverlay])

    useEffect(() => {

        let params = {};
        if (router.query[constants.ROUTER_NAME.GENDER]) {
            params['Gender'] = router.query[constants.ROUTER_NAME.GENDER];
        }
        if (router.query[constants.ROUTER_NAME.CATEGORY]) {
            params['CategoryId'] = router.query[constants.ROUTER_NAME.CATEGORY];
        }
        dispatch({
            type: CommonActions.LOAD_SIZE,
            data: params
        });
    }, [router.query[constants.ROUTER_NAME.CATEGORY], router.query[constants.ROUTER_NAME.GENDER]])

    const handleRemoveAll = () => {
        let params = {}
        if (props.typeCategory == constants.TYPE_CATEGORY.CATEGORY_PRODUCT_LIST_CATEGORY) {
            let cate = common.data.listCategoryMasterAll.find(v => v.Id == router.query[constants.ROUTER_NAME.CATEGORY].split(',')[0]);
            delete router.query[constants.ROUTER_NAME.CATEGORY]
            params[constants.ROUTER_NAME.GENDER] = router.query[constants.ROUTER_NAME.GENDER];
            if (cate?.ParentId) {
                params[constants.ROUTER_NAME.CATEGORY] = cate?.ParentId;
            } else {
                params[constants.ROUTER_NAME.CATEGORY] = cate?.Id;
            }

        }
        params[constants.ROUTER_NAME.PAGE] = 1;
        if(router.query[constants.ROUTER_NAME.HOT_CATEGORY]){
            params[constants.ROUTER_NAME.HOT_CATEGORY]= constants.TYPE_CATEGORY_HOME['Type'];
        }
        router.replace({
            query: params
        })
    }

    const handleOpenModalOverlay = (e) => {
        if (openModalOverlay == e) {
            setOpenModalOverlay(null)
        } else {
            setOpenModalOverlay(e)
        }
    }

    const checkShowDataFilter = () => {
        let cate = common.data.listCategoryMasterAll.find(v => v.Id == router.query[constants.ROUTER_NAME.CATEGORY].split(',')[0]);
        if (cate?.ParentId) {
            return true;
        } else {
            return false;
        }
    }

    useMemo(() => {
        let countGender = 0;
        let countCategory = 0;
        let countSize = 0;
        let countPrice = 0;
        let countByOrder = 0;
        let countPromotion = 0;
        if (router.query[constants.ROUTER_NAME.GENDER]) {
            countGender += 1;
        } else {
            countGender = 0;
        }
        if (router.query[constants.ROUTER_NAME.CATEGORY]) {
            let arrayCategory = router.query[constants.ROUTER_NAME.CATEGORY].split(',');
            let dataNew = [];
            if (arrayCategory) {
                arrayCategory.map(val => {
                    let indexCheck = common.data.listCategoryMasterAll.find(v => v.Id == val);

                    if(indexCheck && indexCheck?.ParentId){
                        dataNew.push(val);
                    }
                    return dataNew;
                })
            }

            countCategory = dataNew.length;
        } else {
            countCategory = 0;
        }

        if (router.query[constants.ROUTER_NAME.SIZE]) {
            countSize = router.query[constants.ROUTER_NAME.SIZE].split(',').length
        } else {
            countSize = 0;
        }

        if (router.query[constants.ROUTER_NAME.PRICE_FROM] || router.query[constants.ROUTER_NAME.PRICE_TO]) {
            countPrice = 1;
        } else {
            countPrice = 0;
        }

        if (router.query[constants.ROUTER_NAME.SORT_BY_PRICE]) {
            countByOrder = 1;
        } else {
            countByOrder = 0;
        }

        if (router.query[constants.ROUTER_NAME.PROMOTION]) {
            countPromotion = router.query[constants.ROUTER_NAME.PROMOTION].split(',').length;
        } else {
            countPromotion = 0;
        }

        setTotalFilter({
            ...totalFilter,
            totalGender: countGender,
            totalCategory: countCategory,
            totalSize: countSize + countPrice + countByOrder + countPromotion

        })
    }, [router.query,common.data.listCategoryMasterAll])
    return (
        <>
            <Display>
                <div style={{ position: 'relative' }} className='d-flex flex-row'>
                    <div className='d-flex flex-row w-100 justify-content-between align-items-center pt-4 change-display-list-item-margin'>
                        <RenderBreadCrumb
                            breadcrumbPage={props.breadcrum ? [props.breadcrum] : null}
                            typeCategory={typeCategory}
                            handleCloseModal={handleOpenModalOverlay}
                        />
                        {
                            (router.query[constants.ROUTER_NAME.CATEGORY] &&
                router.query[constants.ROUTER_NAME.CATEGORY].split(',').length > 0
                && checkShowDataFilter()) ||
                router.query[constants.ROUTER_NAME.PRICE_FROM] ||
                router.query[constants.ROUTER_NAME.PRICE_TO] ||
                (router.query[constants.ROUTER_NAME.PROMOTION] && router.query[constants.ROUTER_NAME.PROMOTION].split(',').length > 0) ||
                (router.query[constants.ROUTER_NAME.SIZE] && router.query[constants.ROUTER_NAME.SIZE].split(',').length > 0) ||
                router.query[constants.ROUTER_NAME.SORT_BY_PRICE]
                                ?
                                <>
                                    <div className='filter-show-item filter-show-item-display'>
                                        <span onClick={() => scrollToRef(-400, ref)}>
                                            <IconRowLeftFill />
                                        </span>
                                        <div style={{ overflow: 'hidden' }} className='w-100 px-3'>

                                            <div ref={ref} className='w-100 px-1 d-flex flex-row align-items-start filter-show-item-scroll'>
                                                <RenderDataFilter
                                                    typeCategory={typeCategory}
                                                />
                                            </div>

                                        </div>
                                        <span onClick={() => scrollToRef(400, ref)}>
                                            <IconArrowRightFill fontSize={14} />
                                        </span>
                                        <ul onClick={handleRemoveAll} className='text-rename'>Xoá tất cả</ul>
                                    </div>
                                </>
                                :
                                <></>
                        }
                        <div style={{ zIndex: 3 }} className='d-flex flex-row'>
                            <div className=' change-category-filter-option d-flex flex-row'>
                                {/* Check show gender from container page and check gender not router params*/}
                                { (router.query[constants.ROUTER_NAME.HOT_CATEGORY] == constants.TYPE_CATEGORY_HOME['Type'] ? true : ( props.isShowSortSex && !router.query[constants.ROUTER_NAME.GENDER]) ) && (
                                    <>
                                        <GenderFilter
                                            totalFilter={totalFilter.totalGender}
                                            handleOpenModalOverlay={handleOpenModalOverlay}
                                            openModal={openModalOverlay}
                                        />
                                    </>
                                )}
                                { props.typeCategory == constants.TYPE_CATEGORY.CATEGORY_PRODUCT_LIST_CATEGORY &&
                                !router.query[constants.ROUTER_NAME.HOT_CATEGORY] == constants.TYPE_CATEGORY_HOME['Type'] &&
                                 ( router.query[constants.ROUTER_NAME.GENDER] == constants.GENDER_SLUG['be-trai'] ||
                                  router.query[constants.ROUTER_NAME.GENDER] == constants.GENDER_SLUG['be-gai'] ) && (
                                    <>
                                        <GenderFilterChild
                                            totalFilter={totalFilter.totalGender}
                                            handleOpenModalOverlay={handleOpenModalOverlay}
                                            openModal={openModalOverlay}
                                        />
                                    </>
                                )}
                                {props.isShowSortCategory && (
                                    <CategoryFilter
                                        totalFilter={totalFilter.totalCategory}
                                        handleOpenModalOverlay={handleOpenModalOverlay}
                                        openModal={openModalOverlay}
                                        typeCategory={typeCategory}
                                    />
                                )}
                                <SizePromotionFilter
                                    handleOpenModalOverlay={handleOpenModalOverlay}
                                    openModalOverlay={openModalOverlay}
                                    typeCategory={typeCategory}
                                    isShowSortSize={props.isShowSortSize}
                                    isShowSortByPrice={props.isShowSortByPrice}
                                    isShowSortPromotion={props.isShowSortPromotion}
                                    totalFilter={totalFilter.totalSize}
                                />
                            </div>
                        </div>
                        {openModalOverlay && <div onClick={() => {
                            setOpenModalOverlay(null)
                        }} style={{ display: 'block', zIndex: 2, pointerEvents: 'fill' }} className='_overlay_filter'>
                        </div>}
                    </div>

                </div>
            </Display>
            <Display>
                <div className='filter-display-2 change-display-list-item'>
                    {
                        (router.query[constants.ROUTER_NAME.CATEGORY] &&
              router.query[constants.ROUTER_NAME.CATEGORY].split(',').length > 0
              && checkShowDataFilter()) ||
              router.query[constants.ROUTER_NAME.PRICE_FROM] ||
              router.query[constants.ROUTER_NAME.PRICE_TO] ||
              (router.query[constants.ROUTER_NAME.PROMOTION] && router.query[constants.ROUTER_NAME.PROMOTION].split(',').length > 0) ||
              (router.query[constants.ROUTER_NAME.SIZE] && router.query[constants.ROUTER_NAME.SIZE].split(',').length > 0) ||
              router.query[constants.ROUTER_NAME.SORT_BY_PRICE]
                            ?
                            <>
                                <div className='filter-show-item'>
                                    <span onClick={() => scrollToRef(-400, ref_hidden)}>
                                        <IconRowLeftFill />
                                    </span>
                                    <div style={{ overflow: 'hidden' }} className='w-100 px-3'>

                                        <div ref={ref_hidden} className='w-100 px-1 d-flex flex-row align-items-start filter-show-item-scroll'>
                                            <RenderDataFilter
                                                typeCategory={typeCategory}
                                            />
                                        </div>
                                    </div>
                                    <span onClick={() => scrollToRef(400, ref_hidden)}>
                                        <IconArrowRightFill fontSize={14} />
                                    </span>
                                    <ul onClick={handleRemoveAll} className='text-rename ml-0'>Xoá tất cả</ul>
                                </div>
                            </>
                            :
                            <></>
                    }
                </div>
            </Display>
            <HeaderFilterMobile
                isShowSortSize={props.isShowSortSize}
                isShowSortByPrice={props.isShowSortByPrice}
                isShowSortPromotion={props.isShowSortPromotion}
                isShowSortCategory={props.isShowSortCategory}
                isShowSortSex={props.isShowSortSex}
                typeCategory={props.typeCategory}
                isShowSortPrice={props.isShowSortPrice}
                isShowFilter={props.isShowFilter}
                totalFilter={totalFilter}
            />
        </>
    );
}
HeaderBar.propTypes = {
    isShowFilter: PropTypes.bool,
    isShowSortByPrice: PropTypes.bool,
    isShowSortSex: PropTypes.bool,
    isShowSortCategory: PropTypes.bool,
    isShowSortLocation: PropTypes.bool,
    isShowSortSize: PropTypes.bool,
    isShowSortPrice: PropTypes.bool,
    isShowSortPromotion: PropTypes.bool,
    categoryActive: PropTypes.number,
    isShowCategoryFilter: PropTypes.bool,
    typeCategory: PropTypes.number
};

HeaderBar.defaultProps = {
    isShowFilter: true,
    isShowSortByPrice: true,
    isShowSortSex: true,
    isShowSortCategory: true,
    isShowSortLocation: true,
    isShowSortSize: true,
    isShowSortPrice: true,
    isShowSortPromotion: true,
    categoryActive: 0,
    isShowCategoryFilter: true,
    typeCategory: 1
};
export default HeaderBar;