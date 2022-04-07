import React, { useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PriceFilter from '@spo/components/filter/price-filter';
import AppActions from '@spo/redux/app/action';
import PropTypes from 'prop-types';
import constants from '@spo/config/constants';
import CommonActions from '@spo/redux/common/action';
import Display from '../common/display';
import ButtonLight from '@spo/components/common/button-light';
import ButtonDark from '@spo/components/common/button-dark';
import IconX from '@spo/components/common/icon-x';
import _ from 'lodash';

import { useRouter } from 'next/router';
import Utils from '../../utils/utils';

function HeaderBarFilterMobi(props) {
    const dispatch = useDispatch();
    const typeDisplay = useSelector((state) => state.App.typeDisplay);
    const common = useSelector((state) => state.Common);
    const [showFilterMobile, setShowFilterMobile] = useState(false); 
    const [showFilterMobileType, setShowFilterMobileType] = useState(null);

    const [isShowCategoriesFilter, setIsShowCategoriesFilter] = useState(true);
    const [categoriesState, setCategoriesState] = useState([]);
    const router=useRouter();
    const [filter, setFilter] = useState({
        orderByPrice: '',
        sizeData: common.data.listSize,
        sexData: common.data.listCategory,
        filterSex: props.gender,
        filterCategory: [], 
        filterLocation: [],
        filterSize: [],
        filterPrice: {},
        filterPromotion: [],
        hasFilterData: false
    });
    let paramLoadSize = {};
    let filterWorking = Object.assign({}, filter);
    filterWorking.sizeData = common.data.listSize;
    filterWorking.sexData = common.data.listCategory;
    //----------------------------------------------
    // Effect
    //----------------------------------------------

    const getParentCategoryArr = () => {
        let tmp = []
        if(props.categoryActive && common?.data?.listCategory?.length > 0){
            common?.data?.listCategory.forEach(element => {
                if(element?.ListCategory){
                    element?.ListCategory.forEach(item => {
                        tmp.push(item?.Id);
                    });
                }
            });
        }
        return tmp;
    }
    useEffect(() => {
        // get list category parent
        const parentCategoryArr = getParentCategoryArr();
        //
        if (props.gender) {
            filterWorking.filterSex = props.gender;
        }
        // if props.categoryActive is valid, add it to filter array
        if (props.categoryActive 
            && parentCategoryArr.length > 0 
            && !parentCategoryArr.includes(props.categoryActive) 
            && !filterWorking.filterCategory.includes(props.categoryActive)) {
            filterWorking.filterCategory.push(props.categoryActive);
        }
        setFilter(filterWorking);
        //
        let isShowCate = true;
        // if props.categoryActive is child, not show category in filter option
        if(props.categoryActive && !parentCategoryArr.includes(props.categoryActive)){
            isShowCate = false;
        }
        setIsShowCategoriesFilter(isShowCate);
        setCategoriesState(common.data.listCategories);
        // only show type of category if category is parent category
        if(isShowCate && props.categoryActive){
            const tmpArr = common.data.listCategories.filter(el => el.Slug === props.category);
            setCategoriesState(tmpArr);
        }
    }, [common, props.categoryActive, props.gender]);

    useEffect(() => {
        let p = {};
        if (props.gender) {
            p.Gender = props.gender;
        }
        if (props.categoryActive) {
            p.CategoryId = props.categoryActive;
        }
        dispatch({
            type: CommonActions.LOAD_SIZE,
            data: p,
        });
    }, [props.categoryActive, props.gender]);
    useMemo(() => {
        // clear filter when change category
        filterWorking = {
            orderByPrice: '',
            sizeData: common.data.listSize,
            sexData: common.data.listCategory,
            filterSex: props.gender,
            filterCategory: [],
            filterLocation: [],
            filterSize: [],
            filterPrice: {},
            filterPromotion: [],
        };
        setFilter(filterWorking);

    }, [props.category]);



    // save data filter sau khi push router
    // useEffect(() => {
    //     if (props.dataFilter) {
    //         if (props.dataFilter.Sort) {
    //             setFilter({ ...filter, orderByPrice: props.dataFilter.Sort })
    //         }
    //         if (props.dataFilter.CategoryId && props.categoryActive) {

    //             let data = [];
    //             let dataCategory = [];
    //             dataCategory = props.dataFilter.CategoryId.split(",");
    //             dataCategory.find((v) => {
    //                 if (v !== (props.categoryActive).toString()) {
    //                     data.push(v);
    //                 }
    //             })
    //             setFilter({
    //                 ...filter,
    //                 filterCategory: data
    //             })
    //         }

    //         if (props.dataFilter.SizeId) {
    //             let dataSize = [];
    //             dataSize = props.dataFilter.SizeId.split(",");
    //             console.log({
    //                 ...filter,
    //                 filterSize: dataSize
    //             });
                
    //             // setFilter({
    //             //     ...filter,
    //             //     filterSize: dataSize
    //             // })
    //         }

    //         // if (props.dataFilter.TypeOfPromotion) {
    //         //     let dataTypeOfPromotion = [];
    //         //     dataTypeOfPromotion = props.dataFilter.TypeOfPromotion.split(",");
    //         //     setFilter({
    //         //         ...filter,
    //         //         filterPromotion: dataTypeOfPromotion
    //         //     })
    //         // }
    //         // if (props.dataFilter.PriceFrom || props.dataFilter.PriceTo) {
    //         //     setFilter({
    //         //         ...filter,
    //         //         filterPrice: { startPrice: props.dataFilter.PriceFrom, endPrice: props.dataFilter.PriceTo }

    //         //     })
    //         // }
    //     }
    // }, [props.dataFilter])

    useEffect(() => {
        if (!props.dataFilter) {
            return;
        }

        //
        let providedFilter = { ...filter };

        if (props.dataFilter.Sort) {
            providedFilter.orderByPrice = props.dataFilter.Sort;
        } else {
            providedFilter.orderByPrice = '';
        }

        if (props.dataFilter.Gender) {
            providedFilter.filterSex = props.dataFilter.Gender;
        } else {
            providedFilter.filterSex = '';
        }

        if (props.dataFilter.CategoryId) {
            let data = [];
            let dataCategory = props.dataFilter.CategoryId.split(",");
            //
            if (props?.categoryActive) {
                data = dataCategory.filter(
                    (el) => el !== props.categoryActive.toString()
                );
            } else {
                data = [...dataCategory];
            }
            providedFilter.filterCategory = data;
        } else {
            providedFilter.filterCategory = [];
        }

        if (props.dataFilter.SizeId) {
            providedFilter.filterSize = props.dataFilter.SizeId.split(",");
        } else {
            providedFilter.filterSize = [];
        }

        if (props.dataFilter.TypeOfPromotion) {
            providedFilter.filterPromotion =
            props.dataFilter.TypeOfPromotion.split(",");
        } else {
            providedFilter.filterPromotion = [];
        }

        if (props.dataFilter.PriceFrom || props.dataFilter.PriceTo) {
            providedFilter.filterPrice = {
                startPrice: props.dataFilter.PriceFrom,
                endPrice: props.dataFilter.PriceTo,
            };
        } else {
            providedFilter.filterPrice = {};
        }
        setFilter(providedFilter);
    }, [props.dataFilter, props.categoryActive]);

    function onChangeDisplay(type) {
        dispatch({
            type: AppActions.TOGGLE_CHANGE_TYPE_DISPLAY,
            data: type,
        });
    }

    function refreshFilter() {
        const tmpFilterWorking = {
            orderByPrice: '',
            sizeData: common.data.listSize,
            sexData: common.data.listCategory,
            filterSex: props.gender,
            filterCategory: [],
            filterLocation: [],
            filterSize: [],
            filterPrice: {},
            filterPromotion: [],
        };

        const tmpFilterAPI = {
            orderByPrice: '',
            sizeData: common.data.listSize,
            sexData: common.data.listCategory,
            filterSex: props.gender,
            filterCategory: [],
            filterLocation: [],
            filterSize: [],
            filterPrice: {},
            filterPromotion: [],
        };

        if(props.categoryActive ){
            tmpFilterAPI.filterCategory.push(props.categoryActive);
            const tmpParentCateArr = getParentCategoryArr();
            if(tmpParentCateArr.length > 0
                && !tmpParentCateArr.includes(props.categoryActive)){
                tmpFilterWorking.filterCategory.push(props.categoryActive);
            }
        }
        setFilter(tmpFilterWorking);
        props.onChange(tmpFilterAPI);
        // router.replace(router.pathname, '', { shallow: true });
    }

    function onChangeFilter(param) {
        filterWorking = Object.assign({}, filter);
        const tmpParentCateArr = getParentCategoryArr();
        //
        if (param.orderByPrice) {
            if (param.orderByPrice == 'clear') {
                filterWorking.orderByPrice = '';
                delete router.query.Sort;
            } else {
                filterWorking.orderByPrice = param.orderByPrice;
            }
        }
        if (param.price) {
            filterWorking.filterPrice = param.price;
        }
        if (param.sex) {
            if(props.gender){
                return;
            }

            if (filterWorking.filterSex == param.sex) {
                filterWorking.filterSex = '';
            } else {
                filterWorking.filterSex = param.sex;
                let categories = common.data.listCategory.filter(
                    (c) => c.GenderId == param.sex
                );
                filterWorking.categoryData = categories[0]?.ListCategory;

                // check current child category is in new parent category
                const arrTmp = [];
                filterWorking.categoryData.forEach(cateParent => {
                    if(cateParent?.CategoriesChild?.length === 0){
                        return;
                    }

                    let cateArr = cateParent.CategoriesChild.filter((el) => filterWorking.filterCategory.includes(el.Id));
                    if(cateArr.length > 0 && cateArr[0]?.Id){
                        arrTmp.push(cateArr[0].Id);
                    }
                });
                filterWorking.filterCategory = arrTmp;
            }
            //reset param, reset size
            filterWorking.filterSize = [];
            paramLoadSize = {};
            // call api with new filter
            paramLoadSize.Gender = param.sex;
            if (filterWorking.filterCategory.length > 0) {
                paramLoadSize.CategoryId = filterWorking.filterCategory.join(',');
            }
            dispatch({
                type: CommonActions.LOAD_SIZE,
                data: paramLoadSize,
            });
            dispatch({
                type: CommonActions.LOAD_CATEGORY_MASTER_BY_GENDER,
                data: {
                    Gender: param.sex,
                },
            });
        }
        if (param.size) {
            const index = checkExits(filterWorking.filterSize, param.size);
            if (index > -1) {
                filterWorking.filterSize.splice(index, 1);
                delete router.query.SizeId;
            } else {
                filterWorking.filterSize.push(param.size);
            }
        }
        if (param.category) {
            if(param.category !== props?.categoryActive){
                const index = checkExits(
                    filterWorking.filterCategory,
                    param.category
                );
                if (index > -1) {
                    filterWorking.filterCategory.splice(index, 1);
                    delete router.query.CategoryId;
                } else {
                    filterWorking.filterCategory.push(param.category);
                }
            }
            paramLoadSize = {};
            paramLoadSize.Gender = filterWorking.filterSex;
            if (filterWorking.filterCategory.length > 0) {
                paramLoadSize.CategoryId = filterWorking.filterCategory.join(
                    ','
                );
            } else if(props.categoryActive && tmpParentCateArr.length > 0 
                && tmpParentCateArr.includes(props.categoryActive)){
                paramLoadSize.CategoryId = props.categoryActive;
            }
            dispatch({
                type: CommonActions.LOAD_SIZE,
                data: paramLoadSize,
            });
        }
        if (param.promotion) {
            const index = checkExits(
                filterWorking.filterPromotion,
                param.promotion
            );
            if (index > -1) {
                filterWorking.filterPromotion.splice(index, 1);
                delete router.query.TypeOfPromotion;
            } else {
                filterWorking.filterPromotion.push(param.promotion);
            }
        }
        if (filterWorking.orderByPrice 
            || filterWorking.filterSex 
            || filterWorking.filterCategory.length > 0 
            || filterWorking.filterPrice?.endPrice 
            || filterWorking.filterSex?.length > 0 
            || filterWorking.filterPromotion.length > 0) {
            filterWorking.hasFilterData =  true;
        }
        setFilter(filterWorking);
        //
        const filterAPI = JSON.parse(JSON.stringify(filterWorking))
        if(props.categoryActive && filterAPI?.filterCategory?.length == 0){
            if(tmpParentCateArr.length > 0 
            && tmpParentCateArr.includes(props.categoryActive)){
                filterAPI.filterCategory.push(props.categoryActive);
            }
        }
        props.onChange(filterAPI);
    }
    // id dưới dạng string
    function checkExits(list, id) {
        if (list) {
            if (typeof list[0] === 'number') {
                return list.indexOf(Number.parseInt(id));
            }
            return list.indexOf((id).toString());
        }
    }
    function handleShowFilter(flg) {
        setShowFilterMobile(flg);
    }
    function getGenderName(id) {
        let gender = _.find(common.data.listCategory, function (gender) {
            return gender?.GenderId == id;
        });
        return gender?.GenderName;
    }
    function getSizeName(id) {
        let size = _.find(common.data.listSize, function (size) {
            return size?.Id == id;
        });
        return size?.Name;
    }
    function getCategoryName(id, mainArr = common.data.listCategories) {
        let allChild = [];
        mainArr.forEach(chil => {
            allChild = allChild.concat(chil.CategoriesChild);
        });
        let cate = _.find(allChild, function (c) {
            return c?.Id == id;
        });
        return cate?.Name;
    }
    function showFilterMobileWithType(index) {
        if (index != showFilterMobileType) {
            setShowFilterMobileType(index);
        } else {
            setShowFilterMobileType(null);
        }
    }
    return (
        <div className='d-flex flex-column'>
            <div className={`d-flex align-items-start justify-content-between header-bar-filter ${props?.className}`}>
                <Display>
                    <div className="filter-header-bar d-flex align-items-center">
                        {props.isShowFilter && (
                            <div className="d-flex justify-content-start item">
                                {props.isShowSortByPrice && (
                                    <div className="border-right pointer">
                                        <div className="filter-sort filter-sort-by-price ">
                                            <div className="menu-name d-flex">
                                                Sắp xếp theo
                                                <div className="filter-icon-arrow-down px-3"></div>
                                            </div>
                                            <div className="d-flex flex-column menu-sort menu-sort-by-price boxShadow">
                                                <div
                                                    className="pt-4 pb-2 sort-by-price-item-filter"
                                                    onClick={(e) =>
                                                        onChangeFilter({
                                                            orderByPrice: 'price_desc',
                                                        })
                                                    }>
                                                    <div
                                                        className={`link-hover text-left ${filter.orderByPrice ==
                                                            'price_desc'
                                                            ? 'active'
                                                            : ''
                                                        }`}>
                                                        Giá từ cao đến thấp
                                                    </div>
                                                </div>
                                                <div
                                                    className="pb-4 sort-by-price-item-filter "
                                                    onClick={(e) =>
                                                        onChangeFilter({
                                                            orderByPrice: 'price_asc',
                                                        })
                                                    }>
                                                    <div
                                                        className={`link-hover text-left ${filter.orderByPrice ==
                                                            'price_asc'
                                                            ? 'active'
                                                            : ''
                                                        }`}>
                                                        Giá từ thấp đến cao
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {props.isShowSortSex && (
                                    <div className="pointer">
                                        <div className="filter-sort filter-sort-by-sex  ">
                                            <div className="menu-name d-flex">
                                                Giới tính
                                                <div className="filter-icon-arrow-down px-3"></div>
                                            </div>
                                            <div className="menu-sort menu-sort-by-sex boxShadow d-flex">
                                                {common.data?.listCategory?.map(
                                                    (sex, index) => (
                                                        <div
                                                            key={index}
                                                            className="pr-4 sex-item-filter d-center"
                                                            onClick={(e) =>
                                                                onChangeFilter({
                                                                    sex: sex.GenderId,
                                                                })
                                                            }>
                                                            <div
                                                                className={`link-hover text-center ${filter.filterSex ==
                                                                    sex.GenderId
                                                                    ? 'active'
                                                                    : ''
                                                                }`}>
                                                                {sex.GenderName}
                                                            </div>
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {props.isShowSortCategory && isShowCategoriesFilter && (
                                    <div className=" pointer">
                                        <div className="filter-sort filter-sort-by-categories">
                                            <div className="menu-name d-flex">
                                                Danh mục
                                                <div className="filter-icon-arrow-down px-3"></div>
                                            </div>
                                            <div className="menu-sort menu-sort-by-categories boxShadow">
                                                <div
                                                    className="d-flex item-sub-group flex-wrap"
                                                    style={{ paddingBottom: 20 }}>
                                                    {categoriesState.map(
                                                        (childGroup, indexGroup) => (
                                                            <div
                                                                key={indexGroup}
                                                                className="group"
                                                                style={{
                                                                    minWidth: 145,
                                                                    marginBottom:10
                                                                }}>
                                                                <span
                                                                    className="fontsize16"
                                                                    style={{
                                                                        color:
                                                                            '#333333',
                                                                    }}>
                                                                    {childGroup.Name}
                                                                </span>
                                                                <ul
                                                                    className="item-sub category-item-filter"
                                                                    style={{
                                                                        marginRight: 60,
                                                                    }}>
                                                                    {childGroup.CategoriesChild.map(
                                                                        (
                                                                            sub,
                                                                            indexSub
                                                                        ) => (
                                                                            <li
                                                                                key={
                                                                                    indexSub
                                                                                }
                                                                                style={{
                                                                                    paddingTop:
                                                                                        indexSub ==
                                                                                            0
                                                                                            ? 20
                                                                                            : 15,
                                                                                }}
                                                                                onClick={(
                                                                                    e
                                                                                ) =>
                                                                                    onChangeFilter(
                                                                                        {
                                                                                            category:
                                                                                                sub.Id,
                                                                                        }
                                                                                    )
                                                                                }>
                                                                                <div
                                                                                    className={`text-left link-hover ${checkExits(
                                                                                        filter.filterCategory,
                                                                                        sub.Id
                                                                                    ) >
                                                                                        -1
                                                                                        ? 'active'
                                                                                        : ''
                                                                                    }`}>
                                                                                    {
                                                                                        sub.Name
                                                                                    }
                                                                                </div>
                                                                            </li>
                                                                        )
                                                                    )}
                                                                </ul>
                                                            </div>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {props.isShowSortSize && (
                                    <div className=" pointer">
                                        <div className="filter-sort filter-sort-by-size">
                                            <div className="menu-name d-flex">
                                                Size
                                                <div className="filter-icon-arrow-down px-3"></div>
                                            </div>
                                            <div className="d-flex flex-row menu-sort menu-sort-by-size boxShadow">
                                                {common?.data?.listSize.map((size, index) => (
                                                    <div
                                                        key={size.Id}
                                                        className="pr-4 size-item d-center"
                                                        onClick={(e) =>
                                                            onChangeFilter({
                                                                size: size.Id,
                                                            })
                                                        }>
                                                        <div
                                                            className={`link-hover text-center ${checkExits(
                                                                filter.filterSize,
                                                                size.Id
                                                            ) > -1
                                                                ? 'active'
                                                                : ''
                                                            }`}>
                                                            {size.Name}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {props.isShowSortPrice && (
                                    <div className=" pointer">
                                        <div className="filter-sort filter-sort-by-price-slider">
                                            <div className="menu-name d-flex">  
                                                Giá
                                                <div className="filter-icon-arrow-down px-3"></div>
                                            </div>
                                            <div className="d-start menu-sort menu-sort-by-price-slider boxShadow">
                                                <PriceFilter
                                                    min={0}
                                                    max={1000000}
                                                    onChange={(e) =>
                                                        onChangeFilter({ price: e })
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {props.isShowSortPromotion && (
                                    <div className=" pointer">
                                        <div className="filter-sort filter-sort-by-size">
                                            <div className="menu-name d-flex">
                                                Khuyến mãi
                                                <div className="filter-icon-arrow-down px-3"></div>
                                            </div>
                                            <div className="d-flex flex-row menu-sort menu-sort-by-size boxShadow">
                                                <div
                                                    className="pr-4 size-item d-center"
                                                    onClick={(e) =>
                                                        onChangeFilter({
                                                            promotion:
                                                                constants.TYPE_SEARCH
                                                                    .PROMOTION
                                                                    .PROMOTION_GOLDEN_HOUR,
                                                        })
                                                    }>
                                                    <div
                                                        className={`link-hover text-center ${checkExits(
                                                            filter.filterPromotion,
                                                            constants.TYPE_SEARCH
                                                                .PROMOTION
                                                                .PROMOTION_GOLDEN_HOUR
                                                        ) > -1
                                                            ? 'active'
                                                            : ''
                                                        }`}>
                                                        Giờ vàng
                                                    </div>
                                                </div>
                                                <div
                                                    className="pr-4 size-item d-center"
                                                    onClick={(e) =>
                                                        onChangeFilter({
                                                            promotion:
                                                                constants.TYPE_SEARCH
                                                                    .PROMOTION
                                                                    .PROMOTION_SUPPER_SALE,
                                                        })
                                                    }>
                                                    <div
                                                        className={`link-hover text-center ${checkExits(
                                                            filter.filterPromotion,
                                                            constants.TYPE_SEARCH
                                                                .PROMOTION
                                                                .PROMOTION_SUPPER_SALE
                                                        ) > -1
                                                            ? 'active'
                                                            : ''
                                                        }`}>
                                                        Siêu sale
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </Display>
                <Display mobile={true}>
                    {props.isShowFilter && (
                        <div style={{paddingLeft:"15px"}} className=''>
                            <div className='d-center' style={{ width: '60vw', height: 35, border: "1px solid #707070" }}>
                                <div
                                    className="w-100 d-center"
                                    onClick={() => handleShowFilter(true)}
                                >
                                    {filter.hasFilterData && (<img src='/images/icon/tick-black.svg' style={{width: 11, marginRight: 4}}/>)}Bộ lọc
                                </div>
                            </div>
                            {showFilterMobile && (
                                <div className={`custom-modal-filter-header-bar`}>
                                    <div className="modal__inner-header-bar">
                                        <div className="modal__header">
                                            <span className='w-100 text-center title'>Bộ lọc</span>
                                            <span style={{position: 'absolute', right: 30}} onClick={() => handleShowFilter()}>
                                                <IconX fontSize={30} color={"#707070"} />
                                            </span>
                                        </div>
                                        <div className="modal__content">
                                            <div className="filter-header-bar d-flex align-items-start">
                                                <div className="d-flex flex-column item">
                                                    {props.isShowSortByPrice && (
                                                        <div className="pointer">
                                                            <div className="filter-sort filter-sort-by-price ">
                                                                <div className="menu-name d-flex" onClick={() => showFilterMobileWithType(1)}>
                                                                    <span className='d-start'>
                                                                        {filter.orderByPrice && (<div className='filter-dot'></div>)}
                                                                         Sắp xếp theo
                                                                    </span>
                                                                    <div className="filter-icon-arrow-down px-3"></div>
                                                                </div>
                                                                {showFilterMobileType == 1 && (
                                                                    <div className="menu-sort menu-sort-by-price">
                                                                        <div
                                                                            className="sort-by-price-item-filter d-start"
                                                                            onClick={(e) =>
                                                                                onChangeFilter({
                                                                                    orderByPrice: 'price_desc',
                                                                                })
                                                                            }>
                                                                            <div
                                                                                className={`d-start link-hover text-left ${filter.orderByPrice ==
                                                                                    'price_desc'
                                                                                    ? 'active'
                                                                                    : ''
                                                                                }`}>
                                                                                Giá từ cao đến thấp
                                                                            </div>
                                                                        </div>
                                                                        <div
                                                                            className="sort-by-price-item-filter d-start"
                                                                            onClick={(e) =>
                                                                                onChangeFilter({
                                                                                    orderByPrice: 'price_asc',
                                                                                })
                                                                            }>
                                                                            <div
                                                                                className={`d-start link-hover text-left ${filter.orderByPrice ==
                                                                                    'price_asc'
                                                                                    ? 'active'
                                                                                    : ''
                                                                                }`}>
                                                                                Giá từ thấp đến cao
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    )}
                                                    {props.isShowSortSex && (
                                                        <div className="pointer">
                                                            <div className="filter-sort filter-sort-by-sex">
                                                                <div className="menu-name d-flex" onClick={() => showFilterMobileWithType(2)}>
                                                                    <span className='d-start'>
                                                                        {filter.filterSex && (<div className='filter-dot'></div>)}
                                                                        Giới tính
                                                                    </span>
                                                                    <div className="filter-icon-arrow-down px-3"></div>
                                                                </div>
                                                                {showFilterMobileType == 2 && (
                                                                    <div className="menu-sort menu-sort-by-sex">
                                                                        {common.data?.listCategory?.map(
                                                                            (sex, index) => (
                                                                                <div
                                                                                    key={index}
                                                                                    className="sex-item-filter d-start"
                                                                                    onClick={(e) =>
                                                                                        onChangeFilter({
                                                                                            sex: sex.GenderId,
                                                                                        })
                                                                                    }>
                                                                                    <div
                                                                                        className={`d-start link-hover ${filter.filterSex ==
                                                                                            sex.GenderId
                                                                                            ? 'active'
                                                                                            : ''
                                                                                        }`}>
                                                                                        {sex.GenderName}
                                                                                    </div>
                                                                                </div>
                                                                            )
                                                                        )}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    )}
                                                    {props.isShowSortCategory && isShowCategoriesFilter && (
                                                        <div className="pointer">
                                                            <div className="filter-sort filter-sort-by-categories">
                                                                <div className="menu-name d-flex" onClick={() => showFilterMobileWithType(3)}>
                                                                    <span className='d-start'>
                                                                        {filter.filterCategory.length > 0 && (<div className='filter-dot'></div>)}
                                                                        Danh mục
                                                                    </span>
                                                                    <div className="filter-icon-arrow-down px-3"></div>
                                                                </div>
                                                                {showFilterMobileType == 3 && (
                                                                    <div className="menu-sort menu-sort-by-categories">
                                                                        <div
                                                                            className="d-flex item-sub-group"
                                                                        >
                                                                            {categoriesState.map(
                                                                                (childGroup, indexGroup) => (
                                                                                    <div
                                                                                        key={indexGroup}
                                                                                        className="group"
                                                                                        style={{
                                                                                            minWidth: 145,
                                                                                        }}>
                                                                                        <span
                                                                                            className="fontsize16"
                                                                                            style={{
                                                                                                color:
                                                                                                    '#333333',
                                                                                            }}>
                                                                                            {childGroup.Name}
                                                                                        </span>
                                                                                        <ul className="item-sub category-item-filter">
                                                                                            {childGroup.CategoriesChild.map(
                                                                                                (
                                                                                                    sub,
                                                                                                    indexSub
                                                                                                ) => (
                                                                                                    <li
                                                                                                        className='d-start'
                                                                                                        key={
                                                                                                            indexSub
                                                                                                        }
                                                                                                        style={{height: 37}}
                                                                                                        onClick={(
                                                                                                            e
                                                                                                        ) =>
                                                                                                            onChangeFilter(
                                                                                                                {
                                                                                                                    category:
                                                                                                                        sub.Id,
                                                                                                                }
                                                                                                            )
                                                                                                        }>
                                                                                                        <div
                                                                                                            className={`d-start text-left link-hover ${checkExits(
                                                                                                                filter.filterCategory,
                                                                                                                sub.Id
                                                                                                            ) >
                                                                                                                -1
                                                                                                                ? 'active'
                                                                                                                : ''
                                                                                                            }`}>
                                                                                                            {
                                                                                                                sub.Name
                                                                                                            }
                                                                                                        </div>
                                                                                                    </li>
                                                                                                )
                                                                                            )}
                                                                                        </ul>
                                                                                    </div>
                                                                                )
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    )}
                                                    {props.isShowSortSize && (
                                                        <div className="pointer">
                                                            <div className="filter-sort filter-sort-by-size">
                                                                <div className="menu-name d-flex" onClick={() => showFilterMobileWithType(4)}>
                                                                    <span className='d-start'>
                                                                        {filter.filterSize.length > 0 && (<div className='filter-dot'></div>)}
                                                                        Size
                                                                    </span>
                                                                    <div className="filter-icon-arrow-down px-3"></div>
                                                                </div>
                                                                {showFilterMobileType == 4 && (
                                                                    <div className="menu-sort menu-sort-by-size">
                                                                        {common?.data?.listSize.map((size, index) => (
                                                                            <div
                                                                                key={size.Id}
                                                                                className="size-item d-start"
                                                                                onClick={(e) =>
                                                                                    onChangeFilter({
                                                                                        size: size.Id,
                                                                                    })
                                                                                }>
                                                                                <div
                                                                                    className={`d-start link-hover ${checkExits(
                                                                                        filter.filterSize,
                                                                                        size.Id
                                                                                    ) > -1
                                                                                        ? 'active'
                                                                                        : ''
                                                                                    }`}>
                                                                                    {size.Name}
                                                                                </div>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    )}
                                                    {props.isShowSortPrice && (
                                                        <div className=" pointer">
                                                            <div className="filter-sort filter-sort-by-price-slider">
                                                                <div className="menu-name d-flex" onClick={() => showFilterMobileWithType(5)}>
                                                                    <span className='d-start'>
                                                                        {filter.filterPrice?.endPrice && (<div className='filter-dot'></div>)}
                                                                        Giá
                                                                    </span>
                                                                    <div className="filter-icon-arrow-down px-3"></div>
                                                                </div>
                                                                {showFilterMobileType == 5 && (
                                                                    <div className="menu-sort menu-sort-by-price-slider">
                                                                        <PriceFilter
                                                                            min={0}
                                                                            max={1000000}
                                                                            onChange={(e) =>
                                                                                onChangeFilter({ price: e })
                                                                            }
                                                                        />
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    )}
                                                    {props.isShowSortPromotion && (
                                                        <div className=" pointer">
                                                            <div className="filter-sort filter-sort-by-size">
                                                                <div className="menu-name d-flex" onClick={() => showFilterMobileWithType(6)}>
                                                                    <span className='d-start'>
                                                                        {filter.filterPromotion.length > 0 && (<div className='filter-dot'></div>)}
                                                                        Khuyến mãi
                                                                    </span>
                                                                    <div className="filter-icon-arrow-down px-3"></div>
                                                                </div>
                                                                {showFilterMobileType == 6 && (
                                                                    <div className="menu-sort menu-sort-by-size">
                                                                        <div
                                                                            className="size-item"
                                                                            onClick={(e) =>
                                                                                onChangeFilter({
                                                                                    promotion:
                                                                                    constants.TYPE_SEARCH
                                                                                        .PROMOTION
                                                                                        .PROMOTION_GOLDEN_HOUR,
                                                                                })
                                                                            }>
                                                                            <div
                                                                                className={`link-hover ${checkExits(
                                                                                    filter.filterPromotion,
                                                                                    constants.TYPE_SEARCH
                                                                                        .PROMOTION
                                                                                        .PROMOTION_GOLDEN_HOUR
                                                                                ) > -1
                                                                                    ? 'active'
                                                                                    : ''
                                                                                }`}>
                                                                            Giờ vàng
                                                                            </div>
                                                                        </div>
                                                                        <div
                                                                            className="size-item"
                                                                            onClick={(e) =>
                                                                                onChangeFilter({
                                                                                    promotion:
                                                                                    constants.TYPE_SEARCH
                                                                                        .PROMOTION
                                                                                        .PROMOTION_SUPPER_SALE,
                                                                                })
                                                                            }>
                                                                            <div
                                                                                className={`link-hover ${checkExits(
                                                                                    filter.filterPromotion,
                                                                                    constants.TYPE_SEARCH
                                                                                        .PROMOTION
                                                                                        .PROMOTION_SUPPER_SALE
                                                                                ) > -1
                                                                                    ? 'active'
                                                                                    : ''
                                                                                }`}>
                                                                            Siêu sale
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>

                                            </div>
                                            <div className='d-flex filter-mobile-button'>
                                                <div className='d-center' style={{ width: 165, height: 37, border: "1px solid #333333", marginRight: 15, borderRadius: 4 }}>
                                                    <ButtonLight
                                                        className="w-100"
                                                        onClick={() => handleShowFilter(false)}
                                                        title={'Áp dụng'}
                                                    />
                                                </div>
                                                <div style={{ width: 165, height: 39 }}>
                                                    <ButtonDark
                                                        className="w-100"
                                                        onClick={() => refreshFilter()}
                                                        title={'Thiết lập lại'}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </Display>
                <div className="change-display-list-item pointer d-flex">
                    <img
                        className={`${typeDisplay === 5 ? 'active' : ''
                        } hover-color-svg`}
                        src="/images/icon/display-list.svg"
                        onClick={() => onChangeDisplay(5)}
                    />
                    <img
                        className={`${typeDisplay === 3 ? 'active' : ''
                        } pl-3 hover-color-svg`}
                        src="/images/icon/display-gird.svg"
                        onClick={() => onChangeDisplay(3)}
                    />
                </div>
            </div>
            <Display>
                <div className='row mx-0 pd-lr-common'>
                    <div className='col-8 px-0'>
                        <div className='d-flex flex-wrap'>
                            {filter.orderByPrice && (<div className='tag-filter d-flex justify-content-between align-items-center'>
                                {filter.orderByPrice == 'price_desc' ? (
                                    <span>
                                        Giá từ cao đến thấp
                                    </span>
                                ) : (
                                    <span>
                                        Giá từ thấp đến cao
                                    </span>
                                )}
                                <span style={{ paddingLeft: 15, cursor: 'pointer' }} onClick={(e) => onChangeFilter({ orderByPrice: 'clear', }) }>
                                    <IconX fontSize={18} color={"#707070"} />
                                </span>
                            </div>)}
                            {filter.filterSex && (<div className='tag-filter d-flex justify-content-between align-items-center'>
                                <span>
                                    {getGenderName(filter.filterSex)}
                                </span>
                                <span style={{ paddingLeft: 15, cursor: 'pointer' }} onClick={(e) => onChangeFilter({ sex: filter.filterSex, }) }>
                                    <IconX fontSize={18} color={"#707070"} />
                                </span>
                            </div>)}
                            {filter.filterCategory?.map((item, index) => {
                                return (
                                    <div key={index} className='tag-filter d-flex justify-content-between align-items-center'>
                                        <span>
                                            {getCategoryName(item)}
                                        </span>
                                        <span style={{ paddingLeft: 15, cursor: 'pointer' }} onClick={( e ) => onChangeFilter( { category: item, } ) }>
                                            <IconX fontSize={18} color={"#707070"} />
                                        </span>
                                    </div>
                                );
                            })}
                            {filter.filterSize?.map((item, index) => {
                                return (
                                    <div key={index} className='tag-filter d-flex justify-content-between align-items-center'>
                                        <span>
                                            {getSizeName(item)}
                                        </span>
                                        <span style={{ paddingLeft: 15, cursor: 'pointer' }} onClick={(e) => onChangeFilter({ size: item, }) }>
                                            <IconX fontSize={18} color={"#707070"} />
                                        </span>
                                    </div>
                                );
                            })}
                            {(filter.filterPrice.endPrice && !(filter.filterPrice?.startPrice == 0 && filter.filterPrice.endPrice == 1000000)) && (
                                <div className='tag-filter d-flex justify-content-between align-items-center'>
                                    <span>
                                        {`${filter.filterPrice.startPrice  } - ${  filter.filterPrice.endPrice}`}
                                    </span>
                                    <span style={{ paddingLeft: 15, cursor: 'pointer' }} onClick={(e) => onChangeFilter({ price: {startPrice: 0, endPrice: 1000000} }) }>
                                        <IconX fontSize={18} color={"#707070"} />
                                    </span>
                                </div>
                            )}
                            {filter.filterPromotion?.map((item, index) => {
                                return (
                                    <div key={index} className='tag-filter d-flex justify-content-between align-items-center'>
                                        { item == 10 ? (
                                            <>
                                                <span>
                                                    Giờ vàng
                                                </span>
                                                <span style={{ paddingLeft: 15, cursor: 'pointer' }} 
                                                    onClick={(e) => onChangeFilter({ promotion: constants.TYPE_SEARCH.PROMOTION.PROMOTION_GOLDEN_HOUR, }) }>
                                                    <IconX fontSize={18} color={"#707070"} />
                                                </span>
                                            </>
                                        ) : (
                                            <>
                                                <span>
                                                    Siêu sale
                                                </span>
                                                <span style={{ paddingLeft: 15, cursor: 'pointer' }} 
                                                    onClick={(e) => onChangeFilter({ promotion: constants.TYPE_SEARCH.PROMOTION.PROMOTION_SUPPER_SALE, }) }>
                                                    <IconX fontSize={18} color={"#707070"} />
                                                </span>
                                            </>
                                        )
                                        }

                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className='col-4 px-0 d-flex justify-content-end'>
                        <div>
                            <div onClick={refreshFilter} className='tag-filter d-flex justify-content-between align-items-center' style={{width: 140, background: "#F2F2F2", marginRight: 0}}>
                                <span style={{lineHeight: "17px"}}>
                                    Thiết lập lại
                                </span>
                                <span style={{ paddingLeft: 15, cursor: 'pointer' }} >
                                    <IconX fontSize={18} color={"#707070"} />
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </Display>
        </div>
    );
}
HeaderBarFilterMobi.propTypes = {
    isShowFilter: PropTypes.bool,
    isShowSortByPrice: PropTypes.bool,
    isShowSortSex: PropTypes.bool,
    isShowSortCategory: PropTypes.bool,
    isShowSortLocation: PropTypes.bool,
    isShowSortSize: PropTypes.bool,
    isShowSortPrice: PropTypes.bool,
    isShowSortPromotion: PropTypes.bool,
    categoryActive: PropTypes.number,
};

HeaderBarFilterMobi.defaultProps = {
    isShowFilter: true,
    isShowSortByPrice: true,
    isShowSortSex: true,
    isShowSortCategory: true,
    isShowSortLocation: true,
    isShowSortSize: true,
    isShowSortPrice: true,
    isShowSortPromotion: true,
    categoryActive: 0,
};
export default HeaderBarFilterMobi;
