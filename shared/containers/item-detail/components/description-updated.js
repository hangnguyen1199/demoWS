import { PropTypes } from 'prop-types';
import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import useWindowSize from '@spo/lib/use-window-size';
import constants from '@spo/config/constants';
import { useDispatch } from 'react-redux';
import ItemDetailActions from '@spo/redux/item-detail/action';
import TabDetailProductReview from './tab-detail-product-review';
import TabDetailProductReviewUpdated from './tab-detail-product-review-updated';

/**
 * ****************************************************************************
 * HaiDT DescriptionUpdated CODE
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
function DescriptionUpdated (props) {
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
        <div className="description_updated tabs-listing" id="tabs-listing">
            <div className='title'>
                <FormattedMessage id="item_detail.product_review" />
            </div>
            <div className="wrap_tab_detail_product_review">
                <TabDetailProductReviewUpdated productDetail={productDetail} />
            </div>
        </div>
    );
}
DescriptionUpdated.propTypes = {
    productDetail: PropTypes.object,
};
DescriptionUpdated.defaultProps = {
    productDetail: {},
};
export default DescriptionUpdated;
