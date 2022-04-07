import { PropTypes } from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Router } from '@spo/routes';
import AppActions from '@spo/redux/app/action';
import CommonActions from '@spo/redux/common/action';
import constants from '@spo/config/constants';
import TreeView from '@spo/components/utility/tree-view/tree-view';
import { useRouter } from 'next/router';

/**
 * ****************************************************************************
 * HaiDT ItemFilter CODE
 * category-filter.js
 *
 * description		:
 * updated at		:	2021-11-20
 * updated by		:	HaiDT
 * package			:	spo\shared\components\left-side\item-filter.js
 * copyright			:	Copyright (c) HaiDT
 * version			:	1.0.0
 * ****************************************************************************
 */
const ItemFilter = (props) => {
    const router = useRouter();
    const { data, value, name, isTwoColumn } = props;
    const [category, setCategory] = useState(null);
    const dispatch = useDispatch();
    //----------------------------------------------
    // Effect
    //----------------------------------------------
    useEffect(() => {
        if (typeof props.onChange == 'function') {
            setCategory(value);
        }
    }, [value]);
    //----------------------------------------------
    // Function
    //----------------------------------------------
    const onChange = (val) => {
        // props.onChange(val)
        dispatch({
            type: CommonActions.LOAD_SIZE,
            data: { category_id: val.parent_id },
        });
        if (typeof props.onChange == 'function') {
            props.onChange(val);
        } else {
            dispatch(AppActions.callLoading());
            let newParam = { ...router.query };
            newParam[constants.PARAM_URL.CATEGORY_SLUG] = val.slug;

            if (!newParam[constants.PARAM_URL.GENDER_ITEM]) {
                newParam[constants.PARAM_URL.GENDER_ITEM] =
                    constants.GENDER.ALL;
            }
            // Router.pushRoute('category', newParam).then(() => {
            //     dispatch(AppActions.closeLoading());
            //     window.scroll({
            //         top: 0,
            //         left: 0,
            //     });
            // });
            Router.pushRoute('search', newParam).then(() => {
                dispatch(AppActions.closeLoading());
                window.scroll({
                    top: 0,
                    left: 0,
                });
            });
        }
    };
    const handleRemove = () => { };
    return (
        <div className="sidebar_widget filterBox categories filter-widget">
            <div className="widget-title">
                <div className="title-leftside">{name}</div>
            </div>
            <div className="widget-content">
                <TreeView selected={value} items={data} onChange={onChange} isTwoColumn={isTwoColumn} />
            </div>
        </div>
    );
};
ItemFilter.propTypes = {
    data: PropTypes.array,
    isTwoColumn: PropTypes.bool
};
ItemFilter.defaultProps = {
    data: [],
};
export default ItemFilter;
