import Image from '@spo/components/common/image';
import OrderActions from '@spo/redux/order/action';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import EventRegister, {
    CHOOSE_FREESHIP_VOUCHER_POPUP,
    EVENT_SHOW_POPUP,
} from '../../utils/EventRegister';
import ButtonMain from '../common/button-main';
import PopupSignIn from './modal/popup-sigin';
import AppConfig from '../../config/AppConfig';

const FreeshipComponent = (props) => {
    const dispatch = useDispatch();

    const Name_Freeship_Title = 'Miễn phí vận chuyển';
    const Name_BTN_Freeship = 'Chọn MPVC';

    const [isShowFreeshipVoucherModal, setIsShowFreeshipVoucherModal] =
        useState(false);

    const [isAppliedVoucher, setisAppliedVoucher] = useState(false);
    const [selectedVoucher, setSelectedVoucher] = useState({});
    const { vouchers, order, orderValues } = props;

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
        if (cloneOrder.ShipmentVoucherId != Id) {
            cloneOrder.ShipmentVoucherId = Id;
            dispatch({
                type: OrderActions.UPDATE_ORDER_VALUES,
                order: cloneOrder,
            });
        }
    };
    const handleShowPopup = () => {
        EventRegister.emit(EVENT_SHOW_POPUP, {
            type: CHOOSE_FREESHIP_VOUCHER_POPUP,
            open: true,
            payload: {
                voucherList: vouchers,
                order: order,
                currentVoucherId: order?.ShipmentVoucherId,
                className:
                    '_mobile_screen order-master-component voucher-popup',
                title: 'Chọn mã miễn phí vận chuyển',
                callback: (item) => {
                    onSelectedVoucher(item);
                },
            },
        });
    };
    return (
        <div className="border-shadow px-3 py-3 free-ship-section">
            {/* {isShowFreeshipVoucherModal && (
                <FreeshipVoucherModal
                    open={isShowFreeshipVoucherModal}
                    voucherList={vouchers}
                    order={order}
                    hide={() => setIsShowFreeshipVoucherModal(false)}
                    onSelectedVoucher={onSelectedVoucher}
                    title="Chọn mã miễn phí vận chuyển"></FreeshipVoucherModal>
            )} */}
            <div className="free-ship-title d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-baseline">
                    <Image
                        src={`/images/icon/freeship-hot-cate.svg`}
                        style={{ width: 39, objectFit: 'contain', alignSelf: 'center' }}
                        lazyLoad={false}
                    />
                    <p className="mb-0 pl-2">{Name_Freeship_Title}</p>
                </div>

                <div className="d-flex align-items-baseline applied-voucher-wrap applied-voucher-wrap-hover">
                    {/* {isAppliedVoucher && (
                        <div className="applied-voucher text-color-orange">
                            -&nbsp;{toStringNumber(selectedVoucher.Value)}&nbsp;
                            <span className="text-size-10">
                                {selectedVoucher.IsPercent ? '%' : 'VND'}
                            </span>
                        </div>
                    )} */}
                    {isAppliedVoucher && (
                        <div className="applied-voucher text-color-orange">
                            -&nbsp;{toStringNumber(orderValues?.VoucherShipmentAmount)}&nbsp;
                            <span className="text-size-10">
                                VND
                            </span>
                        </div>
                    )}
                    <ButtonMain
                        className="btn-size-small"
                        title={Name_BTN_Freeship}
                        disabled={!(vouchers && vouchers.length > 0)}
                        fontSize={14}
                        onClick={handleShowPopup}
                    />
                    {
                        !AppConfig.ACCESS_TOKEN && <PopupSignIn />
                    }
                </div>
            </div>
        </div>
    );
};

FreeshipComponent.propTypes = {};

export default FreeshipComponent;
