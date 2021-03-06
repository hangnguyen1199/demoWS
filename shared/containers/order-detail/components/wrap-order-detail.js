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
        Utils.confirmPopup('B???n c?? mu???n mua l???i h??ng?', (e) => {
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
        Utils.confirmPopup('B???n c?? mu???n tr??? h??ng hay kh??ng?', () => {
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
        Utils.alertPopup('???? sao ch??p', () => {});
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
                            Qu???n l?? ????n h??ng
                        </span>
                    </div>
                </div>
                {orderDetail?.OrderStatus == constants.ORDER_STATUS.REFUNDING ||
                orderDetail?.OrderStatus == constants.ORDER_STATUS.RETURNED ||
                orderDetail?.OrderStatus ==
                    constants.ORDER_STATUS.CONFIRM_REFUNDED ? (
                        <div className="block-info-border" style={{ height: 98 }}>
                            <div>Khi???u n???i ??ang x??? l??</div>
                            <div>Y??u c???u kh??ng ???????c ch???p nh???n</div>

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
                                    ??ang ch??? h??? th???ng x??c nh???n ????n h??ng.
                                    </span>
                                )}
                                {(orderDetail?.OrderStatus ==
                                constants.ORDER_STATUS.CONFIRMED ||
                                orderDetail?.OrderStatus ==
                                    constants.ORDER_STATUS.PREPARING) && (
                                    <span
                                        className="label-order-waiting-confirm"
                                        style={{ fontWeight: 300 }}>
                                    FM ??ang chu???n b??? ????n h??ng cho b???n.
                                    </span>
                                )}
                                {(orderDetail?.OrderStatus ==
                                constants.ORDER_STATUS.DELIVERING ||
                                orderDetail?.OrderStatus ==
                                    constants.ORDER_STATUS.DELIVERED) && (
                                    <span
                                        className="label-order-waiting-confirm"
                                        style={{ fontWeight: 300 }}>
                                    ????n h??ng ??ang ???????c giao ?????n b???n.
                                    </span>
                                )}
                                {(orderDetail?.OrderStatus ==
                                constants.ORDER_STATUS.CONFIRM_SHIPPED ||
                                orderDetail?.OrderStatus ==
                                    constants.ORDER_STATUS.FINISHED) && (
                                    <span
                                        className="label-order-waiting-confirm"
                                        style={{ fontWeight: 300 }}>
                                    C???m ??n b???n ???? mua s???m t???i FM
                                    </span>
                                )}
                                {orderDetail?.OrderStatus ==
                                constants.ORDER_STATUS.CANCEL && (
                                    <span
                                        className="label-order-waiting-confirm"
                                        style={{ fontWeight: 300 }}>
                                    ????n h??ng n??y c???a b???n ???? b??? h???y.
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
                                    Nh???ng ??i???u c???n l??u ?? khi nh???n h??ng
                                </span>
                                <span
                                    style={{
                                        fontSize: 16,
                                        color: '#333333',
                                        fontWeight: 300,
                                    }}>
                                    N???u c?? v???n ????? khi nh???n ????n h??ng , vui l??ng
                                    g???i y??u c???u tr??? h??ng/ ho??n ti???n trong v??ng
                                    03 ng??y k??? t??? khi ????n h??ng giao th??nh c??ng.
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
                                        <div>L?? do y??u c???u Tr??? h??ng/ Ho??n ti???n</div>
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
                                        <div>Ph???n h???i c???a Shop</div>
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
                                    Ch??ng t??i s??? g???i l???i ????ng h??ng cho b???n
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
                                ?????a ch??? nh???n h??ng
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
                                            T???ng ti???n h??ng
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
                                            Ph?? v???n chuy???n
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
                                            Mi???n ph?? v???n chuy???n
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
                                            Gi???m tr???
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
                                            T???ng thanh to??n
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
                                        Ph????ng th???c thanh to??n
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
                                                Th???i gian ?????t h??ng
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
                                                Th???i gian thanh to??n
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
                                                Th???i gian giao h??ng cho v???n
                                                chuy???n
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
                                                Th???i gian ho??n th??nh
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
                                                Th???i gian ?????t h??ng
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
                                                    L?? do hu???:
                                                </span>
                                                <span className="text-task text-left w-100">
                                                    Hu??? b???i:
                                                </span>
                                            </Display>
                                        </div>
                                        <div className="d-end flex-column status-time-order">
                                            <img
                                                src="/images/icon/order-detail/thoigianhuy.svg"
                                                className="img-status"></img>
                                            <span className="text-task">
                                                Th???i gian hu???
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
                                                        L?? do hu???:
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
                                                        Hu??? b???i:
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
                                                Th???i gian y??u c???u tr??? h??ng
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
                                                Th???i gian k???t th??c tr??? h??ng
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
                                                    title="Mua l???i"
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

                                {/* ???? x??c nh???n ??ang chu???n b??? */}
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
                                                    title="Hu??? ?????t h??ng"
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
                                {/* Ho??n th??nh ????n h??ng && ???? x??c nh???n giao h??ng */}
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
                                                        title="Mua l???i"
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
                                                            title="Chi ti???t ????nh gi??"
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
                                                            title="????nh gi?? ngay"
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
                                {/* ??ang giao h??ng */}
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
                                {/* ???? nh???n h??ng */}
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
                                                        title="???? nh???n ???????c h??ng"
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
