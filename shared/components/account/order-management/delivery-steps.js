import React from 'react';
import { FormattedDate, FormattedTime } from 'react-intl';
import constants from '../../../config/constants';
import IconDeliveryAt from './icon/icon-delivery-at';
import IconOrderAt from './icon/icon-order-at';
import IconPaymentAt from './icon/icon-payment-at';
import IconReceivedAt from './icon/icon-received-at';

const DeliverySteps = (props) => {
    const { OrderedAt, PaymentAt, ShippingAt, ReceivedAt, OrderStatus } = props;
    const activeColor = '#FF2C00';
    return (
        <div className="delivery-steps">
            {OrderStatus != constants.ORDER_STATUS.CANCEL ? (
                <React.Fragment>
                    <div className="step">
                        <div
                            className={`step-icon ${
                                OrderedAt ? 'active' : ''
                            }`}>
                            <IconOrderAt color={OrderedAt ? activeColor : ''} />
                        </div>
                        <div className="step-info">
                            <p>Thời gian đặt hàng</p>
                            <p className="step-time">
                                <FormattedDate
                                    value={OrderedAt}
                                    year="numeric"
                                    month="long"
                                    day="2-digit"
                                />
                            </p>
                        </div>
                    </div>
                    <div className="step">
                        <div
                            className={`step-icon ${
                                OrderedAt ? 'active' : ''
                            }`}>
                            <IconPaymentAt
                                color={PaymentAt ? activeColor : ''}
                            />
                        </div>
                        <div className="step-info">
                            <p>Thời gian thanh toán</p>
                            <p className="step-time">
                                <FormattedDate
                                    value={PaymentAt}
                                    year="numeric"
                                    month="long"
                                    day="2-digit"
                                />
                            </p>
                        </div>
                    </div>
                    <div className="step">
                        <div
                            className={`step-icon ${
                                OrderedAt ? 'active' : ''
                            }`}>
                            <IconDeliveryAt
                                color={ShippingAt ? activeColor : ''}
                            />
                        </div>
                        <div className="step-info">
                            <p>Thời gian giao hàng cho vận chuyển</p>
                            <p className="step-time">
                                <FormattedDate
                                    value={ShippingAt}
                                    year="numeric"
                                    month="long"
                                    day="2-digit"
                                />
                            </p>
                        </div>
                    </div>
                    <div className="step">
                        <div
                            className={`step-icon ${
                                OrderedAt ? 'active' : ''
                            }`}>
                            <IconReceivedAt
                                color={ReceivedAt ? activeColor : ''}
                            />
                        </div>
                        <div className="step-info">
                            <p>Thời gian hoàn thành</p>
                            <p className="step-time">
                                <FormattedDate
                                    value={ReceivedAt}
                                    year="numeric"
                                    month="long"
                                    day="2-digit"
                                />
                            </p>
                        </div>
                    </div>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <div className="step">
                        <div
                            className={`step-icon ${
                                OrderedAt ? 'active' : ''
                            }`}>
                            <IconDeliveryAt
                                color={ShippingAt ? activeColor : ''}
                            />
                        </div>
                        <div className="step-info">
                            <p>Thời gian giao hàng cho vận chuyển</p>
                            <p className="step-time">
                                <FormattedDate
                                    value={ShippingAt}
                                    year="numeric"
                                    month="long"
                                    day="2-digit"
                                />
                            </p>
                        </div>
                    </div>
                    <div className="step">
                        <div
                            className={`step-icon ${
                                OrderedAt ? 'active' : ''
                            }`}>
                            <IconReceivedAt
                                color={ReceivedAt ? activeColor : ''}
                            />
                        </div>
                        <div className="step-info">
                            <p>Thời gian hoàn thành</p>
                            <p className="step-time">
                                <FormattedDate
                                    value={ReceivedAt}
                                    year="numeric"
                                    month="long"
                                    day="2-digit"
                                />
                            </p>
                        </div>
                    </div>
                </React.Fragment>
            )}
        </div>
    );
};
export default DeliverySteps;
