import React, { useState, useEffect } from 'react';
import { useDispatch , connect} from 'react-redux';
import OrderActions from '@spo/redux/order/action';

import SuccessPopup from '@spo/components/common/popups/success-popup';
import Currency from 'react-currency-formatter';
import ButtonDark from '@spo/components/common/button-dark';
import { Router } from '@spo/routes';
import IconSuccess from '@spo/icons/icon-success';
import Utils from './../../utils/utils';
import { POPUP_SUCCESS_TYPE, FIRST_POPUP } from '../../utils/EventRegister';
import { useCustomRoute } from './../../library/use-custom-route';
import CartActions from '@spo/redux/cart/action';
import PageList from '../../config/PageList';
import ButtonMain from '../common/button-main';
import AppConfig from './../../config/AppConfig';
import { submit } from 'redux-form'


TotalComponent.propTypes = {};

function TotalComponent(props) {
    const dispatch = useDispatch();

    const name_amount = 'Tổng tiền hàng';
    const name_fee_ship = 'Phí vận chuyển';
    const name_fee_ship_reduce = 'Giảm phí vận chuyển';
    const name_amount_reduce = 'Giảm trừ';
    const name_total = 'Tổng thanh toán';
    const name_point = 'Số Điểm Bạc sẽ nhận được';
    const name_order = 'Mua hàng';
    const { values, order, error } = props;
    const [showPopupSuccess, setShowPopupSuccess] = useState(false);
    const doOrder = () => {
        let message = null;
        if (order.BranchId == 0 && order.RecieveAddressId == 0 && AppConfig.ACCESS_TOKEN ) {
            message = 'Vui lòng chọn địa chỉ nhận hàng';
        }
        if(!AppConfig.ACCESS_TOKEN){
            props.dispatch(submit('AddressSyncComponent'))
        }
        if (
            (!order.CommuneId  ||
            !order.DistrictId  ||
            !order.ProvinceId  ||
            !order.Address  ||
            !order.Email  ||
            !order.FirstName  ||
            !order.LastName  ||
            !order.Phone)  &&
            !AppConfig.ACCESS_TOKEN
        ) {
            message = ' '
        }
        if (order.PaymentMethodId == 0) {
            message = 'Vui lòng chọn hình thức thanh toán';
        }
        if (order.Carts.length == 0) {
            message = 'Vui lòng chọn sản phẩm trước khi mua hàng';
        }
        dispatch({
            type: OrderActions.SET_ORDER_ERROR_MESSAGE,
            error: {
                message: message,
            },
        });
        if (message != null) {
            return;
        }
        dispatch({
            type: AppConfig.ACCESS_TOKEN ? OrderActions.SAVE_ORDER : OrderActions.SAVE_ORDER_SYNC,
            order: order,
            callback: {
                success: (res) => {
                    if (res.data.Code == 200) {
                        localStorage.removeItem('checkedCarts');
                        AppConfig.ACCESS_TOKEN ?
                            Utils.alertPopup(
                                `Đặt hàng thành công`,
                                POPUP_SUCCESS_TYPE,
                                () => {
                                    useCustomRoute(
                                        dispatch,
                                        PageList.ORDER_MANAGEMENT.SERVER,
                                    );
                                },
                                FIRST_POPUP,
                                // ()=>{
                                //     useCustomRoute(
                                //         dispatch,
                                //         PageList.ORDER_MANAGEMENT.SERVER,
                                //     );
                                //     dispatch({ type: CartActions.LOAD_CART });
                                // }
                            ) :
                            Utils.alertPopup(
                                `Đặt hàng thành công`,
                                POPUP_SUCCESS_TYPE,
                                () => {
                                    useCustomRoute(
                                        dispatch,
                                        PageList.ORDER_SUCCESS.SERVER,
                                    );
                                },
                                FIRST_POPUP,
                                ()=>{
                                    useCustomRoute(
                                        dispatch,
                                        PageList.ORDER_SUCCESS.SERVER,
                                    );
                                }
                            )
                    } else {
                        dispatch({
                            type: OrderActions.SET_ORDER_ERROR_MESSAGE,
                            error: {
                                message: getMessage(res.data.MsgNo),
                            },
                        });
                    }
                },
            },
        });
    };

    const getMessage = (MsgNo) => {
        switch (MsgNo) {
            case 'E097':
                return 'Trong đơn hàng có sản phẩm không còn đủ trong kho, vui lòng kiểm tra lại';
            default:
                return 'Đã có lỗi xảy ra trong quá trình mua hàng, vui lòng thử lại';
        }
    };

    return (
        <div className="border-shadow total-section">
            <div className="bill-list">
                <div className="bill-row d-flex justify-content-between">
                    <p>{name_amount}</p>
                    <div>
                        <Currency
                            quantity={Number.parseFloat(
                                values.OrderTotalAmount
                            )}
                            currency="VND"
                            pattern="##,### !"
                            symbol=""
                        />
                        <span className="currency fontsize9">VND</span>
                    </div>
                </div>
                <div className="bill-row d-flex justify-content-between">
                    <p>{name_fee_ship}</p>
                    <div>
                        <Currency
                            quantity={Number.parseFloat(
                                values.ShipmentFee
                            )}
                            currency="VND"
                            pattern="##,### !"
                            symbol=""
                        />
                        <span className="currency fontsize9">VND</span>
                    </div>
                </div>
                {AppConfig.ACCESS_TOKEN ? (
                    <>
                        <div className="bill-row d-flex justify-content-between">
                            <p>{name_fee_ship_reduce}</p>
                            <div>
                                <Currency
                                    quantity={
                                        Number.parseFloat(
                                            values.VoucherShipmentAmount
                                        ) * -1
                                    }
                                    currency="VND"
                                    pattern="##,### !"
                                    symbol=""
                                />
                                <span className="currency fontsize9">VND</span>
                            </div>
                        </div>
                        <div className="bill-row d-flex justify-content-between">
                            <p>{name_amount_reduce}</p>
                            <div>
                                <Currency
                                    quantity={Number.parseFloat(values.ReduceFee) * -1}
                                    currency="VND"
                                    pattern="##,### !"
                                    symbol=""
                                />
                                <span className="currency fontsize9">VND</span>
                            </div>
                        </div>
                    </>
                ) : (
                    <></>
                )}
                
                <div className="bill-row d-flex justify-content-between">
                    <p className="mb-0">{name_total}</p>
                    <div className="total-money">
                        <Currency
                            quantity={Number.parseFloat(
                                values.PaymentTotalAmount,
                            )}
                            currency="VND"
                            pattern="##,### !"
                            symbol=""
                        />
                        <span className="currency fontsize9">VND</span>
                    </div>
                </div>
            </div>
            <hr className="cross-over" />
            <div className="bill-total">
                {AppConfig.ACCESS_TOKEN && (
                    <div className="point-row d-flex justify-content-between">
                        <p>{name_point}</p>
                        <p>{values.RecievePoint}</p>
                    </div>
                )}
                <div className="d-flex justify-content-center">
                    <ButtonMain
                        className="btn-order btn-order-100"
                        title={name_order}
                        fontSize={14}
                        disabled={order.Carts.length == 0}
                        onClick={() => {
                            doOrder();
                        }}
                    />
                </div>
                {error.message && (
                    <p style={{ color: '#FF2C00' }}>{error.message}</p>
                )}
            </div>
        </div>
    );
}

export default connect()(TotalComponent);
