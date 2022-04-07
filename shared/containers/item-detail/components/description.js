import { PropTypes } from 'prop-types';
import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import useWindowSize from '@spo/lib/use-window-size';
import constants from '@spo/config/constants';
import { useDispatch } from 'react-redux';
import ItemDetailActions from '@spo/redux/item-detail/action';
import TabDetailProductReview from './tab-detail-product-review';

/**
 * ****************************************************************************
 * HaiDT Description CODE
 * description.js
 *
 * description		:
 * created at		:	2021-11-14
 * created by		:	HaiDT
 * package			:	spo\shared\containers\item-detail\components\description.js
 * copyright			:	Copyright (c) HaiDT
 * version			:	1.0.0
 * ****************************************************************************
 */
function Description(props) {
    const windowSize = useWindowSize();
    const dispatch = useDispatch();
    const {
        data: { productDetail, tabActive },
    } = props;
    //----------------------------------------------
    // Function
    //----------------------------------------------
    const changeTab = (number) => {
        dispatch({ type: ItemDetailActions.CHANGE_TAB_ACTIVE, data: number });
    };
    return (
        <div className="tabs-listing pt-0 pt-lg-5" id="tabs-listing">
            {windowSize &&
            windowSize.width &&
            windowSize.width >= constants.WINDOW_SIZE.MEDIUM ? (
                    <>
                        <ul
                            className="product-tabs d-none d-lg-flex justify-content-around"
                            id="product-tabs">
                            <li
                                className={tabActive == 1 ? 'active' : ''}
                                onClick={() => changeTab(1)}>
                                <a className="tablink">
                                    <FormattedMessage id="common.description" />
                                </a>
                            </li>
                            <li className='line-detail'></li>
                            <li
                                className={tabActive == 3 ? 'active' : ''}
                                onClick={() => changeTab(3)}>
                                <a className="tablink">
                                    <FormattedMessage id="item_detail.product_review" />
                                </a>
                            </li>
                        </ul>
                    </>
                ) : (
                    <>
                        <div className="d-flex justify-content-between align-items-center wrap-tab-mobile d-flex d-lg-none">
                            <div
                                className={`wrap  flex-fill  ${
                                    tabActive == 1 ? 'active' : ''
                                }`}>
                                <div
                                    className={`tab-mobile`}
                                    onClick={() => changeTab(1)}>
                                    <FormattedMessage id="common.description" />
                                </div>
                            </div>
                            <div
                                className={`wrap  flex-fill ${
                                    tabActive == 3 ? 'active' : ''
                                }`}>
                                <div
                                    className={`tab-mobile `}
                                    onClick={() => changeTab(3)}>
                                    <FormattedMessage id="item_detail.product_review" />
                                </div>
                            </div>
                        </div>
                    </>
                )}

            <div className="tab-container">
                <div
                    id="tab1"
                    className={
                        `tab-content ${  tabActive == 1 ? 'd-block' : ''}`
                    }>
                    <div className="product-description rte">
                        <div
                            dangerouslySetInnerHTML={{
                                __html: productDetail?.Detail,
                            }}></div>
                    </div>
                </div>
                <div
                    id="tab3"
                    className={
                        `tab-content ${  tabActive == 3 ? 'd-block' : ''}`
                    }>
                    <div className="">
                        <TabDetailProductReview productDetail={productDetail} />
                    </div>
                </div>
            </div>
        </div>
    );
}
Description.propTypes = {
    productDetail: PropTypes.object,
};
Description.defaultProps = {
    productDetail: {},
};
export default Description;
