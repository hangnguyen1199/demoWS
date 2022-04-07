import React, { useState, useEffect } from 'react';
import ResizePopup from './resize-popup';
import ButtonDark from './../button-dark';
import Image from './../image';
import ButtonRipple from './../button-ripple';
import ButtonMain from '../button-main';

function VoucherPopup(props) {
    const { payload, showVisible, type } = props;
    const lbl_btn_confirm = 'Xác nhận';
    const lbl_btn_remove_voucher = 'Không sử dụng';
    const [currentVoucherIndex, setCurrentVoucherIndex] = useState(-1);

    const onSelectedVoucher = (item) => {
        payload?.callback(item);
        showVisible(false);
    };
    const isAvailable = (item) => {
        let from = new Date(item.From);
        let to = new Date(item.To.replace('00:00:00', '23:59:59'));
        let now = new Date();
        if (now > to || now < from) {
            return 1;
        }
        if (
            item.MinAmountOrder > 0 &&
            item.MinAmountOrder < payload?.order.OrderTotalAmount
        ) {
            return 2;
        }
        return 0;
    };

    const dateString = (date) => {
        if (date == null || date == '') {
            return '';
        }
        return `${date.substring(8, 10)}.${date.substring(
            5,
            7,
        )}.${date.substring(0, 4)}`;
    };

    const toStringNumber = (num) => {
        if (num == null || num == '') {
            return '0';
        }
        return `${Math.round(num)}`.replace(/(\d)(?=(\d{3})+$)/g, '$1.');
    };

    const confirmSelectedVoucher = () => {
        if (currentVoucherIndex > -1) {
            onSelectedVoucher(payload?.voucherList[currentVoucherIndex]);
        }else{
            onSelectedVoucher(null)
        }
        // hide();
    };

    const removeSelectedVoucher = () => {
        setCurrentVoucherIndex(-1);
        onSelectedVoucher(null);
        // hide();
    };

    useEffect(() => {
        setCurrentVoucherIndex(
            payload?.voucherList?.findIndex(function (voucher) {
                return voucher.Id === payload?.currentVoucherId;
            }),
        );
    }, [payload?.order]);

    const _renderVoucherRow = (item, index) => {
        let available = isAvailable(item);
        return (
            <div
                className="voucher-logo-wrap"
                onClick={() => {
                    if (available === 0) {
                        if (currentVoucherIndex != index) {
                            setCurrentVoucherIndex(index);
                        } else {
                            setCurrentVoucherIndex(-1);
                        }
                    }
                }}>
                <div
                    className={`voucher-logo  d-flex  ${
                        available === 0
                            ? 'voucher-available-bg'
                            : 'voucher-unavailable-bg'
                    } ${type == 1 ? '' : 'free-ship-voucher-image'}`}>
                    {type == 1 ? (
                        <div className="voucher-title d-flex flex-column justify-content-center align-items-center ">
                            <span className="amount">
                                {toStringNumber(item.Value ?? '')}
                                {item.IsPercent ? '%' : ''}
                            </span>
                            {!item.IsPercent && (
                                <span className="unit">VND</span>
                            )}
                        </div>
                    ) : (
                        <div className="voucher-title d-flex flex-column justify-content-center align-items-center ">
                            <Image
                                src={`/images/icon/freeship-hot-cate-light.svg`}
                                className="icon-car"
                            />
                            <span className="amount">
                                {toStringNumber(item.Value ?? '')}
                                {item.IsPercent ? '%' : ''}
                            </span>
                            {!item.IsPercent && (
                                <span className="unit">VND</span>
                            )}
                        </div>
                    )}

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
                                <span className="pl-1">
                                    {dateString(item.To ?? '')}
                                </span>
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
            <div className="container purchase-voucher-modal">
                <div className="freeship-voucher-list">
                    {payload?.voucherList?.map((item, index) => {
                        return (
                            <div key={index}>
                                {_renderVoucherRow(item, index)}
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    };
    const renderFooter = () => {
        return (
            <div className="row">
                <div className="col-12 d-flex justify-content-center">
                    <ButtonMain
                        className="__btn_main"
                        title={lbl_btn_confirm}
                        onClick={() => confirmSelectedVoucher()}
                        fontSize={14}
                    />
                    {/* <ButtonRipple
                        className="__btn_main"
                        title={lbl_btn_remove_voucher}
                        onClick={() => removeSelectedVoucher()}
                        fontSize={14}
                    /> */}
                </div>
            </div>
        );
    };
    return (
        <ResizePopup
            payload={payload}
            showVisible={showVisible}
            body={_renderComponentChildren}
            footer={renderFooter}
        />
    );
}

export default VoucherPopup;
