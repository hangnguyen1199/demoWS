import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import OrderActions from '@spo/redux/order/action';

import TotalComponent from '../../../components/order/TotalComponent';
import PaymentMethodComponent from '../../../components/order/PaymentMethodComponent';

const RightSide = (props) => {
    const dispatch = useDispatch();
    const { loading, data } = useSelector((state) => state.Order);

    return (
        <div className="bg-white right-side">
            <PaymentMethodComponent
                paymentMethods={data.orderValues.PaymentMethods}
                order={data.order}></PaymentMethodComponent>
            <TotalComponent
                values={data.orderValues}
                order={data.order}
                error={data.error}></TotalComponent>
        </div>
    );
};

export default RightSide;
