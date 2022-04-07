import constants from '@spo/config/constants';
import useCustomRoute from '@spo/lib/use-custom-route';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import RowItem from './row-item';
import Pagination from 'react-js-pagination';

/**
 * ****************************************************************************
 * DUNGNT TableItem CODE
 * table-item.js
 *
 * description		:
 * created at		:	2020-12-11
 * created by		:	DungNT
 * package			:	spo\shared\components\analysis-management\table-item.js
 * copyright			:	Copyright (c) DungNT
 * version			:	1.0.0
 * ****************************************************************************
 */

function TableItem(props) {
    const { data, total } = props;
    const dispatch = useDispatch();
    const router = useRouter();

    const [activePage, setActivePage] = useState(1);
    const [itemSelected, setItemSelected] = useState([]);
    //----------------------------------------------
    // Effect
    //----------------------------------------------
    useEffect(() => {
        setActivePage(
            router.query[constants.PARAM_URL.OFFSET] /
                constants.MANAGEMENT.ITEM.LIMIT +
                1,
        );
    }, [router.query[constants.PARAM_URL.OFFSET]]);

    //----------------------------------------------
    // Function
    //----------------------------------------------
    /**
     * Xử lí chuyển trang
     *
     * Author : DungNT - 2020-10-17 - create
     * @param  {int} number -- current page
     * @return {void}
     */
    const handleChangePage = (number) => {
        let newParams = { ...router.query };
        newParams[constants.PARAM_URL.OFFSET] =
            constants.MANAGEMENT.ITEM.LIMIT * (number - 1);
        useCustomRoute(dispatch, router.pathname.replace('/', ''), newParams);
    };

    return (
        <div className="py-3">
            <div className="pb-3 ">
                <div className="d-start">
                    <div>
                        Tìm thấy{' '}
                        <span className="font-weight-bold">{total}</span> sản
                        phẩm
                    </div>
                </div>
            </div>
            <div className="table-responsive">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Sản phẩm</th>
                            <th>Giá</th>
                            <th>Số lượng tồn</th>
                            <th>Đã bán</th>
                            <th>Tag</th>
                            <th>Trạng thái</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => {
                            return (
                                <RowItem
                                    _index={index}
                                    item={item}
                                    key={index}
                                />
                            );
                        })}
                    </tbody>
                </table>
            </div>

            <div className="w-100 d-end">
                <Pagination
                    itemClass="page-item"
                    linkClass="page-link"
                    activePage={activePage}
                    itemsCountPerPage={constants.MANAGEMENT.ITEM.LIMIT}
                    totalItemsCount={total}
                    pageRangeDisplayed={5}
                    onChange={handleChangePage}
                />
            </div>
        </div>
    );
}

export default TableItem;
