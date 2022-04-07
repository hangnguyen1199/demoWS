import React, { useEffect, useState } from 'react';
import IconGift from '../../../components/common/icons/icon-gift';
import { useDispatch, useSelector } from 'react-redux';
import constants from '../../../config/constants';
import AuthActions from '../../../../redux/auth/action';
import WalletActions from '../../../../redux/wallet/action';
import IconUsed from '@spo/components/common/icon-used';
import IconExpired from '@spo/components/common/icon-expired';
import Image from '@spo/components/common/image';

const FreeshipCode = (props) => {
    const dispatch = useDispatch();
    const userProfile = useSelector((state) => state.Auth.data.User);
    const vouchers = useSelector((state) => state.Wallet.vouchers);
    const { data: { settingMaster } } = useSelector((state) => state.Common);
    useEffect(() => {
        dispatch({ type: AuthActions.GET_USER });
        dispatch({ type: WalletActions.LOAD_VOUCHER, data: {Type: constants.VOUCHER_TYPE.MPVC} });
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
    return (
        <div className="d-flex flex-column wallet-purchase-code">
            {/* <span className='title'>Miễn phí vận chuyển</span> */}
            <div className='row mx-0'>
                <div className='col-12 px-0 pt-2'>
                    <div className="voucher-logo-wrap">
                        {vouchers?.map((item, index) => {
                            return (
                                <div key={index} className={`voucher-logo d-flex voucher-freeship-available-bg`}>
                                    <div className="voucher-title d-flex flex-column justify-content-center align-items-center ">
                                        <Image
                                            style={{width: 39}}
                                            src={`/images/icon/freeship-hot-cate-light.svg`}
                                            className="icon-car object_fit_contain "
                                        />
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
    );
};

export default FreeshipCode;
