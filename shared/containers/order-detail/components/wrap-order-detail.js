import PackageCart from '@spo/components/cart/package-cart';
import ButtonDark from '@spo/components/common/button-dark';
import ButtonLight from '@spo/components/common/button-light';
import Actions from '@spo/redux/account/actions';
import OrderDetailActions from '@spo/redux/order-detail/action';
import moment from 'moment';
import { useRouter } from 'next/router';
import { PropTypes } from 'prop-types';
import React, { useEffect, useState } from 'react';
import Currency from 'react-currency-formatter';
import { FormattedMessage } from 'react-intl';
import { connect, useDispatch, useSelector } from 'react-redux';
import CancelModal from '../../../components/account/order-management/modal/cancel-modal';
import ConfirmModal from '../../../components/account/order-management/modal/confirm-modal';
import ButtonMain from '../../../components/common/button-main';
import Display from '../../../components/common/display';
import constants from '../../../config/constants';
import PageList from '../../../config/PageList';
import useCustomRoute from '../../../library/use-custom-route';
import EventRegister, {
    EVENT_SHOW_POPUP,
    REVIEW_POPUP,
} from '../../../utils/EventRegister';
import Utils from '../../../utils/utils';
/**
 * ****************************************************************************
 * AnhDT WrapOrderInfo CODE
 * wrap-order-info.js
 *
 * description		:
 * created at		:	2020-11-08
 * created by		:	AnhDT
 * package			:	spo\shared\containers\order\components\wrap-order-info.js
 * copyright			:	Copyright (c) AnhDT
 * version			:	1.0.0
 * ****************************************************************************
 */

