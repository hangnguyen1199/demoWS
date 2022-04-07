import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PropTypes } from 'prop-types';
import Image from '@spo/components/common/image';
import FilterReview from './filter-review';
import ReviewContent from './review-content';
import ItemDetailActions from '@spo/redux/item-detail/action';
import EmptyView from '../../../components/common/empty-view';
import FilterReviewUpdated from './filter-review-updated';
import CustomPagination from '../../../components/common/custom-pagination';

function TabDetailProductReviewUpdated (props) {
    const LIMIT = 8
    const dispatch = useDispatch();
    const {
        loading: { loadingProductDetailReview },
        data: { productDetailReview },
    } = useSelector((state) => state.ItemDetail);
    const [filter, setFilter] = useState({
        Type: 1,
        Offset: 0,
        Limit: LIMIT
    })
    useEffect(() => {
        if (props.productDetail.Id) {
            let newParam = { ...filter, ProductId: props.productDetail.Id }
            setFilter(newParam)
            dispatch({
                type: ItemDetailActions.LOAD_PRODUCT_DETAIL_REVIEW,
                data: newParam,
            });
        }
    }, [props.productDetail.Id])

    function handleFilter (_filter) {
        let param = {};
        // Type search: 1 - all, 2: Have Comment, 3 Have media, 4 - smile, 5 - normal, 6 - sad
        switch (_filter?.Type) {
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
        param["Sort"] = _filter?.Sort
        param["Limit"] = filter["Limit"]
        param["Offset"] = 0
        setFilter(param);
        dispatch({
            type: ItemDetailActions.LOAD_PRODUCT_DETAIL_REVIEW,
            data: param,
        });
    }
    const handleChangePage = (e) => {
        let newParam = { ...filter }
        newParam["Offset"] = (Number.parseInt(e, 10) - 1) * filter["Limit"]
        dispatch({
            type: ItemDetailActions.LOAD_PRODUCT_DETAIL_REVIEW,
            data: newParam,
        });
    }
    return (
        <div className="tab-detail-product-review">
            <FilterReviewUpdated
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
            {
                productDetailReview?.Total > LIMIT && <div className="position-relative mt-3">
                    <CustomPagination
                        limit={LIMIT}
                        total={productDetailReview.Total}
                        pageRangeDisplayed={4}
                        onChange={(e) =>
                            handleChangePage(e)
                        }
                    />
                </div>
            }

        </div>
    );
}
TabDetailProductReviewUpdated.propTypes = {
    data: PropTypes.array,
};
TabDetailProductReviewUpdated.defaultProps = {
    data: [],
};
export default TabDetailProductReviewUpdated;
