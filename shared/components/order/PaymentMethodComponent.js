import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import OrderActions from '@spo/redux/order/action';

import PropTypes from 'prop-types';
import Image from '@spo/components/common/image';
import Utils from '../../utils/utils';
import AppConfig from '../../config/AppConfig';

PaymentMethodComponent.propTypes = {};

function PaymentMethodComponent(props) {
    const dispatch = useDispatch();
    const name_payment_method = 'Phương thức Thanh toán';
    const name_note = 'Vui lòng chọn 1';

    const [selectedId, setSelectedId] = useState(10);
    const { paymentMethods, order } = props;

    const selectPaymentMethod = (item) => {
        setSelectedId(item.Key);
        let cloneOrder = { ...order };
        if (cloneOrder.PaymentMethodId != item.Key) {
            cloneOrder.PaymentMethodId = item.Key;
            dispatch({
                type: OrderActions.UPDATE_ORDER_VALUES,
                order: cloneOrder,
            });
        }
        dispatch({
            type: OrderActions.SET_ORDER_ERROR_MESSAGE,
            error: {
                message: null,
            },
        });
    };

    useEffect(() => {
        if (paymentMethods && paymentMethods.length > 0) {
            let index = paymentMethods.findIndex(function (method) {
                return method.Key === selectedId;
            });
            if (index <= -1) {
                selectPaymentMethod(paymentMethods[0]);
            }
        }
    }, [paymentMethods]);
    const handleToastCopy=()=>{
        Utils.alertPopup("Đã sao chép")
    }

    const dataPhone=useSelector(state=>state.form?.AddressSyncComponent?.values?.Phone)
    const _renderBankingInfo = (item) => {
        return <div className='d-flex flex-column bank-info-wrap'>
            <div className='d-flex flex-row bank-row'>
                <p className='d-flex p-title'>
                    <div>
                        <Image
                            src={`/images/icon/icon_dot.svg`}
                            style={{ width: 3, height: 3, marginBottom: 5 }}
                        />
                    </div>
                    Số tài khoản
                </p>
                <p className='p-content'>: {item.AccountNumber}</p>
                <Image
                    src={`/images/icon/icon_copy.svg`}
                    className='pointer img-res'
                    onClick={() => {
                        navigator.clipboard.writeText(item.AccountNumber);
                        handleToastCopy();
                    }}
                />
            </div>
            <div className='d-flex flex-row bank-row'>
                <p className='d-flex p-title'>
                    <div>
                        <Image
                            src={`/images/icon/icon_dot.svg`}
                            style={{ width: 3, height: 3, marginBottom: 5 }}
                        />
                    </div>
                    Ngân hàng
                </p>
                <p className='p-content'>: {item.Bank}</p>
            </div>
            <div className='d-flex flex-row bank-row'>
                <p className='d-flex p-title'>
                    <div>
                        <Image
                            src={`/images/icon/icon_dot.svg`}
                            style={{ width: 3, height: 3, marginBottom: 5 }}
                        />
                    </div>
                    Chủ tài khoản
                </p>
                <p className='p-content'>: {item.Owner}</p>
            </div>
            <div className='d-flex flex-column bank-row'>
                <p className='d-flex div-content-banking'>
                    <div>
                        <Image
                            src={`/images/icon/icon_dot.svg`}
                            style={{ width: 3, height: 3, marginBottom: 5 }}
                        />
                    </div>
                    Nội dung chuyển khoản
                </p>
                <div className='d-flex flex-row'>
                    <div className='text-center div-content-banking bolder'>
                        {
                            AppConfig.ACCESS_TOKEN ? <p>{item.Content}</p> : <>
                                <p>[Mã đơn hàng] - {dataPhone}</p>
                            </>
                        }
                    </div>
                    <Image
                        src={`/images/icon/icon_copy.svg`}
                        className='pointer img-res'
                        onClick={() => {
                            navigator.clipboard.writeText(item.Content)
                            handleToastCopy();
                        }}
                    />
                </div>
            </div>
        </div>
    }

    return (
        <div className="border-shadow payment-method-section">
            <div className="payment-method-title d-flex justify-content-between align-items-baseline">
                <div className="d-flex align-items-baseline">
                    <Image
                        src={`/images/icon/payment-method.svg`}
                        style={{ width: 25, paddingBottom: 5 }}
                    />
                    <p className="mb-0 pl-2 pr-1">
                        {name_payment_method}
                    </p>
                </div>
                <p style={{ fontWeight: 300, color: '#707070'}}>{name_note}</p>
            </div>
            <hr className="cross-line"></hr>
            <div className="payment-method-content">
                <div className="pl-0 d-flex flex-column">
                    {paymentMethods.map((item, index) => {
                        return (
                            <div
                                className="d-flex flex-column payment-method-row"
                                key={index}>
                                <div className='d-flex'>
                                    {selectedId == item.Key && (
                                        <Image
                                            src={`/images/icon/tick.svg`}
                                            style={{ width: 15, paddingBottom: 5 }}
                                        />
                                    )}
                                    <p
                                        className={`mb-0 pl-2 pointer ${
                                            selectedId == item.Key
                                                ? 'bolder'
                                                : 'ml-3 lighter'
                                        }`}
                                        style={{ width: '100%'}}
                                        onClick={() => selectPaymentMethod(item)}>
                                        {item.Name}
                                        
                                    </p>
                                </div>
                                <div className='mb-0 pl-2'>
                                    {item.Key == 30 && selectedId == item.Key && (
                                        _renderBankingInfo(item)
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default PaymentMethodComponent;
