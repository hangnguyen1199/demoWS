const ListItems = dynamic(() => import('@spo/components/item/list-items'), {
    ssr: false,
});
const Header = dynamic(() => import('@spo/components/spo-layout/header'), {
    ssr: false,
});
import constants from '@spo/config/constants';
import CommonActions from '@spo/redux/common/action';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MenuActions from '../../../redux/top-search-menu/action';
import PageList from '../../config/PageList';
import Utils from '../../utils/utils';
import IconLeftDoubleArrow from './../../components/common/icons/icon-left-double-arrow';
import IconRightDoubleArrow from './../../components/common/icons/icon-right-double-arrow';
import TabOther from './components/tab-other';
import TabProduct from './components/tab-product';

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
const SearchContainer = (props) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const OTHER = 2;
    const _queryParam = router.query;
    const [tabActive, setTabActive] = useState(constants.SEARCH_PRODUCT_TAB);
    const typeDisplay = useSelector((state) => state.App.typeDisplay);
    const MenuSearch = useSelector((state) => state.MenuSearch);
    const searchScreenData = useSelector(
        (state) => state.MenuSearch.searchScreen
    )
    useEffect(() => {
        dispatch({
            type: CommonActions.LOAD_CATEGORY_MASTER_BY_GENDER,
            data: {},
        });
        dispatch({
            type    : MenuActions.FETCH_KEYWORD_SEARCH_SCREEN,
            data    : { Keyword: router.query[constants.ROUTER_NAME.KEYWORD] },
            callback: () => {
                // setLoading(false);
            },
        });
    }, [router.query[constants.ROUTER_NAME.KEYWORD]]);
    useEffect(() => {
        setTabActive(_queryParam["tab"] ?? 1)
    },[
        _queryParam["tab"]
    ])
    let gender = Utils.getGender(props.gender);
    let category = Utils.getCategory(props.category);
    let data_bread_crumb = [
        { name: 'Trang chủ', path_name: '/' },
        { name: 'Tìm kiếm', path_name: PageList.SEARCH.SERVER },
    ];
    if (gender) {
        data_bread_crumb.push({
            name     : gender?.GenderName,
            path_name: `${PageList.CATEGORY.INDEX}/${constants.GENDER_ID[gender?.GenderId]}`,
        });
    }
    if (category) {
        data_bread_crumb.push({ name: category?.Name, path_name: '/' });
    }
    const [breadcrum, setBreadcrum] = useState(data_bread_crumb);
    useEffect(() => {
        setBreadcrum(data_bread_crumb);
    }, [gender, category]);
    const getTotalSearchResult = () => {
        return (
            (searchScreenData.Product?.Total || 0) +
            (searchScreenData.News?.Total || 0 )+
            (searchScreenData.Promotion?.Total || 0)
        );
    };
    const handleChangeTab = (val) => {
        let newQuery = {..._queryParam}
        newQuery["tab"] = val
        router.replace({
            query: newQuery
        })
        // setTabActive(val);
    };
    const _renderTab = () => {
        switch (tabActive.toString()) {
            case constants.SEARCH_PRODUCT_TAB:
                return <TabProduct Keyword={_queryParam[constants.PARAM_URL.KEYWORD]} />;
            case constants.SEARCH_NEWS_TAB:
            case constants.SEARCH_PROMO_TAB:
            case constants.SEARCH_FAQ_TAB:
                return <TabOther Keyword={_queryParam[constants.PARAM_URL.KEYWORD]} />;
            default:
                return <TabProduct Keyword={_queryParam[constants.PARAM_URL.KEYWORD]} />;
        }
    };
    return (
        <>
            <div className="product-list-with-type search-container">
                {/* <Header /> */}
                {/* <BreadCrumb data={breadcrum} /> */}
                <div className="search_info_section">
                    <div className="wrap_row">
                        <span className="text1">Tìm kiếm :</span>
                        <span className="text2">
                            <IconLeftDoubleArrow fontSize={16} />
                            {_queryParam[constants.ROUTER_NAME.KEYWORD]}
                            <IconRightDoubleArrow fontSize={16} />
                        </span>
                    </div>
                    {searchScreenData && (
                        <div className="wrap_row">
                            <span className="text1">
                                {getTotalSearchResult()} kết quả :
                            </span>
                            <div>
                                <span
                                    onClick={() => handleChangeTab(constants.SEARCH_PRODUCT_TAB)}
                                    className={`text2_tab ${
                                        tabActive == constants.SEARCH_PRODUCT_TAB ? 'active' : ''
                                    }`}>
                                    {searchScreenData.Product?.Total ?? 0} sản phẩm
                                </span>
                                <span>|</span>
                                <span
                                    onClick={() => handleChangeTab(OTHER)}
                                    className={`text2_tab ${
                                        tabActive != constants.SEARCH_PRODUCT_TAB ? 'active' : ''
                                    }`}>
                                    {(searchScreenData.News?.Total +
                                        searchScreenData.Promotion?.Total) || 0}{' '}
                                    khác
                                </span>
                            </div>
                        </div>
                    )}
                </div>
                <div className="tab_container">{_renderTab()}</div>
            </div>
        </>
    );
};

export default SearchContainer;
