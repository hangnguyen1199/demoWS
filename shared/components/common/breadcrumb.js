import useCustomRoute from '@spo/lib/use-custom-route';
import { PropTypes } from 'prop-types';
import React from 'react';
import { useDispatch } from 'react-redux';
import {Link} from '@spo/routes'
/**
 * ****************************************************************************
 * HaiDT Breadcrumb CODE
 * breadcrumb.js
 *
 * description		:
 * created at		:	2021-11-26
 * created by		:	HaiDT
 * package			:	spo\shared\components\common\breadcrumb.js
 * copyright			:	Copyright (c) HaiDT
 * version			:	1.0.0
 * ****************************************************************************
 */

function BreadCrumb(props) {
    const { data, productName,className } = props;
    const dispatch = useDispatch();
    const goTo = (item) => {
        useCustomRoute(dispatch, item.path_name, item.query);
    };
    return (
        <div>
            <nav aria-label="breadcrumb " className={className}>
                <ol className={`breadcrumb  d-start pd-lr-common align-items-start`} style={{height: props.height}}>
                    {data.map((item, index) => {
                        return (
                            <li
                                className={`breadcrumb-item pointer breadcrumb-item-capitalize ${
                                    index == data.length - 1 ? 'active' : ''
                                }`}
                                key={index}>
                                <Link
                                    route={item.path_name}
                                    params={item.query}>
                                    <a>{item.name?.toLowerCase()}</a>
                                </Link>
                            </li>
                        );
                    })}
                </ol>
            </nav>
            <div className="d-center breadcrumb-product-name">{productName}</div>
        </div>
    );
}
BreadCrumb.propTypes = {
    data: PropTypes.array,
    productName: PropTypes.string,
    height: PropTypes.number
};
BreadCrumb.defaultProps = {
    data: [
        { name: 'Trang chủ', path_name: '/' },
        { name: 'Khác', path_name: '/' },
    ],
    productName: "",
    height: 60
};
export default React.memo(BreadCrumb);
