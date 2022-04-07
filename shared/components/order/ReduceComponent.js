import ButtonDark from '@spo/components/common/button-dark';
import ButtonLight from '@spo/components/common/button-light';
import Image from '@spo/components/common/image';
import OrderActions from '@spo/redux/order/action';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import EventRegister, {
    CHOOSE_VOUCHER_POPUP,
    EVENT_SHOW_POPUP,
} from '../../utils/EventRegister';
import ButtonMain from '../common/button-main';
import PointModal from './modal/PointModal';
import PopupSignIn from './modal/popup-sigin';
import AppConfig from './../../config/AppConfig';

function ReduceComponent(props) {
    const dispatch = useDispatch();
    const { vouchers, order, profile, orderValues } = props;
    const Name_Reduce_Title = 'Giảm trừ';
    const Name_Point = 'Điểm Tích Lũy';
    const Name_Order_Code = 'Mã Số Mua Hàng';
    const Name_BTN_Point = 'Dùng ĐTL';
    const Name_BTN_Order_Code = 'Chọn MSMH';
    const Name_Choose_One_Title = 'Vui lòng chọn 1';

    const [isShowPurchaseVoucherModal, setIsShowPurchaseVoucherModal] =
        useState(false);

    const [isShowPointModal, setIsShowPointModal] = useState(false);
    const [isAppliedPoint, setIsAppliedPoint] = useState(false);
    const [selectedVoucher, setSelectedVoucher] = useState({});
    const [isAppliedVoucher, setisAppliedVoucher] = useState(false);

    const toStringNumber = (num) => {
        if (num == null || num == '') {
            return '0';
        }
        return `${Math.round(num)}`.replace(/(\d)(?=(\d{3})+$)/g, '$1.');
    };

    const onSelectedVoucher = (item) => {
        let Id = item == null ? 0 : item.Id;
        if (item == null) {
            setisAppliedVoucher(false);
            setSelectedVoucher({});
        } else {
            setSelectedVoucher(item);
            setisAppliedVoucher(true);
        }
        let cloneOrder = { ...order };
        if (cloneOrder.NormalVoucher != Id) {
            cloneOrder.UseGoldPoint = 0;
            cloneOrder.UseNormalPoint = 0;
            cloneOrder.NormalVoucher = Id;
            dispatch({
                type: OrderActions.UPDATE_ORDER_VALUES,
                order: cloneOrder,
            });
        }
    };

    const onUsePoint = (goldPoint, normalPoint) => {
        let cloneOrder = { ...order };
        if (
            cloneOrder.UseGoldPoint != goldPoint ||
            cloneOrder.UseNormalPoint != normalPoint
        ) {
            cloneOrder.UseGoldPoint = parseInt(
                goldPoint == '' || goldPoint == null ? '0' : goldPoint,
                10,
            );
            cloneOrder.UseNormalPoint = parseInt(
                normalPoint == '' || normalPoint == null ? '0' : normalPoint,
                10,
            );
            cloneOrder.NormalVoucher = 0;
            dispatch({
                type: OrderActions.UPDATE_ORDER_VALUES,
                order: cloneOrder,
            });
        }
        if (cloneOrder.UseGoldPoint > 0 || cloneOrder.UseNormalPoint > 0) {
            setIsAppliedPoint(true);
        } else {
            setIsAppliedPoint(false);
        }
        setIsShowPointModal(false);
    };

    useEffect(() => {
        if (order.UseGoldPoint > 0 || order.UseNormalPoint > 0) {
            setIsAppliedPoint(true);
        } else {
            setIsAppliedPoint(false);
        }
    }, [order]);
    const handleShopPopupVoucher = () => {
        EventRegister.emit(EVENT_SHOW_POPUP, {
            type: CHOOSE_VOUCHER_POPUP,
            open: true,
            payload: {
                voucherList: vouchers,
                order: order,
                currentVoucherId: order?.NormalVoucher,
                className:
                    '_mobile_screen order-master-component voucher-popup',
                title: 'Chọn mã số mua hàng',
                callback: (item) => {
                    onSelectedVoucher(item);
                },
            },
        });
    };
    return (
        <div className="border-shadow px-3 py-3">
            {/* {isShowPurchaseVoucherModal && (
                <PurchaseVoucherModal
                    open={isShowPurchaseVoucherModal}
                    voucherList={vouchers}
                    order={order}
                    hide={() => setIsShowPurchaseVoucherModal(false)}
                    onSelectedVoucher={onSelectedVoucher}
                    title="Chọn Mã Số Mua Hàng"></PurchaseVoucherModal>
            )} */}
            {isShowPointModal && (
                <PointModal
                    open={isShowPointModal}
                    profile={profile}
                    order={order}
                    hide={() => setIsShowPointModal(false)}
                    onUsePoint={onUsePoint}
                    title="Sử dụng Điểm Tích Lũy"></PointModal>
            )}
            <div className="reduce-title d-flex justify-items-center align-items-baseline justify-content-between">
                <div className="d-flex align-items-baseline">
                    <Image
                        src={`/images/icon/reduce.svg`}
                        style={{ width: 39, marginTop: -5 }}
                    />
                    <p className="pl-2">
                        {Name_Reduce_Title}{' '}
                        {/* <sub>
                            (chỉ được sử dụng Điểm Tích Luỹ hoặc Mã Số Mua Hàng)
                        </sub> */}
                    </p>
                </div>
                <p style={{ fontWeight: 300, color: '#707070' }}>
                    {Name_Choose_One_Title}
                </p>
            </div>
            <hr className="cross-line"></hr>
            <div className={`reduce-content  ${props.className}`}>
                <div className={`item-style d-flex justify-content-between align-items-center ${props.className}`}>
                    <p className="">{Name_Point}</p>
                    <div className="d-flex align-items-baseline applied-voucher-wrap applied-voucher-wrap-hover">
                        {isAppliedPoint && (
                            <div className="applied-voucher text-color-orange">
                                -&nbsp;
                                {toStringNumber(
                                    (order.UseGoldPoint +
                                        order.UseNormalPoint) *
                                        profile.PointToMoney,
                                )}
                                &nbsp;
                                <span className="text-size-10">VND</span>
                            </div>
                        )}
                        <ButtonLight
                            className="btn-size-small text-uppercase py-3 btn-light-border"
                            title={Name_BTN_Point}
                            fontSize={14}
                            // Tạm khóa
                            disabled={true}
                            // disabled={
                            //     !(
                            //         profile &&
                            //         (profile.NormalPoint > 0 ||
                            //             profile.GoldPoint > 0)
                            //     )
                            // }
                            onClick={() => setIsShowPointModal(true)}
                        />
                        {
                            !AppConfig.ACCESS_TOKEN && <PopupSignIn className="mb-2" />
                        }
                    </div>
                </div>
                <hr className="cross-line"></hr>
                <div className={`item-style d-flex justify-content-between align-items-center ${props.className}`}>
                    <p className="">{Name_Order_Code}</p>
                    <div className="d-flex align-items-baseline applied-voucher-wrap applied-voucher-wrap-hover">
                        {/* {isAppliedVoucher && (
                            <div className="applied-voucher text-color-orange">
                                -&nbsp;{toStringNumber(selectedVoucher.Value)}
                                &nbsp;
                                <span className="text-size-10">
                                    {selectedVoucher.IsPercent ? '%' : 'VND'}
                                </span>
                            </div>
                        )} */}
                        {isAppliedVoucher && (
                            <div className="applied-voucher text-color-orange">
                                -&nbsp;
                                {toStringNumber(orderValues?.VoucherAmount)}
                                &nbsp;
                                <span className="text-size-10">VND</span>
                            </div>
                        )}

                        <ButtonMain
                            className="btn-size-small"
                            title={Name_BTN_Order_Code}
                            disabled={!(vouchers && vouchers.length > 0)}
                            fontSize={14}
                            onClick={handleShopPopupVoucher}
                        />
                        {
                            !AppConfig.ACCESS_TOKEN && <PopupSignIn className="mb-2" />
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

ReduceComponent.propTypes = {};

export default ReduceComponent;
