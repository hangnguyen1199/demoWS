import React, { useState, useEffect } from 'react'
import IconChevronDown from '@spo/components/common/icon-chevron-down';
import IconCheck from '../../common/icon-check';
import IconGender from '../../common/icon-gender';
import ButtonLight from './../../common/button-light';
import ButtonRed from '../../common/button-red';
import IconFilterCategory from '../../common/icon-filter-category';
import checkExits from './help';
import constants from '@spo/config/constants';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import CommonActions from '@spo/redux/common/action';

function CategoryFilter(props) {
    const {
        totalFilter = 0,
        handleOpenModalOverlay,
        openModal = false } = props;
    const router = useRouter();
    const { typeCategory } = props;
    const dispatch = useDispatch();
    const common = useSelector((state) => state.Common);
    const [categoryList, setCategoryList] = useState([]);
    const [categoryListFake, setCategoryListFake] = useState([]);
    const [isShowCategoriesFilter, setIsShowCategoriesFilter] = useState(true);
    const [categoriesState, setCategoriesState] = useState([]);
    const getParentCategoryArr = () => {
        let tmp = []
        if (props.categoryActive && common?.data?.listCategory?.length > 0) {
            common?.data?.listCategory.forEach(element => {
                if (element?.ListCategory) {
                    element?.ListCategory.forEach(item => {
                        tmp.push(item?.Id);
                    });
                }
            });
        }
        return tmp;
    }

    useEffect(() => {
        if (router.query[constants.ROUTER_NAME.CATEGORY]) {
            let categoryRouter = router.query[constants.ROUTER_NAME.CATEGORY];
            let indexCheck = common.data.listCategoryMasterAll.find(v => v.Id == categoryRouter.split(',')[0]);
            // if (index == -1) {
            //   setCategoryList(categoryRouter.split(','))
            //   setCategoryListFake(categoryRouter.split(','))
            // }
            if (indexCheck && indexCheck?.ParentId) {
                setCategoryList(categoryRouter.split(','))
                setCategoryListFake(categoryRouter.split(','))
            } else {
                setCategoryList([])
                setCategoryListFake([])
            }
        } else {
            setCategoryList([])
            setCategoryListFake([])
        }
    }, [router.query[constants.ROUTER_NAME.CATEGORY], common.data.listCategoryMasterAll])

    useEffect(() => {
        if (router.query[constants.ROUTER_NAME.CATEGORY]) {

            if (typeCategory == constants.TYPE_CATEGORY.CATEGORY_PRODUCT_LIST_CATEGORY) {
                let categoryRouter = router.query[constants.ROUTER_NAME.CATEGORY].split(',');
                const parentCategoryArr = getParentCategoryArr();
                let isShowCate = true;
                if (categoryRouter.length > 0 && !parentCategoryArr.includes(categoryRouter[0])) {
                    isShowCate = false;
                }
                setIsShowCategoriesFilter(isShowCate);

                const index = common.data.listCategoryMasterAll.find(v => v.Id == categoryRouter[0]);
                if (index?.ParentId) {
                    const tmpArr = common.data.listCategories.filter(el => {
                        return el.Id == index?.ParentId
                    });
                    setCategoriesState(tmpArr);
                } else {
                    const tmpArr = common.data.listCategories.filter(el => {
                        return el.Id == index?.Id
                    });
                    setCategoriesState(tmpArr);
                }
            }
            if (typeCategory == constants.TYPE_CATEGORY.CATEGORY_PRODUCT_LIST) {
                setCategoriesState(common.data.listCategories);
            }
        }
        if (typeCategory == constants.TYPE_CATEGORY.CATEGORY_PRODUCT_LIST) {
            setCategoriesState(common.data.listCategories);
        }
    }, [router.query[constants.ROUTER_NAME.CATEGORY], common, typeCategory])

    useEffect(() => {
        if ((typeCategory == constants.TYPE_CATEGORY.CATEGORY_PRODUCT_LIST_CATEGORY ||
      typeCategory == constants.TYPE_CATEGORY.CATEGORY_PRODUCT_LIST_GENDER)
      && !router.query[constants.ROUTER_NAME.CATEGORY]) {
            setCategoriesState(common.data.listCategories);
        }
    }, [router.query, common, typeCategory])

    useEffect(() => {
        dispatch({
            type: CommonActions.LOAD_CATEGORY_MASTER_BY_GENDER,
            data: { Gender: router.query[constants.ROUTER_NAME.GENDER] },
        });
    }, [router.query[constants.ROUTER_NAME.GENDER]])
    const handleSubmit = () => {
        let arrayCategoryFake = [...categoryListFake];
        let routerParams = { ...router.query };
        routerParams[constants.ROUTER_NAME.PAGE] = 1;
        delete routerParams[constants.ROUTER_NAME.SIZE]
        delete routerParams[constants.ROUTER_NAME.PRICE_FROM]
        delete routerParams[constants.ROUTER_NAME.PRICE_TO]
        delete routerParams[constants.ROUTER_NAME.PROMOTION]
        delete routerParams[constants.ROUTER_NAME.SORT_BY_PRICE]
        if (arrayCategoryFake.length > 0) {
            routerParams[constants.ROUTER_NAME.CATEGORY] = arrayCategoryFake.join(",");
        }
        else {
            let categoryRouter = routerParams[constants.ROUTER_NAME.CATEGORY];

            let cate = common.data.listCategoryMasterAll.find(v => v.Id == categoryRouter.split(',')[0]);
            routerParams[constants.ROUTER_NAME.CATEGORY] = cate?.ParentId;
        }
        router.push({
            query: {
                ...routerParams
            }
        })

        dispatch({
            type: CommonActions.LOAD_SIZE,
            data: routerParams[constants.ROUTER_NAME.CATEGORY]
        });
    }
    const handleFilterCategory = (e) => {
        let arrayCategory = [...categoryListFake];
        let dataNew = [];
        if (arrayCategory.length > 0) {
            arrayCategory.map(val => {
                let indexCheck = common.data.listCategories.findIndex(v => v.Id == val);
                if (indexCheck == -1) {
                    dataNew.push(val);
                }
                return dataNew;
            })

            let index = dataNew.findIndex(v => v == e);
            if (index > -1) {
                dataNew.splice(index, 1);
            } else {
                dataNew.push(e);
            }
        } else {
            dataNew.push(e);
        }

        setCategoryListFake(dataNew)
    }
    function checkExitsArray(list, id) {
        if (list) {
            let index = list.findIndex(v => v == id);
            if (index !== -1) {
                return true;
            }
            return false;
        }
    }


    const handleRemoveAll = () => {
        let params = {}
        if (router.query[constants.ROUTER_NAME.CATEGORY]) {
            if (props.typeCategory == constants.TYPE_CATEGORY.CATEGORY_PRODUCT_LIST_CATEGORY) {
                let cate = common.data.listCategoryMasterAll.find(v => v.Id == router.query[constants.ROUTER_NAME.CATEGORY]?.split(',')[0]);
                delete router.query[constants.ROUTER_NAME.CATEGORY]
                if (cate?.ParentId) {
                    params[constants.ROUTER_NAME.CATEGORY] = cate?.ParentId;
                } else {
                    params[constants.ROUTER_NAME.CATEGORY] = cate?.Id;
                }
            }
            if (router.query[constants.ROUTER_NAME.GENDER]) {
                params[constants.ROUTER_NAME.GENDER] = router.query[constants.ROUTER_NAME.GENDER];
            }
            params[constants.ROUTER_NAME.PAGE] = 1;
            router.replace({
                query: params
            })
        }

    }
    return (
        <>
            <div className='d-flex flex-row mr-4 pointer align-items-center category-filter-option'>
                <span
                    onClick={() =>
                        handleOpenModalOverlay(constants.TYPE_SUBMIT_FILTER.HANDLE_SUBMIT_CATEGORY)}
                    className='m-0 icon-filter-category'>
                    <IconFilterCategory className="d-flex align-items-center " />
                </span>
                <p onClick={() =>
                    handleOpenModalOverlay(constants.TYPE_SUBMIT_FILTER.HANDLE_SUBMIT_CATEGORY)}
                className='mx-2 m-0 name-category-left'>
          Danh Mục ({totalFilter})
                </p>
                <span
                    onClick={() =>
                        handleOpenModalOverlay(constants.TYPE_SUBMIT_FILTER.HANDLE_SUBMIT_CATEGORY)}
                    className='m-0 icon-filter-row'><IconChevronDown /></span>
                <div className={`menu-item-sub panel-hover-menu 
        ${openModal == constants.TYPE_SUBMIT_FILTER.HANDLE_SUBMIT_CATEGORY ? 'show-modal' : ''} 
        cursor-pointer-default`}>
                    <div className='menu-item-sub-wap border-top mt-4'>
                        <div className='w-100 d-flex flex-column pt-4'>
                            <div className='menu-modal-row'>
                                {categoriesState.map(
                                    (childGroup, indexGroup) => (
                                        <div key={indexGroup} className='column-menu-modal'>
                                            <p className='menu-name'>{childGroup.Name}</p>

                                            <div style={{
                                                width: childGroup.CategoriesChild.length > 20 ?
                                                    400 :
                                                    common?.data?.listSize.length > 5 ?
                                                        200 :
                                                        200
                                            }}
                                            className='flex-column-warp'>
                                                {childGroup.CategoriesChild.map(
                                                    (
                                                        sub,
                                                        indexSub
                                                    ) => (

                                                        <div onClick={() =>
                                                            handleFilterCategory(sub.Id)} key={indexSub}
                                                        className='d-flex flex-row align-items-center menu-modal-column-item '>
                                                            <span className="icon-check-left">
                                                                {checkExitsArray(
                                                                    categoryListFake,
                                                                    sub.Id
                                                                )
                                                                    ? <>
                                                                        <IconCheck />
                                                                    </>
                                                                    : null
                                                                }
                                                            </span>
                                                            <p className={`fontsize16 menu-name-item ${checkExitsArray(
                                                                categoryListFake,
                                                                sub.Id
                                                            )
                                                                ? 'active'
                                                                : ''
                                                            }`}>{
                                                                    sub.Name
                                                                }</p>
                                                        </div>
                                                    )
                                                )}

                                            </div>
                                        </div>
                                    )
                                )}


                            </div>
                            <div className='menu-modal-button'>
                                <ButtonLight onClick={() => {
                                    handleRemoveAll()
                                    handleOpenModalOverlay(null)
                                }} className="btn-remove-option" title="Xoá tất cả" />
                                <ButtonRed onClick={() => {
                                    handleSubmit()
                                    handleOpenModalOverlay(null)
                                }} className="btn-add-option" title="Áp dụng" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


CategoryFilter.propTypes = {
    handleRemoveAll: PropTypes.func,
    totalFilter: PropTypes.number,
    typeCategory: PropTypes.number
}

export default CategoryFilter;