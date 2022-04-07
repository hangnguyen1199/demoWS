import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ModalComponent from './ModalComponent';
import Image from '@spo/components/common/image';
import ButtonDark from '@spo/components/common/button-dark';

PurchaseVoucherModal.propTypes = {
    voucherList: PropTypes.array,
};

PurchaseVoucherModal.defaultProps = {
    voucherList: [],
};

function PurchaseVoucherModal(props) {
    const lbl_btn_confirm = 'Xác nhận';
    const lbl_btn_remove_voucher = 'Không sử dụng';
    const { voucherList, order, onSelectedVoucher, hide } = props;
    const [currentVoucherIndex, setCurrentVoucherIndex] = useState(-1);

    const isAvailable = (item) => {
        let from = new Date(item.From);
        let to = new Date(item.To.replace('00:00:00', '23:59:59'));
        let now = new Date();
        if (now > to || now < from) {
            return 1;
        }
        if (item.MinAmountOrder > 0 && item.MinAmountOrder < order.OrderTotalAmount) {
            return 2;
        }
        return 0;
    };

    const dateString = (date) => {
        if (date == null || date == '') {
            return ''
        }
        return `${date.substring(8, 10)}.${date.substring(5, 7)}.${date.substring(0, 4)}`;
    };

    const toStringNumber = (num) => {
        if (num == null || num == '') {
            return '0'
        }
        return (`${Math.round(num)  }`).replace(/(\d)(?=(\d{3})+$)/g, "$1.")
    };

    const confirmSelectedVoucher = () => {
        if (currentVoucherIndex > -1) {
            onSelectedVoucher(voucherList[currentVoucherIndex]);
        }
        hide();
    };

    const removeSelectedVoucher = () => {
        setCurrentVoucherIndex(-1);
        onSelectedVoucher(null);
        hide();
    };

    useEffect(() => {
        setCurrentVoucherIndex(voucherList.findIndex(function (voucher) {
            return voucher.Id === order.ShipmentVoucherId;
        }))
    }, [order]);

    const _renderVoucherRow = (item, index) => {
        let available = isAvailable(item);
        return (
            <div
                className="voucher-logo-wrap"
                onClick={() => {
                    if (available === 0) {
                        setCurrentVoucherIndex(index);
                    }
                }}>
                <div
                    className={`voucher-logo d-flex  ${
                        available === 0
                            ? 'voucher-available-bg'
                            : 'voucher-unavailable-bg'
                    }`}>
                    <div className="voucher-title d-flex flex-column justify-content-center align-items-center ">
                        <span className="amount">{toStringNumber(item.Value ?? '')}{item.IsPercent ? '%': ''}</span>
                        {!item.IsPercent && <span className="unit">VND</span>}
                    </div>
                    <div className="voucher-content d-flex align-items-center">
                        <div
                            className={`d-flex flex-column ${
                                available === 0 ? '' : 'text-color-gray'
                            }`}>
                            <span>
                                Mã số:
                                <span
                                    className={`pl-1 ${
                                        available === 0
                                            ? 'text-color-orange'
                                            : ''
                                    }`}>
                                    {item.Code ?? ''}
                                </span>
                            </span>
                            {/* <span className="mt-md-2 mb-md-2">
                                Áp dụng tại:
                                <span className="pl-1">
                                    {item.applyAt ?? ''}
                                </span>
                            </span> */}
                            <span>
                                Hạn sử dụng:
                                <span className="pl-1">{dateString(item.To ?? '')}</span>
                            </span>
                        </div>
                    </div>
                    {index === currentVoucherIndex && (
                        <div className="d-flex align-items-center voucher-chosen">
                            <Image
                                src={`/images/icon/tick.svg`}
                                className="icon-tick"
                            />
                        </div>
                    )}
                </div>
                {available == 2 && (
                    <div className="reason-unvailable-voucher">
                        <p>Đơn hàng chưa đạt số tiền tối thiểu.</p>
                    </div>
                )}
                {available == 1 && (
                    <div className="reason-unvailable-voucher">
                        <p>Mã miễn phí vận chuyển đã hết hạn sử dụng.</p>
                    </div>
                )}
            </div>
        );
    };

    const _renderComponentChildren = () => {
        return (
            <div className="container">
                <div className="freeship-voucher-list">
                    {voucherList.map((item, index) => {
                        return (
                            <div key={index}>
                                {_renderVoucherRow(item, index)}
                            </div>
                        );
                    })}
                </div>

                <div className="row">
                    <div className="col-12 d-flex justify-content-center">
                        <ButtonDark
                            className="btn-size-small btn-freeship-voucher-confirm"
                            title={lbl_btn_confirm}
                            onClick={() => confirmSelectedVoucher()}
                            fontSize={14}
                        />
                        <ButtonDark
                            className="btn-size-small btn-freeship-voucher-confirm"
                            title={lbl_btn_remove_voucher}
                            onClick={() => removeSelectedVoucher()}
                            fontSize={14}
                        />
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div>
            <ModalComponent
                open={props.open}
                hide={() => props.hide()}
                children={_renderComponentChildren()}
                className="purchase-voucher-modal"
                title={props.title}></ModalComponent>
        </div>
    );
}

export default PurchaseVoucherModal;