function WrapOrderInfo(props) {
    const router = useRouter();
    const dispatch = useDispatch();
    const orderDetail = useSelector(
        (state) => state.OrderDetail.data.orderDetail,
    );
    const { listReturnReason } = useSelector((state) => state.Common.data);
    const { reviewDetail } = useSelector((state) => state.Account);
    const [openReviewModal, setOpenReviewModal] = useState(false);
    const [openConfirmModal, setOpenConfirmModal] = useState(false);
    const [openCancelModal, setOpenCancelModal] = useState(false);
    
    useEffect(() => {
        dispatch({
            type: Actions.GET_CANCEL_REASON,
        });
    }, []);
    function goOrderList() {
        router.back();
        // useCustomRoute(dispatch, PageList.ORDER_MANAGEMENT.SERVER);
    }
    const handleReOrder = (orderCode) => {
        Utils.confirmPopup('Bạn có muốn mua lại hàng?', (e) => {
            if (e) {
                dispatch({
                    type: Actions.ON_REORDER,
                    data: { orderCode },
                    callback: (data) => {
                        useCustomRoute(dispatch, PageList.CART.SERVER, data);
                    },
                });
            }
        });
    };
    const toggleReviewModal = async (orderId) => {
        if (orderId) {
            dispatch({
                type: Actions.GET_REVIEW_DETAIL,
                data: {
                    Id: orderId,
                },
                callback: () => {
                    EventRegister.emit(EVENT_SHOW_POPUP, {
                        type: REVIEW_POPUP,
                        open: true,
                        payload: {
                            className: 'review_popup_container _mobile_screen',
                            callback: () => {
                                dispatch({
                                    type: OrderDetailActions.LOAD_ORDER_DETAIL,
                                    data: { orderId: orderDetail?.OrderId },
                                });
                            },
                        },
                        
                    });
                },
            });
        }
        // setOpenReviewModal(!openReviewModal);
    };
    const toggleConfirmModal = (code) => {
        setOpenConfirmModal(!openConfirmModal);
    };
    const handleConfirmOrder = () => {
        dispatch({
            type: Actions.RECEIVED_ORDER,
            data: { OrderCode: orderDetail.Code },
            orderId: orderDetail?.OrderId,
        });
        setOpenConfirmModal(false);
    };
    const handleReturnOrder = () => {
        setOpenConfirmModal(false);
        Utils.confirmPopup('Bạn có muốn trả hàng hay không?', () => {
            useCustomRoute(
                dispatch,
                `${PageList.ORDER_MANAGEMENT.SERVER}/${orderDetail.OrderId}?isReturn=true`,
            );
        });
    };
    const toggleCancelModal = (code, statusCode) => {
        localStorage.setItem('OrderCode', code);
        localStorage.setItem('StatusCode', statusCode);
        setOpenCancelModal(!openCancelModal);
    };
    const handleCancelOrder = (cancelReason) => {
        let orderCode = localStorage.getItem('OrderCode');
        let statusCode = localStorage.getItem('StatusCode');
        let status = [constants.ORDER_STATUS.NEW];

        if (statusCode == constants.ORDER_STATUS.NEW) {
            status = [constants.ORDER_STATUS.NEW];
        } else if (
            statusCode == constants.ORDER_STATUS.CONFIRMED ||
            statusCode == constants.ORDER_STATUS.PREPARING
        ) {
            status = [
                constants.ORDER_STATUS.CONFIRMED,
                constants.ORDER_STATUS.PREPARING,
            ];
        }
        setOpenCancelModal(false);
        dispatch({
            type: Actions.CANCEL_ORDER,
            data: { OrderCode: orderCode, CancelReason: cancelReason },
            status: status.toString(),
            orderId: orderDetail?.OrderId,
        });
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
    //         type: Actions.REVIEW_ORDER,
    //         data: newData,
    //         status: constants.ORDER_STATUS.FINISHED,
    //         orderId: orderDetail?.OrderId,
    //     });
    //     // dispatch({ type: OrderDetailActions.LOAD_ORDER_DETAIL, data: {orderId: orderDetail?.OrderId} });
    // };
    const handleCopy = (data) => {
        Utils.alertPopup('Đã sao chép', () => {});
        navigator.clipboard.writeText(data);
    };
    const goChat = () => {
        window.open(constants.SOCIAL_MEDIA['fb']);
    };
    return (
        <>
            {/* {openReviewModal ? (
                <ReviewModal
                    active={openReviewModal}
                    hide={toggleReviewModal}
                    detail={reviewDetail}
                    handleClick={handleSendReviewOrder}
                />
            ) : null} */}
            {openConfirmModal && (
                <ConfirmModal
                    active={openConfirmModal}
                    hide={toggleConfirmModal}
                    onConfirm={handleConfirmOrder}
                    onReturn={handleReturnOrder}
                />
            )}
            {openCancelModal && (
                <CancelModal
                    active={openCancelModal}
                    hide={toggleCancelModal}
                    handleClick={handleCancelOrder}
                />
            )}
            <div className="col-12 px-0" style={{ display: 'block' }}>
                <div className="d-start">
                    <div
                        className="order-detail-go-back pointer d-flex align-items-center"
                        onClick={goOrderList}>
                        <img
                            className="order-arrow-back"
                            src="/images/icon/order-detail/ic_back.svg"></img>
                        <span className="order-arrow-back-text">
                            Quản lý đơn hàng
                        </span>
                    </div>
                </div>
                {orderDetail?.OrderStatus == constants.ORDER_STATUS.REFUNDING ||
                orderDetail?.OrderStatus == constants.ORDER_STATUS.RETURNED ||
                orderDetail?.OrderStatus ==
                    constants.ORDER_STATUS.CONFIRM_REFUNDED ? (
                        <div className="block-info-border" style={{ height: 98 }}>
                            <div>Khiếu nại đang xử lí</div>
                            <div>Yêu cầu không được chấp nhận</div>

                        </div>
                    ) : (
                        <div className="order-info-tab">
                            <div className="d-flex flex-column">
                                <span
                                    className="label-order-waiting-confirm"
                                    style={{ paddingBottom: 10 }}>
                                    {orderDetail?.OrderStatusName}
                                </span>
                                {orderDetail?.OrderStatus ==
                                constants.ORDER_STATUS.NEW && (
                                    <span
                                        className="label-order-waiting-confirm"
                                        style={{ fontWeight: 300 }}>
                                    Đang chờ hệ thống xác nhận đơn hàng.
                                    </span>
                                )}
                                {(orderDetail?.OrderStatus ==
                                constants.ORDER_STATUS.CONFIRMED ||
                                orderDetail?.OrderStatus ==
                                    constants.ORDER_STATUS.PREPARING) && (
                                    <span
                                        className="label-order-waiting-confirm"
                                        style={{ fontWeight: 300 }}>
                                    FM đang chuẩn bị đơn hàng cho bạn.
                                    </span>
                                )}
                                {(orderDetail?.OrderStatus ==
                                constants.ORDER_STATUS.DELIVERING ||
                                orderDetail?.OrderStatus ==
                                    constants.ORDER_STATUS.DELIVERED) && (
                                    <span
                                        className="label-order-waiting-confirm"
                                        style={{ fontWeight: 300 }}>
                                    Đơn hàng đang được giao đến bạn.
                                    </span>
                                )}
                                {(orderDetail?.OrderStatus ==
                                constants.ORDER_STATUS.CONFIRM_SHIPPED ||
                                orderDetail?.OrderStatus ==
                                    constants.ORDER_STATUS.FINISHED) && (
                                    <span
                                        className="label-order-waiting-confirm"
                                        style={{ fontWeight: 300 }}>
                                    Cảm ơn bạn đã mua sắm tại FM
                                    </span>
                                )}
                                {orderDetail?.OrderStatus ==
                                constants.ORDER_STATUS.CANCEL && (
                                    <span
                                        className="label-order-waiting-confirm"
                                        style={{ fontWeight: 300 }}>
                                    Đơn hàng này của bạn đã bị hủy.
                                    </span>
                                )}
                            </div>
                            {orderDetail?.OrderStatus ==
                            constants.ORDER_STATUS.NEW && (
                                <img
                                    src="/images/icon/order-detail/chothanhtoan.svg"
                                    className='icon-chothanhtoan'
                                    style={{ width: 67}}
                                />
                            )}
                            {(orderDetail?.OrderStatus ==
                            constants.ORDER_STATUS.CONFIRMED ||
                            orderDetail?.OrderStatus ==
                                constants.ORDER_STATUS.PREPARING) && (
                                <img
                                    src="/images/icon/order-detail/Chuanbihang.svg"
                                    style={{ width: 91, marginRight: 30 }}
                                />
                            )}
                            {(orderDetail?.OrderStatus ==
                            constants.ORDER_STATUS.DELIVERING ||
                            orderDetail?.OrderStatus ==
                                constants.ORDER_STATUS.DELIVERED) && (
                                <img
                                    src="/images/icon/order-detail/danggiaohang.svg"
                                    style={{ width: 66, marginRight: 30 }}
                                />
                            )}
                            {orderDetail?.OrderStatus ==
                            constants.ORDER_STATUS.CANCEL && (
                                <img
                                    src="/images/icon/order-detail/donhangdahuy.svg"
                                    style={{ width: 54, marginRight: 30 }}
                                />
                            )}
                            {(orderDetail?.OrderStatus ==
                            constants.ORDER_STATUS.CONFIRM_SHIPPED ||
                            orderDetail?.OrderStatus ==
                                constants.ORDER_STATUS.FINISHED) && (
                                <img
                                    src="/images/icon/order-detail/donhangdahoanthanh.svg"
                                    style={{ width: 49, marginRight: 30 }}
                                />
                            )}
                        </div>
                    )}
                {orderDetail?.OrderStatus ==
                    constants.ORDER_STATUS.DELIVERING && (
                    <div style={{ paddingTop: 30 }}>
                        <div className="block-info-border">
                            <div className="d-flex flex-column">
                                <span
                                    style={{
                                        fontSize: 16,
                                        color: '#333333',
                                        fontWeight: 400,
                                        paddingBottom: 10,
                                    }}>
                                    Những điều cần lưu ý khi nhận hàng
                                </span>
                                <span
                                    style={{
                                        fontSize: 16,
                                        color: '#333333',
                                        fontWeight: 300,
                                    }}>
                                    Nếu có vấn đề khi nhận đơn hàng , vui lòng
                                    gửi yêu cầu trả hàng/ hoàn tiền trong vòng
                                    03 ngày kể từ khi đơn hàng giao thành công.
                                </span>
                            </div>
                        </div>
                    </div>
                )}
                {orderDetail?.OrderStatus == constants.ORDER_STATUS.REFUNDING ||
                orderDetail?.OrderStatus == constants.ORDER_STATUS.RETURNED ||
                orderDetail?.OrderStatus ==
                    constants.ORDER_STATUS.CONFIRM_REFUNDED ? (
                        <div
                            className="row mx-0"
                            style={{ paddingTop: 30, paddingBottom: 30 }}>
                            <div className="col-6 px-0 ">
                                <div
                                    className="block-info-border"
                                    style={{ marginRight: 17.5 }}>
                                    <div
                                        className="d-flex align-items-center justify-content-between"
                                        style={{
                                            paddingBottom: 15,
                                            borderBottom: '1px inset',
                                        }}>
                                        <div>Lý do yêu cầu Trả hàng/ Hoàn tiền</div>
                                        <span className="text-time">
                                            {orderDetail?.OrderedAt &&
                                         moment(
                                             orderDetail?.OrderedAt,
                                         ).format(
                                             'DD.MM.YYYY - HH:mm',
                                         )}
                                        </span>
                                    </div>
                                    <div style={{ paddingTop: 15 }}>
                                        <div>
                                            {
                                                orderDetail?.OrderAttachments?.map(v=>{
                                                    return <img 
                                                        key={v}
                                                        className="order-image"
                                                        src={v.LinkFile}
                                                        style={{
                                                            width: '142px',
                                                            maxWidth: '142px',
                                                            height: '142px',
                                                            flex: 1,
                                                            marginRight :10,
                                                            objectFit:'cover',
                                                            flexWrap: 'wrap',
                                                            marginBottom: 5
                                                        }}
                                                  
                                                    />
                                                })
                                            }
                                        </div>
                                        <div style={{ paddingTop: 15 }}>
                                            {
                                                listReturnReason.find((item,key)=>{
                                                    return orderDetail.RefundReason == item?.Id
                                                })?.Name
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-6 px-0 ">
                                <div
                                    className="block-info-border"
                                    style={{ marginLeft: 17.5 }}>
                                    <div
                                        className="d-flex align-items-center justify-content-between"
                                        style={{
                                            paddingBottom: 15,
                                            borderBottom: '1px inset',
                                        }}>
                                        <div>Phản hồi của Shop</div>
                                        <span className="text-time">
                                            {orderDetail?.OrderedAt &&
                                         moment(
                                             orderDetail?.OrderedAt,
                                         ).format(
                                             'DD.MM.YYYY - HH:mm',
                                         )}
                                        </span>
                                    </div>
                                    <div style={{ paddingTop: 15 }}>
                                    Chúng tôi sẽ gửi lại đúng hàng cho bạn
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="address-order-block">
                            <div className="block-info-border">
                                <img
                                    src="/images/icon/order-detail/ic_location.svg"
                                    style={{ width: 14 }}></img>
                                <span
                                    style={{
                                        paddingLeft: 8,
                                        fontSize: 16,
                                        fontWeight: 500,
                                    }}>
                                Địa chỉ nhận hàng
                                </span>
                                <div className="address-order">
                                    <span className="">
                                        {orderDetail?.OrderAddress?.FullName}
                                    </span>
                                    <span className="">
                                        {orderDetail?.OrderAddress?.Phone}
                                    </span>
                                    <span className="">
                                        {orderDetail?.OrderAddress?.Address}{', '}
                                        {orderDetail?.OrderAddress?.CommuneName}{', '}
                                        {orderDetail?.OrderAddress?.DistrictName}{', '}
                                        {orderDetail?.OrderAddress?.ProvinceName}{' '}
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}
                <PackageCart
                    items={orderDetail?.OrderDetails}
                    readonly={true}></PackageCart>
                <div className="order-summary row mx-0" style={{}}>
                    <div className="order-summary-left col-12 col-lg-4 pl-0 inline-block-order">
                        <div  className="block-info-border order-summary-price ">
                            <div
                                style={{
                                    borderBottom: '1px inset',
                                    paddingBottom: 10,
                                }}>
                                <div className="row mx-0">
                                    <div className="px-0 col-6 text-left">
                                        <span className="order-summary-text">
                                            Tổng tiền hàng
                                        </span>
                                    </div>
                                    <div className="px-0 col-6 text-right order-summary-text">
                                        <Currency
                                            quantity={
                                                orderDetail?.PaymentSalePrice ||
                                                0
                                            }
                                            currency="VND"
                                            pattern="##,### !"
                                            symbol=""
                                        />
                                        <span className="currency fontsize11">
                                            VND
                                        </span>
                                    </div>
                                </div>
                                <div className="row mx-0">
                                    <div className="px-0 col-6 text-left">
                                        <span className="order-summary-text">
                                            Phí vận chuyển
                                        </span>
                                    </div>
                                    <div className="px-0 col-6 text-right order-summary-text">
                                        <Currency
                                            quantity={
                                                orderDetail?.ShipmentPrice || 0
                                            }
                                            currency="VND"
                                            pattern="##,### !"
                                            symbol=""
                                        />
                                        <span className="currency fontsize11">
                                            VND
                                        </span>
                                    </div>
                                </div>
                                <div className="row mx-0">
                                    <div className="px-0 col-7 text-left">
                                        <span className="order-summary-text">
                                            Miễn phí vận chuyển
                                        </span>
                                    </div>
                                    <div className="px-0 col-5   text-right order-summary-text">
                                        <Currency
                                            quantity={
                                                orderDetail?.FreeShipDiscountPrice ||
                                                0
                                            }
                                            currency="VND"
                                            pattern="##,### !"
                                            symbol=""
                                        />
                                        <span className="currency fontsize11">
                                            VND
                                        </span>
                                    </div>
                                </div>
                                <div className="row mx-0">
                                    <div className="px-0 col-6 text-left">
                                        <span className="order-summary-text">
                                            Giảm trừ
                                        </span>
                                    </div>
                                    <div className="px-0 col-6 text-right order-summary-text">
                                        <Currency
                                            quantity={
                                                orderDetail?.VoucherPrice || 0
                                            }
                                            currency="VND"
                                            pattern="##,### !"
                                            symbol=""
                                        />
                                        <span className="currency fontsize11">
                                            VND
                                        </span>
                                    </div>
                                </div>
                                <div className="row mx-0">
                                    <div className="px-0 col-6 text-left">
                                        <span className="order-summary-text">
                                            Tổng thanh toán
                                        </span>
                                    </div>
                                    <div
                                        className="px-0 col-6 text-right order-summary-text"
                                        style={{ color: '#FF2C00' }}>
                                        <Currency
                                            quantity={
                                                orderDetail?.PaymentTotal || 0
                                            }
                                            currency="VND"
                                            pattern="##,### !"
                                            symbol=""
                                        />
                                        <span className="currency fontsize11">
                                            VND
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div
                                className="mx-0 d-flex justify-content-between"
                                style={{ paddingTop: 10 }}>
                                <div className="px-0 d-flex">
                                    <img
                                        src="/images/icon/order-detail/ic_money.svg"
                                        style={{ width: 18 }}
                                    />
                                    <span
                                        className="order-summary-text"
                                        style={{ paddingLeft: 5 }}>
                                        Phương thức thanh toán
                                    </span>
                                </div>
                                <div className="px-0 text-right">
                                    <span className="order-summary-text">
                                        {orderDetail?.PaymentMethodName}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="order-summary-right col-12 col-lg-8 pr-0">
                        <div
                            className="block-info-border"
                            style={{ padding: 15, width: '100%' }}>
                            <div
                                className="d-flex justify-content-between align-items-center"
                                style={{ paddingBottom: 23 }}>
                                <div className="">
                                    <div
                                        className=""
                                        style={{
                                            fontSize: 16,
                                            color: '#333333',
                                            fontWeight: 500,
                                        }}>
                                        <FormattedMessage id="order.order_code" />
                                    </div>
                                </div>
                                <div
                                    className="d-flex align-items-center"
                                    style={{
                                        fontSize: 16,
                                        color: '#333333',
                                        fontWeight: 500,
                                    }}>
                                    <span>{orderDetail?.Code}</span>
                                    <img
                                        className="hover-color-svg"
                                        title="Copy"
                                        onClick={() => {
                                            handleCopy(orderDetail?.Code);
                                        }}
                                        src="/images/icon/order-detail/ic_copy.svg"
                                        style={{
                                            width: 20,
                                            height: 26,
                                            marginLeft: 20,
                                        }}></img>
                                </div>
                            </div>
                            <div className="d-flex justify-content-between status-time-block">
                                {(orderDetail?.OrderStatus ==
                                    constants.ORDER_STATUS.NEW ||
                                    orderDetail?.OrderStatus ==
                                        constants.ORDER_STATUS.CONFIRMED ||
                                    orderDetail?.OrderStatus ==
                                        constants.ORDER_STATUS.PREPARING ||
                                    orderDetail?.OrderStatus ==
                                        constants.ORDER_STATUS.DELIVERING ||
                                    orderDetail?.OrderStatus ==
                                        constants.ORDER_STATUS
                                            .CONFIRM_SHIPPED ||
                                    orderDetail?.OrderStatus ==
                                        constants.ORDER_STATUS.DELIVERED ||
                                    orderDetail?.OrderStatus ==
                                        constants.ORDER_STATUS.FINISHED) && (
                                    <>
                                        <div className="d-center flex-column status-time-order">
                                            {orderDetail?.OrderedAt ? (
                                                <img
                                                    src="/images/icon/order-detail/thoigiandathang-active.svg"
                                                    className="img-status"></img>
                                            ) : (
                                                <img
                                                    src="/images/icon/order-detail/thoigiandathang.svg"
                                                    className="img-status"></img>
                                            )}
                                            <span className="text-task">
                                                Thời gian đặt hàng
                                            </span>
                                            <span className="text-time">
                                                {orderDetail?.OrderedAt &&
                                                    moment(
                                                        orderDetail?.OrderedAt,
                                                    ).format(
                                                        'DD.MM.YYYY - HH:mm',
                                                    )}
                                            </span>
                                        </div>
                                        <div className="d-center flex-column status-time-order">
                                            {orderDetail?.PaymentAt ? (
                                                <img
                                                    src="/images/icon/order-detail/thoigianthanhtoan-active.svg"
                                                    className="img-status"></img>
                                            ) : (
                                                <img
                                                    src="/images/icon/order-detail/thoigianthanhtoan.svg"
                                                    className="img-status"></img>
                                            )}
                                            <span className="text-task">
                                                Thời gian thanh toán
                                            </span>
                                            <span className="text-time">
                                                {orderDetail?.PaymentAt &&
                                                    moment(
                                                        orderDetail?.PaymentAt,
                                                    ).format(
                                                        'DD.MM.YYYY - HH:mm',
                                                    )}
                                            </span>
                                        </div>
                                        <div className="d-center flex-column status-time-order">
                                            {orderDetail?.ShippingAt ? (
                                                <img
                                                    src="/images/icon/order-detail/thoigiangiaohangchovanchuyen-active.svg"
                                                    className="img-status"></img>
                                            ) : (
                                                <img
                                                    src="/images/icon/order-detail/thoigiangiaohangchovanchuyen.svg"
                                                    className="img-status"></img>
                                            )}
                                            <span className="text-task">
                                                Thời gian giao hàng cho vận
                                                chuyển
                                            </span>
                                            <span className="text-time">
                                                {orderDetail?.ShippingAt &&
                                                    moment(
                                                        orderDetail?.ShippingAt,
                                                    ).format(
                                                        'DD.MM.YYYY - HH:mm',
                                                    )}
                                            </span>
                                        </div>
                                        <div className="d-center flex-column status-time-order">
                                            {orderDetail?.ReceivedAt ? (
                                                <img
                                                    src="/images/icon/order-detail/thoigiandathang-active.svg"
                                                    className="img-status"></img>
                                            ) : (
                                                <img
                                                    src="/images/icon/order-detail/thoigiandathang.svg"
                                                    className="img-status"></img>
                                            )}
                                            <span className="text-task">
                                                Thời gian hoàn thành
                                            </span>
                                            <span className="text-time">
                                                {orderDetail?.ReceivedAt &&
                                                    moment(
                                                        orderDetail?.ReceivedAt,
                                                    ).format(
                                                        'DD.MM.YYYY - HH:mm',
                                                    )}
                                            </span>
                                        </div>
                                    </>
                                )}
                                {orderDetail?.OrderStatus ==
                                    constants.ORDER_STATUS.CANCEL && (
                                    <>
                                        <div className="d-center flex-column status-time-order">
                                            <img
                                                src="/images/icon/order-detail/thoigiandathang-active.svg"
                                                className="img-status"></img>
                                            <span className="text-task">
                                                Thời gian đặt hàng
                                            </span>
                                            <span className="text-time">
                                                {orderDetail?.OrderedAt &&
                                                    moment(
                                                        orderDetail?.OrderedAt,
                                                    ).format(
                                                        'DD.MM.YYYY - HH:mm',
                                                    )}
                                            </span>
                                            <Display>
                                                <span className="text-task text-left w-100 reason-cancel-text-height">
                                                    Lý do huỷ:
                                                </span>
                                                <span className="text-task text-left w-100">
                                                    Huỷ bởi:
                                                </span>
                                            </Display>
                                        </div>
                                        <div className="d-end flex-column status-time-order">
                                            <img
                                                src="/images/icon/order-detail/thoigianhuy.svg"
                                                className="img-status"></img>
                                            <span className="text-task">
                                                Thời gian huỷ
                                            </span>
                                            <span className="text-time">
                                                {orderDetail?.CancelAt &&
                                                    moment(
                                                        orderDetail?.CancelAt,
                                                    ).format(
                                                        'DD.MM.YYYY - HH:mm',
                                                    )}
                                            </span>
                                            <Display>
                                                <span className="text-right w-100 reason-cancel-text-height">
                                                    {orderDetail?.CancelReason}
                                                </span>
                                                <span
                                                    className="text-right w-100"
                                                    style={{
                                                        color: '#FF2C00',
                                                        fontWeight: 500,
                                                        fontSize: 16,
                                                    }}>
                                                    {orderDetail?.CancelBy}
                                                </span>
                                            </Display>
                                        </div>
                                        <Display mobile={true}>
                                            <div className="reason">
                                                <div className="d-flex">
                                                    <span className="text-task text-left reason-cancel-text-height">
                                                        Lý do huỷ:
                                                    </span>
                                                    <span
                                                        className="text-right reason-cancel-text-height"
                                                        style={{
                                                            paddingLeft: 5,
                                                        }}
                                                    >
                                                        {
                                                            orderDetail?.CancelReason
                                                        }
                                                    </span>
                                                </div>
                                                <div className="d-flex">
                                                    <span className="text-task text-left ">
                                                        Huỷ bởi:
                                                    </span>
                                                    <span
                                                        className="text-right"
                                                        style={{
                                                            color: '#FF2C00',
                                                            fontWeight: 500,
                                                            fontSize: 16,
                                                            paddingLeft: 18,
                                                        }}
                                                    >
                                                        {orderDetail?.CancelBy}
                                                    </span>
                                                </div>
                                            </div>
                                        </Display>
                                    </>
                                )}

                                {(orderDetail?.OrderStatus ==
                                    constants.ORDER_STATUS.REFUNDING ||
                                    orderDetail?.OrderStatus ==
                                        constants.ORDER_STATUS.RETURNED ||
                                    orderDetail?.OrderStatus ==
                                        constants.ORDER_STATUS
                                            .CONFIRM_REFUNDED) && (
                                    <>
                                        <div className="d-center flex-column status-time-order">
                                            <img
                                                src="/images/icon/order-detail/thoigianyeucautrahang.svg"
                                                className="img-status"></img>
                                            <span className="text-task">
                                                Thời gian yêu cầu trả hàng
                                            </span>
                                            <span className="text-time">
                                                {orderDetail?.OrderedAt &&
                                                    moment(
                                                        orderDetail?.OrderedAt,
                                                    ).format(
                                                        'DD.MM.YYYY - HH:mm',
                                                    )}
                                                {/* TODO */}
                                            </span>
                                        </div>
                                        <div className="d-end flex-column status-time-order">
                                            <img
                                                src="/images/icon/order-detail/thoigianketthuctrahang.svg"
                                                className="img-status"></img>
                                            <span className="text-task">
                                                Thời gian kết thúc trả hàng
                                            </span>
                                            <span className="text-time">
                                                {orderDetail?.CancelAt &&
                                                    moment(
                                                        orderDetail?.CancelAt,
                                                    ).format(
                                                        'DD.MM.YYYY - HH:mm',
                                                    )}
                                                {/* TODO */}
                                            </span>
                                        </div>
                                    </>
                                )}
                            </div>

                            <div
                                className={`d-flex justify-content-between`}
                                style={{ paddingTop: 18 }}>
                                {(orderDetail?.OrderStatus ==
                                    constants.ORDER_STATUS.CANCEL ||
                                    orderDetail?.OrderStatus ==
                                        constants.ORDER_STATUS.REFUNDING ||
                                    orderDetail?.OrderStatus ==
                                        constants.ORDER_STATUS.RETURNED ||
                                    orderDetail?.OrderStatus ==
                                        constants.ORDER_STATUS
                                            .CONFIRM_REFUNDED) && (
                                    <div  className="row mx-0 w-100 d-flex justify-content-center">
                                        <div className="col-lg-6 col-12 px-0 w-100">
                                            <div style={{ height: 39 }}>
                                                <ButtonMain
                                                    className="w-100"
                                                    title="Mua lại"
                                                    onClick={() =>
                                                        handleReOrder(
                                                            orderDetail.Code,
                                                        )
                                                    }
                                                    type="submit"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Đã xác nhận Đang chuẩn bị */}
                                {(orderDetail?.OrderStatus ==
                                    constants.ORDER_STATUS.NEW ||
                                    orderDetail?.OrderStatus ==
                                        constants.ORDER_STATUS.CONFIRMED ||
                                    orderDetail?.OrderStatus ==
                                        constants.ORDER_STATUS.PREPARING) && (
                                    <div className="row mx-0 w-100">
                                        <div className="col-lg-6 col-12 px-0">
                                            <div className="order-detail-button-mg-right">
                                                <ButtonMain
                                                    className="w-100"
                                                    title="Chat ngay"
                                                    onClick={goChat}
                                                    type="submit"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-12 px-0">
                                            <div
                                                className="order-detail-button-mg-left"
                                                style={{
                                                    border: '1px solid #707070',
                                                }}>
                                                <ButtonLight
                                                    className="w-100"
                                                    title="Huỷ đặt hàng"
                                                    onClick={() =>
                                                        toggleCancelModal(
                                                            orderDetail.Code,
                                                            orderDetail.OrderStatus,
                                                        )
                                                    }
                                                    type="submit"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {/* Hoàn thành đơn hàng && Đã xác nhận giao hàng */}
                                {(orderDetail?.OrderStatus ==
                                    constants.ORDER_STATUS.CONFIRM_SHIPPED ||
                                    orderDetail?.OrderStatus ==
                                        constants.ORDER_STATUS.FINISHED) && (
                                    <>
                                        <div className="row mx-0 w-100">
                                            <div className="col-lg-6 col-12 px-0">
                                                <div className="order-detail-button-mg-right">
                                                    <ButtonMain
                                                        className="w-100"
                                                        title="Mua lại"
                                                        onClick={() =>
                                                            handleReOrder(
                                                                orderDetail.Code,
                                                            )
                                                        }
                                                        type="submit"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-12 px-0">
                                                <div
                                                    className="order-detail-button-mg-left"
                                                    style={{
                                                        border: '1px solid #707070',
                                                    }}>
                                                    {orderDetail?.ReviewId ? (
                                                        <ButtonLight
                                                            className="w-100"
                                                            title="Chi tiết đánh giá"
                                                            onClick={() =>
                                                                toggleReviewModal(
                                                                    orderDetail.OrderId,
                                                                )
                                                            }
                                                            type="submit"
                                                        />
                                                    ) : (
                                                        <ButtonLight
                                                            className="w-100"
                                                            title="Đánh giá ngay"
                                                            onClick={() =>
                                                                toggleReviewModal(
                                                                    orderDetail.OrderId,
                                                                )
                                                            }
                                                            type="submit"
                                                        />
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )}
                                {/* Đang giao hàng */}
                                {orderDetail?.OrderStatus ==
                                    constants.ORDER_STATUS.DELIVERING && (
                                    <div className="row mx-0 w-100">
                                        {orderDetail?.OrderStatus ==
                                            constants.ORDER_STATUS
                                                .DELIVERING && (
                                            <div className="col-lg-6 col-12 px-0">
                                                <div style={{ height: 39 }}>
                                                    <ButtonMain
                                                        className="w-100"
                                                        title="Chat ngay"
                                                        onClick={goChat}
                                                        type="submit"
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                                {/* Đã nhận hàng */}
                                {orderDetail?.OrderStatus ==
                                    constants.ORDER_STATUS.DELIVERED && (
                                    <>
                                        <div className="row mx-0 w-100">
                                            <div className="col-lg-6 col-12 px-0">
                                                <div className="order-detail-button-mg-right">
                                                    <ButtonMain
                                                        className="w-100"
                                                        title="Chat ngay"
                                                        onClick={goChat}
                                                        type="submit"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-12 px-0">
                                                <div
                                                    className="order-detail-button-mg-left"
                                                    style={{
                                                        border: '1px solid #707070',
                                                    }}>
                                                    <ButtonLight
                                                        className="w-100"
                                                        title="Đã nhận được hàng"
                                                        onClick={() =>
                                                            toggleConfirmModal(
                                                                orderDetail.OrderId,
                                                            )
                                                        }
                                                        type="submit"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

WrapOrderInfo.propTypes = {
    items: PropTypes.array,
};
WrapOrderInfo.defaultProps = {
    items: [],
};
WrapOrderInfo = connect((state) => ({}))(WrapOrderInfo);
export default WrapOrderInfo;
