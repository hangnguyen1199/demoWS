const Screen = dynamic(
    () => import('@spo/components/common/screen'),
    { ssr: false },
);
import React, { useEffect, useState } from 'react';
import IconChevronRight from '../common/icon-chevron-right';
import IconArrowLeftShort from './../common/icon-arrow-left-short';
import { useDispatch } from 'react-redux';
import SearchItemActions from '@spo/redux/search-item/action';
import { useRouter } from 'next/router';
import { PropTypes } from 'prop-types';
import constants from '@spo/config/constants';
import dynamic from 'next/dynamic';

/**
 * ****************************************************************************
 * DUNGNT CategoryScreen CODE
 * category-screen.js
 *
 * description		:
 * created at		:	2020-09-07
 * created by		:	DungNT
 * package			:	spo\shared\components\spo-layout\category-screen.js
 * copyright			:	Copyright (c) DungNT
 * version			:	1.0.0
 * ****************************************************************************
 */
function CategoryScreen(props) {
    const dispatch = useDispatch();
    const router = useRouter();
    const { data, show } = props;
    //----------------------------------------------
    // Effect
    //----------------------------------------------
    useEffect(() => {
        if (router.query[constants.PARAM_URL.CATEGORY_SLUG] && data) {
            let subIndex = -1;
            let index = data.findIndex((x) => {
                let i = x.child_categories.findIndex(
                    (e) =>
                        e.category_slug ==
                        router.query[constants.PARAM_URL.CATEGORY_SLUG],
                );

                if (i != -1) {
                    subIndex = i;
                    return true;
                }
                return false;
            });
            if (index != -1 && subIndex != -1) {
                dispatch({
                    type: SearchItemActions.UPDATE_CATEGORY_SECOND_SELECTED,
                    data: data[index].child_categories[subIndex],
                });
            }
        }
    }, [router.query[constants.PARAM_URL.CATEGORY_SLUG], data]);
    //----------------------------------------------
    // Function
    //----------------------------------------------
    const onHandleClickCategorySub = (item) => {
        dispatch({
            type: SearchItemActions.UPDATE_CATEGORY_SELECTED,
            data: item,
        });
        dispatch({ type: SearchItemActions.TOGGLE_CATEGORY_SECOND_SCREEN });
    };
    const onClose = () => {
        dispatch({ type: SearchItemActions.TOGGLE_CATEGORY_SCREEN });
    };
    return (
        <Screen
            scrollClass="no-scroll"
            open={show}
            className={`category-filter-screen`}>
            <div className="col-12 px-0">
                <div className="top w-100 col-12 px-2">
                    <div className="d-start col-3 px-0">
                        <div className="close" onClick={onClose}>
                            <IconArrowLeftShort fontSize={30} />
                        </div>
                    </div>
                    <div className="col-6 text-center title_screen">
                        Danh mục
                    </div>
                    <div className="col-3"></div>
                </div>
                <div className="px-3 py-2">
                    {data.map((item, index) => {
                        return (
                            <div key={index} className={`category-wrap `}>
                                <div
                                    className="category-title"
                                    onClick={() =>
                                        onHandleClickCategorySub(item)
                                    }>
                                    <span>{item.category_name}</span>
                                    <span className={`d-center icon `}>
                                        <IconChevronRight />
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </Screen>
    );
}
CategoryScreen.propTypes = {
    data: PropTypes.array,
    show: PropTypes.bool,
};
CategoryScreen.defaultProps = {
    data: [],
    show: false,
};
export default CategoryScreen;
