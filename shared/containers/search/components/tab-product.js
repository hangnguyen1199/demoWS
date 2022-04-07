const ListItems = dynamic(() => import('@spo/components/item/list-items'), {
    ssr: false,
});
const Header = dynamic(() => import('@spo/components/spo-layout/header'), {
    ssr: false,
});
import CustomPagination from '@spo/components/common/custom-pagination';
import HeaderBarFilter from '@spo/components/filter/header-bar-filter';
import constants from '@spo/config/constants';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MenuActions from '../../../../redux/top-search-menu/action';
import { scrollTop } from '../../../library/helper';
import Utils from '../../../utils/utils';
import EmptyDataComponent from '@spo/components/common/empty-data';
import PageList from '../../../config/PageList'
import Display from '../../../components/common/display';
import FilterLeftCommon from '../../../components/filter/filter-left/filter-left-common';
import RenderDataFilter from '../../../components/filter/filter-left/render-data-filter';
/**
 * ****************************************************************************
 * DUNGNT Index CODE
 * index.js
 *
 * description		:
 * created at		:	2021-12-29
 * created by		:	DungNT
 * package			:	\shared\containers\search\index.js
 * copyright			:	Copyright (c) DungNT
 * version			:	1.0.0
 * ****************************************************************************
 */
const TabProduct = (props) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const _queryParam = router.query;
    const typeDisplay = useSelector((state) => state.App.typeDisplay);
    const { loading, data, limit, total, offset } = useSelector(
        (state) => state.ProductListType,
    );
    useEffect(() => {
        // dispatch({
        //     type: CommonActions.LOAD_CATEGORY_MASTER_BY_GENDER,
        //     data: {},
        // });
        dispatch({
            type: MenuActions.FETCH_KEYWORD_SEARCH,
            data: { Keyword: _queryParam[constants.PARAM_URL.KEYWORD] },
            callback: () => {
                // setLoading(false);
            },
        });
    }, []);

    let gender = Utils.getGender(props.gender);
    let category = Utils.getCategory(props.category);
    let data_bread_crumb = [
        { name: 'Trang chủ', path_name: '/' },
        { name: 'Tìm kiếm', path_name: PageList.SEARCH.SERVER },
    ];
    if (gender) {
        data_bread_crumb.push({
            name: gender?.GenderName,
            path_name: `${PageList.CATEGORY.INDEX}${constants.GENDER_ID[gender?.GenderId]}`,
        });
    }
    if (category) {
        data_bread_crumb.push({ name: category?.Name, path_name: '/' });
    }
    const [breadcrumb, setBreadcrumb] = useState(data_bread_crumb);
    useEffect(() => {
        setBreadcrumb(data_bread_crumb);
    }, [gender, category]);
    return (
        <>
            <div className="tab-product">
                <Display mobile>
                    <HeaderBarFilter
                        isShowSortLocation={false}
                        isShowSortSex={false}
                        categoryActive={category?.Id}
                        typeCategory={constants.TYPE_CATEGORY.CATEGORY_PRODUCT_LIST}
                    />
                </Display>
                <div className='d-flex flex-row w-100'>
                    <FilterLeftCommon className="pd-lr-common"
                        isShowFilter={true}
                        isShowSortLocation={false}
                        isShowSortSex={true}
                        isShowCategoryFilter={true}
                        typeCategory={constants.TYPE_CATEGORY.CATEGORY_PRODUCT_LIST}
                        // breadcrumbPage={[data_bread_crumb]}
                    />
                    <div className="pd-lr-common product-list-content w-100">
                        <RenderDataFilter
                        />
                        <div className="row px-0 product-content mx-0">
                            <div className="col-12 px-0">
                                <div className="product-list-item">
                                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 px-0">
                                        {total.total > 0 || total.total == null ? (<>
                                            <ListItems
                                                isViewInSlider={false}
                                                items={data.typeProductList}
                                                loading={
                                                    loading.loadingTypeProductList
                                                }
                                                isShowMore={true}
                                                isFullWidth={true}
                                                isBorderTop={false}
                                                typeDisplay={typeDisplay}
                                                textColor="#000000"
                                            />
                                        </>
                                        ) : <EmptyDataComponent message="Không tìm thấy sản phẩm" />
                                        }
                                        {total.total > 0 && (
                                            <div className='wrap_search_pagination'>
                                                <CustomPagination
                                                    limit={
                                                        constants
                                                            .PAGINATION_PRODUCT_LIST
                                                            .LIMIT
                                                    }
                                                    total={total.total}
                                                    pageRangeDisplayed={4}
                                                    active={Number(router.query.Page) || 1}
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TabProduct;


// function handleFilter (e) {
//     let param = {};
//     const routerParam = { ...router.query };
//     param['Limit'] = constants.PAGINATION_PRODUCT_LIST.LIMIT;
//     param['Gender'] = props.gender;
//     param['Offset'] = 0;
//     //
//     if (_queryParam[constants.PARAM_URL.KEYWORD]) {
//         routerParam['Search'] = param['Search'] = _queryParam[constants.PARAM_URL.KEYWORD];
//     } else {
//         delete routerParam.Search;
//     }
//     //
//     if (e.orderByPrice) {
//         routerParam['Sort'] = param['Sort'] = e.orderByPrice;
//     } else {
//         delete routerParam.Sort;
//     }
//     //
//     if (e.filterCategory.length > 0) {
//         routerParam['CategoryId'] = param['CategoryId'] = e.filterCategory.join(',');
//     } else {
//         delete routerParam.CategoryId;
//     }
//     //
//     if (e.filterSize.length > 0) {
//         routerParam['SizeId'] = param['SizeId'] = e.filterSize.join(',');
//     } else {
//         delete routerParam.SizeId;
//     }
//     //
//     if (e.filterPromotion.length > 0) {
//         routerParam['TypeOfPromotion'] = param['TypeOfPromotion'] = e.filterPromotion.join(',');
//     } else {
//         delete routerParam.TypeOfPromotion;
//     }
//     //
//     if (e.filterPrice && (e.filterPrice.startPrice || e.filterPrice.endPrice)) {
//         routerParam['PriceFrom'] = param['PriceFrom'] = e.filterPrice.startPrice;
//         routerParam['PriceTo'] = param['PriceTo'] = e.filterPrice.endPrice;
//     } else {
//         delete routerParam.PriceFrom;
//         delete routerParam.PriceTo;
//     }
//     setCurrentParamFilter(param);
//     //
//     delete router.query.paramName;
//     router.replace(
//         {
//             pathname: router.pathname,
//             query: {
//                 ...routerParam,
//             },
//         },
//         undefined,
//         { shallow: true }
//     );
//     scrollTop()
// }
