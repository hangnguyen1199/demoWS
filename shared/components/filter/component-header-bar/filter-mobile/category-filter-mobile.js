import React, { useState, useEffect } from 'react'
import FooterFilterMobile from './footer-filter-mobile';
import constants from '@spo/config/constants';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import CommonActions from '@spo/redux/common/action';

export default function CategoryFilterMobile(props) {
    const {
        showFilterMobileType,
        handleShowFilterMobileType,
        handleShowModalFilter
    } = props;
    const router = useRouter();
    const { typeCategory } = props;
    const dispatch = useDispatch();
    const common = useSelector((state) => state.Common);
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
            let index = common.data.listCategories.findIndex(v => v.Id == categoryRouter.split(',')[0]);
            if (index == -1) {
                setCategoryListFake(categoryRouter.split(','))
            }
        } else {
            setCategoryListFake([])
        }
    }, [router.query[constants.ROUTER_NAME.CATEGORY]])

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
        handleShowModalFilter(false);
        handleShowFilterMobileType(null)
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
            if(router.query[constants.ROUTER_NAME.GENDER]){
                params[constants.ROUTER_NAME.GENDER] = router.query[constants.ROUTER_NAME.GENDER];
            }
            params[constants.ROUTER_NAME.PAGE] = 1;
            router.replace({
                query: params
            })
        }
        handleShowModalFilter(false)
        handleShowFilterMobileType(null)

    }
    return (
        <>
            <div className="pointer">
                <div className="filter-sort filter-sort-by-categories">
                    <div className="menu-name d-flex" onClick={() => handleShowFilterMobileType(constants.TYPE_SHOW_FILTER_MOBILE.SHOW_CATEGORY)}>
                        <span className='d-start'>
                            {router.query[constants.ROUTER_NAME.CATEGORY] && router.query[constants.ROUTER_NAME.CATEGORY]?.split(',').length > 0 && (<div className='filter-dot'></div>)}
              Danh mục
                        </span>
                        <div className={`filter-icon-arrow-down px-3 ${showFilterMobileType == constants.TYPE_SHOW_FILTER_MOBILE.SHOW_CATEGORY && 'rorate'}`}></div>
                    </div>
                    {showFilterMobileType == constants.TYPE_SHOW_FILTER_MOBILE.SHOW_CATEGORY && (
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
                                                            style={{ height: 37 }}
                                                            onClick={(
                                                                e
                                                            ) =>
                                                                handleFilterCategory(
                                                                    sub.Id
                                                                )
                                                            }>
                                                            <div
                                                                className={`d-start text-left link-hover ${checkExitsArray(
                                                                    categoryListFake,
                                                                    sub.Id
                                                                )
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
                                <FooterFilterMobile
                                    // setShowFilterMobileType={setShowFilterMobileType}
                                    // handleShowFilter={handleShowFilter}
                                    handleSubmit={() => handleSubmit()}
                                    handleRemoveAll={() => handleRemoveAll()} />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}
