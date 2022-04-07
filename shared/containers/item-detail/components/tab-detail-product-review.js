import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PropTypes } from 'prop-types';
import Image from '@spo/components/common/image';
import FilterReview from './filter-review';
import ReviewContent from './review-content';
import ItemDetailActions from '@spo/redux/item-detail/action';
import EmptyView from './../../../components/common/empty-view';

function TabDetailProductReview(props) {
    const dispatch = useDispatch();
    const {
        loading: { loadingProductDetailReview },
        data: { productDetailReview },
    } = useSelector((state) => state.ItemDetail);
    function handleFilter(filter) {
        let param = {};
        // Type search: 1 - all, 2: Have Comment, 3 Have media, 4 - smile, 5 - normal, 6 - sad
        switch (filter) {
            case 'all':
                param['Type'] = 1;
                break;
            case 'total-happy':
                param['Type'] = 4;
                break;
            case 'total-normal':
                param['Type'] = 5;
                break;
            case 'total-bad':
                param['Type'] = 6;
                break;
            case 'have-comment':
                param['Type'] = 2;
                break;
            case 'have-image':
                param['Type'] = 3;
                break;
            default:
                break;
        }
        param['ProductId'] = props.productDetail.Id;
        dispatch({
            type: ItemDetailActions.LOAD_PRODUCT_DETAIL_REVIEW,
            data: param,
        });
    }
    return (
        <div className="tab-detail-product-review">
            <FilterReview
                data={props.productDetail}
                onChange={(e) => {
                    handleFilter(e);
                }}
            />
            {productDetailReview?.List?.length > 0 ? (
                <>
                    {productDetailReview?.List?.map((element, index) => {
                        return (
                            <div key={index}>
                                <ReviewContent data={element} />
                            </div>
                        );
                    })}
                </>
            ) : (
                <EmptyView Title="Sản phẩm hiện chưa có đánh giá nào" />
            )}
        </div>
    );
}
TabDetailProductReview.propTypes = {
    data: PropTypes.array,
};
TabDetailProductReview.defaultProps = {
    data: [],
};
export default TabDetailProductReview;
