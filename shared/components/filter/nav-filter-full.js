const Display = dynamic(
    () => import('@spo/components/common/display'),
    { ssr: false },
);
import dynamic from 'next/dynamic';
import React from 'react';
import IconGrid33 from './../common/icon-grid-3-3';
import IconListView from './../common/icon-list-view';
import { Router } from '@spo/routes';
import { useRouter } from 'next/router';
import constants from '@spo/config/constants';


/**
 * ****************************************************************************
 * DUNGNT NavFilterFull CODE
 * nav-filter-full.js
 *
 * description		:
 * created at		:	2020-09-19
 * created by		:	DungNT
 * package			:	spo\shared\components\filter\nav-filter-full.js
 * copyright			:	Copyright (c) DungNT
 * version			:	1.0.0
 * ****************************************************************************
 */
function NavFilterFull(props) {
    const router = useRouter();
    const {
        data: { total },
    } = props;
    const active = router.query[constants.PARAM_URL.VIEW] ?? 1;
    const sortList = [
        { name: 'Bán chạy nhất', value: '1' },
        { name: 'Từ A-Z', value: 'name-a-z' },
        { name: 'Từ Z-A', value: 'name-z-a' },
        { name: 'Giá Cao-Thấp', value: 'price_high_to_low' },
        { name: 'Giá Thấp-Cao', value: 'price_low_to_high' },
    ];
    const onChangeView = (number) => {
        // props.onChangeView(number)
        let data = router.query;
        data[constants.PARAM_URL.VIEW] = number;
        Router.pushRoute(router.pathname.replace(/\//g, ''), data);
    };
    const onChangeSort = (e) => {
        let data = router.query;
        if (e.target.value && e.target.value != 0) {
            data[constants.PARAM_URL.TYPE_ORDER] = e.target.value;
            Router.pushRoute(router.pathname.replace(/\//g, ''), data);
        }
    };
    return (
        <Display>
            <div className="nav-filter-full">
                <div className="filters-toolbar-wrapper  w-100">
                    <div className="d-flex p-2 bg-light _border_1">
                        <div className="col-4 col-lg-4 col-lg-4 filters-toolbar__item collection-view-as d-flex justify-content-start align-items-center px-0 ">
                            <div
                                title="Grid View"
                                className={
                                    `change-view link-hover pl-0 ${ 
                                        active == 1 ? 'color-primary' : ''}`
                                }
                                onClick={() => onChangeView(1)}>
                                <IconGrid33 fontSize={24} />
                            </div>
                            <div
                                title="List View"
                                className={
                                    `change-view link-hover ${ 
                                        active == 2 ? 'color-primary' : ''}`
                                }
                                onClick={() => onChangeView(2)}>
                                <IconListView fontSize={28} />
                            </div>
                        </div>
                        <div className="col-4 col-lg-4 col-lg-4 text-center filters-toolbar__item filters-toolbar__item--count d-flex justify-content-center align-items-center px-0">
                            <span className="filters-toolbar__product-count">
                                Đang xem: {total}
                            </span>
                        </div>
                        <div className="col-4 col-lg-4 col-lg-4 text-right px-0 d-end">
                            <div className="filters-toolbar__item">
                                <label className="hidden">Sort</label>
                                <select
                                    defaultValue="ALL"
                                    onChange={onChangeSort}
                                    name="SortBy"
                                    id="SortBy"
                                    className="filters-toolbar__input filters-toolbar__input--sort pl-0">
                                    <option value="ALL">- Tất cả -</option>
                                    {sortList.map((item, index) => (
                                        <option key={index} value={item.value}>
                                            {item.name}
                                        </option>
                                    ))}
                                </select>
                                <input
                                    className="collection-header__default-sort"
                                    type="hidden"
                                    value="manual"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Display>
    );
}
export default NavFilterFull;
