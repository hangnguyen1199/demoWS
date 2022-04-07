import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import TotalComponent from '../../../components/order/TotalComponent'
import PaymentMethodComponent from '../../../components/order/PaymentMethodComponent'

const RightSide = (props) => {
    const { loading, data } = useSelector((state) => state.Order)
    const formOrderSync = useSelector((state) => state.form)

    let CommuneId = formOrderSync?.AddressSyncComponent?.values?.CommuneId;
    let ProvinceId = formOrderSync?.AddressSyncComponent?.values?.ProvinceId;
    let DistrictId = formOrderSync?.AddressSyncComponent?.values?.DistrictId;
    let AddressId = formOrderSync?.AddressSyncComponent?.values?.Address;
    let EmailId = formOrderSync?.AddressSyncComponent?.values?.Email;
    let LastNameId = formOrderSync?.AddressSyncComponent?.values?.LastName;
    let FirstNameId = formOrderSync?.AddressSyncComponent?.values?.FirstName;
    let PhoneId = formOrderSync?.AddressSyncComponent?.values?.Phone;

    data.order['CommuneId']=CommuneId ?? '';
    data.order['DistrictId']=DistrictId ?? '';
    data.order['ProvinceId']=ProvinceId ?? '';
    data.order['Address']=AddressId ?? '';
    data.order['Email']=EmailId ?? '';
    data.order['FirstName']=FirstNameId ?? '';
    data.order['LastName']=LastNameId ?? '';
    data.order['Phone']=PhoneId ?? '';



    return (
        <div className="bg-white right-side">
            <PaymentMethodComponent
                paymentMethods={data.orderValues.PaymentMethods}
                order={data.order}
            ></PaymentMethodComponent>
            <TotalComponent
                values={data.orderValues}
                order={data.order}
                error={data.error}
            ></TotalComponent>
        </div>
    )
}

export default RightSide
