const Display = dynamic(
    () => import('@spo/components/common/display'),
    { ssr: false },
);
import dynamic from 'next/dynamic';
import IconCircle from '@spo/components/common/icon-circle';
import IconDotCircle from '@spo/components/common/icon-dot-circle';
import IconGrid33 from '@spo/components/common/icon-grid-3-3';
import IconListView from '@spo/components/common/icon-list-view';
import IconSliders from '@spo/components/common/icon-sliders';
import IconSortAlphaDown from '@spo/components/common/icon-sort-alpha-down';
import IconSortAlphaDownAlt from '@spo/components/common/icon-sort-alpha-down-alt';
import IconSortNumericDown from '@spo/components/common/icon-sort-numeric-down';
import IconSortUpAlt from '@spo/components/common/icon-sort-up-alt';
import SearchItemActions from '@spo/redux/search-item/action';
import { Router } from '@spo/routes';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import IconSortNumericDownAlt from './../common/icon-sort-numeric-down-alt';
import constants from '@spo/config/constants';



/**
 * ****************************************************************************
 * DUNGNT NavFilter CODE
 * nav-filter.js
 *
 * description		:
 * created at		:	2020-09-09
 * created by		:	DungNT
 * package			:	spo\shared\components\filter\nav-filter.js
 * copyright			:	Copyright (c) DungNT
 * version			:	1.0.0
 * ****************************************************************************
 */
function NavFilter(props) {
    const router = useRouter();
    const {
        data: { products, total },
    } = props;
    const dispatch = useDispatch();
    const active = router.query.view ?? 1;
    const [sort, setSort] = useState({
        title: '- Tất cả -',
        value: 0,
        icon: <IconSortUpAlt fontSize={23} />,
    });
    const [showSort, setShowSort] = useState(false);
    const [isChange, setChange] = useState(true);
    const listSort = [
        {
            title: '- Tất cả -',
            value: 0,
            icon: <IconSortUpAlt fontSize={23} />,
        },
        {
            title: 'Từ A-Z',
            value: 'name-a-z',
            icon: <IconSortAlphaDown fontSize={23} />,
        },
        {
            title: 'Từ Z-A',
            value: 'name-z-a',
            icon: <IconSortAlphaDownAlt fontSize={23} />,
        },
        {
            title: 'Giá Cao-Thấp',
            value: 'price_high_to_low',
            icon: <IconSortNumericDownAlt fontSize={23} />,
        },
        {
            title: 'Giá Thấp-Cao',
            value: 'price_low_to_high',
            icon: <IconSortNumericDown fontSize={23} />,
        },
    ];

    //----------------------------------------------
    // Function
    //----------------------------------------------
    const onFilter = () => {
        setShowSort(false);
        dispatch({ type: SearchItemActions.TOGGLE_SEARCH_ADVANCED_SCREEN });
    };
    const onChangeSort = (item) => {
        setSort(item);
        setShowSort(!showSort);
        let data = router.query;
        data[constants.PARAM_URL.TYPE_ORDER] = item.value;
        Router.pushRoute(router.pathname.replace(/\//g, ''), data);
    };
    const onChangeView = (number) => {
        // props.onChangeView(number)
        let data = router.query;
        data[constants.PARAM_URL.VIEW] = number;
        Router.pushRoute(router.pathname.replace(/\//g, ''), data);
    };
    return (
        <Display mobile={true}>
            <div className="nav-filter ">
                <div id="nav-search-mobile" className="w-100">
                    <div className="nav-search-mobile d-flex w-100">
                        <div className="count col  d-start">
                            Đang xem : {total}
                        </div>
                        <div className="change_view col-2 px-0 d-center">
                            {active == 1 ? (
                                <div
                                    title="Grid View"
                                    className={`change-view pl-0 `}
                                    onClick={() => onChangeView(2)}>
                                    <IconGrid33 fontSize={22} />
                                </div>
                            ) : (
                                <div
                                    title="List View"
                                    className={`change-view  `}
                                    onClick={() => onChangeView(1)}>
                                    <IconListView fontSize={24} />
                                </div>
                            )}
                        </div>
                        <div
                            className="sort col-2 px-0 d-center flex-column"
                            onClick={() => {
                                setShowSort(!showSort);
                            }}>
                            {sort?.icon ?? <IconSortUpAlt fontSize={23} />}
                            <span className="px-0">Sắp xếp</span>
                        </div>
                        <div
                            className="filter col-2 px-0 d-center flex-column"
                            onClick={onFilter}>
                            <IconSliders fontSize={23} />
                            <span>Bộ lọc</span>
                        </div>
                    </div>
                    <div
                        className={`col-12 menu-collapse ${
                            showSort ? 'active' : ''
                        }`}>
                        {listSort.map((item, index) => {
                            return (
                                <div
                                    className="item"
                                    key={index}
                                    onClick={() => onChangeSort(item)}>
                                    <div className="name">{item.title}</div>
                                    <div className="icon">
                                        {item.value == sort.value ? (
                                            <IconDotCircle fontSize={22} />
                                        ) : (
                                            <IconCircle fontSize={22} />
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </Display>
    );
}
NavFilter.propTypes = {};
NavFilter.defaultProps = {};
export default NavFilter;
