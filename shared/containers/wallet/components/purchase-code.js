import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import constants from '../../../config/constants';
import AuthActions from '../../../../redux/auth/action';
import WalletActions from '../../../../redux/wallet/action';
import Barcode from 'react-barcode';
import IconX from '@spo/components/common/icon-x';
import IconUsed from '@spo/components/common/icon-used';
import IconExpired from '@spo/components/common/icon-expired';
import EventRegister, {
    PURCHASE_BAR_CODE_POPUP,
    EVENT_SHOW_POPUP,
} from "../../../utils/EventRegister";

const PurchaseCode = (props) => {
    const dispatch = useDispatch();
    const userProfile = useSelector((state) => state.Auth.data.User);
    const vouchers = useSelector((state) => state.Wallet.vouchers);
    const [showBarcode, setShowBarcode] = useState(null);
    useEffect(() => {
        dispatch({ type: AuthActions.GET_USER });
        dispatch({ type: WalletActions.LOAD_VOUCHER, data: {Type: constants.VOUCHER_TYPE.MSMH} });
    }, []);
    const dateString = (date) => {
        if (date == null || date == '') {
            return ''
        }
        return `${date.substring(8, 10)}.${date.substring(5, 7)}.${date.substring(0, 4)}`;
    };
    const isUsed = (status) =>{
        switch(status){
            case 2:
                return(<IconUsed fontSize={40}/>)
            case 3:
                return(<IconExpired fontSize={40}/>)
            default : 
        }
    }
    const toStringNumber = (num) => {
        if (num == null || num == '') {
            return '0'
        }
        return (`${Math.round(num)  }`).replace(/(\d)(?=(\d{3})+$)/g, "$1.")
    };
    function onCloseBarcode() {
        setShowBarcode(null);
    }

    const showPurchaseBarCode = (barCode) => {
        EventRegister.emit(EVENT_SHOW_POPUP, {
            type: PURCHASE_BAR_CODE_POPUP,
            open: true,
            payload: {
                className: "",
                title: "Mã Số Mua Hàng",
                barCode: barCode,
                callback: () => {},
            },
        });
    };

    return (
        <>
            {showBarcode && (
                <div className='w-100 d-center' style={{position: 'absolute', top: 0, zIndex: 2}}>
                    <div className='barcode-purchase-code d-center flex-column'>
                        <div className='w-100 d-end'>
                            <div className="barcode-purchase-close-button close-popup-btn" 
                                onClick={onCloseBarcode}>
                                <IconX fontSize={24} />
                            </div>
                        </div>
                        <div>
                            <Barcode width={2} value={showBarcode} />
                        </div>
                    </div>
                </div>
            )}
            <div className="d-flex flex-column wallet-purchase-code">
                {/* <span className='title'>Mã số mua hàng</span> */}
                <div className='row mx-0'>
                    <div className='col-12 px-0 pt-2'>
                        <div className="voucher-logo-wrap">
                            {vouchers?.map((item, index) => {
                                return (
                                    <div key={index} className={`voucher-logo d-flex voucher-available-bg`} onClick={() => showPurchaseBarCode(item.Code)}>
                                        <div className="voucher-title d-flex flex-column justify-content-center align-items-center ">
                                            {
                                                ( item.IsPercent &&
                            <span className="amount" style={{fontSize: 16}}>
                              Giảm giá
                            </span>
                                                )
                                            }
                                            <span className="amount">{toStringNumber(item.Value ?? '')}{item.IsPercent ? '%': ''}</span>
                                            {!item.IsPercent && <span className="unit">VND</span>}
                                            <span className="status-of-voucher">
                                                {isUsed(item.Status)}
                                            </span>
                                        </div>
                                        <div className="voucher-content d-flex align-items-center">
                                            <div
                                                className={`d-flex flex-column`}>
                                                <span>
                                Mã số:
                                                    <span
                                                        className={`pl-1 text-color-orange`}>
                                                        {item.Code ?? ''}
                                                    </span>
                                                </span>
                                                <span className="mt-md-2 mb-md-2">
                                Áp dụng tại:
                                                    <span className="pl-1">
                                                        {item?.Branches[0]?.Name ?? 'Tất cả các chi nhánh'}
                                                    </span>
                                                </span>
                                                <span>
                                HSD:
                                                    <span className="pl-1">{dateString(item.From ?? '')}</span>
                                                    {" - "}
                                                    <span className="pl-1">{dateString(item.To ?? '')}</span>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PurchaseCode;
