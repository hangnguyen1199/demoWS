import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MyReviewsActions from '@spo/redux/my-reviews/action';
import AccountActions from '@spo/redux/account/actions';
import constants from '../../config/constants';
import ReviewModal from '@spo/components/account/order-management/modal/review-modal';

import ButtonDark from '@spo/components/common/button-dark';
import ButtonLight from '@spo/components/common/button-light';
import EventRegister, { EVENT_SHOW_POPUP, REVIEW_POPUP } from '../../utils/EventRegister';
import ButtonMain from '../common/button-main';

const OrderReviewItem = (props) => {
    const dispatch = useDispatch();
    const { data } = props;
    const { reviewDetail } = useSelector((state) => state.Account);
    const [openReviewModal, setOpenReviewModal] = useState(false);
    const toStringNumber = (num) => {
        if (num == null || num == '') {
            return '0';
        }
        return (`${Math.round(num)  }`).replace(/(\d)(?=(\d{3})+$)/g, '$1.');
    };
    const toDateString = (str) => {
        return `${str.substring(8,10)}.${str.substring(5,7)}.${str.substring(0,4)} - ${str.substring(11,16)}`;
    };
    const toggleReviewModal = async () => {
        if (!openReviewModal) {
            dispatch({
                type: AccountActions.GET_REVIEW_DETAIL,
                data: {
                    Id: data?.OrderId,
                },
                callback: () => {
                    EventRegister.emit(EVENT_SHOW_POPUP, {
                        type: REVIEW_POPUP,
                        open: true,
                        payload: {
                            order:data,
                            from:"reviews",
                            className: 'review_popup_container _mobile_screen',
                            callback: () => {
                                
                            },
                        },
                    });
                },
            });
        }
        // setOpenReviewModal(!openReviewModal);
    };
    // const handleSendReviewOrder = (data) => {
    //     let Files = [];
    //     data?.OrderDetailReviews.map((item, idx) => {
    //         let oldItem = reviewDetail.OrderDetailReviews[idx];
    //         if (oldItem['OrderDetailId']) {
    //             item['OrderDetailId'] = oldItem['OrderDetailId'];
    //         }
    //         item['OrderDetailReviewId'] = oldItem['OrderDetailReviewId'];
    //         item['FileIndexes'] = [];
    //         item.Files?.map((file, index) => {
    //             let oldImage = [];
    //             if (file?.Id) {
    //                 oldImage.push(file);
    //             } else {
    //                 item['FileIndexes'][index] = Files?.length;
    //                 Files.push(file);
    //             }
    //             item['Attachments'] = oldImage;
    //         });
    //         delete item.Files;
    //     });

    //     let newData = {
    //         OrderId: reviewDetail?.OrderId,
    //         Files: Files,
    //         RateService: data?.RateService,
    //         RateShipment: data?.RateShipment,
    //         OrderDetailReviews: data?.OrderDetailReviews,
    //     };
    //     if (reviewDetail['ReviewId'] != 0) {
    //         newData['ReviewId'] = reviewDetail['ReviewId'];
    //     }
    //     setOpenReviewModal(false);
    //     dispatch({
    //         type: AccountActions.REVIEW_ORDER,
    //         data: newData,
    //         status: constants.ORDER_STATUS.FINISHED,
    //     });
    // };
    return (
        <div className="order-review-item">
            <div className="review-header">
                <p>{toDateString(data.CreatedAt)}</p>
                <p className="text-right status-name">{data.StatusName}</p>
            </div>
            <div className="review-content">
                <div className="thumb">
                    <img src={data.Thumb} alt={data.OrderCode}/>
                </div>
                <div className="order-info">
                    {data.BranchName && <p><label>Cửa hàng</label>: {data.BranchName}</p>}
                    <p><label>Số hoá đơn</label>: {data.OrderCode}</p>
                    <p><label>Số lượng</label>: {toStringNumber(data.NumberOfProduct)} sản phẩm</p>
                    <p><label>Tổng thanh toán</label>: {toStringNumber(data.TotalPrice)} <span>VND</span></p>
                </div>
                <div className="div-button">
                    {data.ReviewId == 0 ?
                        <ButtonLight
                            className="btn-order py-3"
                            title={'Đánh giá ngay'}
                            onClick={()=>{toggleReviewModal()}}
                            fontSize={14}
                        />:
                        <ButtonMain
                            className="btn-order"
                            title={'Đánh giá lại'}
                            onClick={()=>{toggleReviewModal()}}
                            fontSize={14}
                        />
                    }
                </div>
            </div>
            {/* {openReviewModal && 
                <ReviewModal
                    active={openReviewModal}
                    hide={()=>{toggleReviewModal()}}
                    detail={reviewDetail}
                    handleClick={handleSendReviewOrder}
                    from={'reviews'}
                    order={data}
                />
            } */}
        </div>
    );
};

export default OrderReviewItem;
