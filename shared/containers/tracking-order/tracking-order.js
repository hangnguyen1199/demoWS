import React, { useState ,useEffect} from 'react'
import BreadCrumb from '@spo/components/common/breadcrumb'
import PageList from './../../config/PageList'
import StepTracking from './components/step-tracking'
import PackageCart from '../../components/cart/package-cart'
import { Field, formValueSelector, reduxForm } from 'redux-form'
import RenderInputTracking from './components/render-input-tracking'
import { connect, useDispatch, useSelector } from 'react-redux'
import action from './../../../redux/tracking-order/action'
import { required } from '../../library/validator'
import Currency from 'react-currency-formatter';
import Utils from '../../utils/utils'

function TrackingOrderContainer(props) {
    const data_bread_crumb = [
        { name: 'Trang chủ', path_name: '/' },
        {
            name: 'Theo dõi đơn hàng',
            path_name: PageList.TRACKING_ORDER.SERVER,
        },
    ]
    const [breadcrumb, setBreadcrumb] = useState(data_bread_crumb)
    const dispatch = useDispatch()
    const onTrackingOrder = (data) => {
        dispatch({
            type: action.LOAD_TRACKING_ORDER,
            data: data,
        })
    }

    useEffect(() => {
        dispatch({
            type: action.LOAD_TRACKING_ORDER,
            data: '',
        })
    }, [])
    const { OrderCode }=props;

    const dataTrackingOrder = useSelector((state) => state.TrackingOrder)
    const handleCopy=(data)=>{
        Utils.alertPopup('Đã sao chép', () => {}) 
        navigator.clipboard.writeText(data)
    }
    return (
        <>
            <div className="bg-white order-container">
                <BreadCrumb data={breadcrumb} />
                <div className="tracking-header-container">
                    <p className="title-tracking-header">Theo dõi đơn hàng </p>
                    <div className="input-tracking-header">
                        <Field
                            component={RenderInputTracking}
                            name="orderCode"
                            validate={[required]}
                            placeholder="Nhập mã đơn hàng..."
                        />
                        <button
                            onClick={props.handleSubmit(onTrackingOrder)}
                            className={`btn-tracking ${OrderCode ? '' : 'not-hover'}`}
                            disabled={OrderCode && false }
                        >
                            Tra cứu
                        </button>
                    </div>
                </div>
                {dataTrackingOrder?.TrackingOrder?.OrderDetails && dataTrackingOrder?.TrackingOrder?.OrderDetails.length > 0 ? (
                    <>
                        <StepTracking orderStatus={dataTrackingOrder?.TrackingOrder?.OrderStatus} />
                        <div className="px-0 wrap_address mb-5">
                            <div className="row pd-lr-common order-master-component ml-0 mr-0">
                                <div className="col-12 col-lg-3 px-0 ">
                                    <div className="tracking-order-code tracking-order-code-res tracking-order-left w-100 d-flex justify-content-between">
                                        <div className='d-flex flex-row'>
                                            <p>Mã đơn hàng:&nbsp;</p>
                                        </div>
                                        <div className='d-flex flex-row tracking-order-code-res-right' onClick={()=>handleCopy(dataTrackingOrder?.TrackingOrder?.Code)} >
                                            <span>
                                                {
                                                    dataTrackingOrder?.TrackingOrder
                                                        ?.Code
                                                }
                                            </span>
                                            <img
                                                className="hover-color-svg copy-id-product"
                                                title="Copy"
                                                src="/images/icon/order-detail/icon_copy_detail.svg"
                                                style={{
                                                    width: 20,
                                                    height: 20,
                                                    marginLeft: 10,
                                                }}
                                            ></img>
                                        </div>
                                    </div>
                                    <div className="border-solid title-payment-order">
                                        <div className="title-payment-order-item">
                                            <p>Tổng tiền hàng</p>
                                            <p>
                                                <Currency
                                                    quantity={Number.parseFloat(
                                                        dataTrackingOrder?.TrackingOrder?.PaymentSalePrice || 0
                                                    )}
                                                    currency="VND"
                                                    pattern="##,### !"
                                                    symbol=""
                                                /><span>VND</span>
                                            </p>
                                        </div>
                                        <div className="title-payment-order-item">
                                            <p>Phí vận chuyển</p>
                                            <p>
                                                <Currency
                                                    quantity={Number.parseFloat(
                                                        dataTrackingOrder?.TrackingOrder?.ShipmentPrice || 0
                                                    )}
                                                    currency="VND"
                                                    pattern="##,### !"
                                                    symbol=""
                                                />
                                                <span>VND</span>
                                            </p>
                                        </div>
                                        <div className="title-payment-order-item">
                                            <p>Miễn phí vận chuyển</p>
                                            <p>
                                                {dataTrackingOrder?.TrackingOrder?.FreeShipDiscountPrice} <span>VND</span>
                                            </p>
                                        </div>
                                        <div className="title-payment-order-item">
                                            <p>Giảm trừ</p>
                                            <p>
                                                <Currency
                                                    quantity={Number.parseFloat(
                                                        dataTrackingOrder?.TrackingOrder?.VoucherPrice || 0
                                                    )}
                                                    currency="VND"
                                                    pattern="##,### !"
                                                    symbol=""
                                                />
                                                <span>VND</span>
                                            </p>
                                        </div>
                                        <div className="title-payment-order-item">
                                            <p>Tổng thanh toán</p>
                                            <p style={{ color: '#FF2C00' }}>
                                                <Currency
                                                    quantity={Number.parseFloat(
                                                        dataTrackingOrder?.TrackingOrder?.PaymentTotal || 0
                                                    )}
                                                    currency="VND"
                                                    pattern="##,### !"
                                                    symbol=""
                                                />
                                                <span
                                                    style={{ color: '#FF2C00' }}
                                                >
                                                    VND
                                                </span>
                                            </p>
                                        </div>
                                        <div className="px-0 d-flex title-payment-order-item">
                                            <div className="flex flex-row">
                                                <img
                                                    src="/images/icon/order-detail/ic_money.svg"
                                                    style={{ width: 18 }}
                                                />
                                                <p
                                                    className="order-summary-text"
                                                    style={{ paddingLeft: 5 }}
                                                >
                                                    Phương thức thanh toán
                                                </p>
                                            </div>
                                            <p>{dataTrackingOrder?.TrackingOrder?.PaymentMethodName}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-lg-9 px-0 pl-lg-4">
                                    <PackageCart
                                        readonly={true}
                                        items={dataTrackingOrder?.TrackingOrder?.OrderDetails}
                                    ></PackageCart>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <p className='title-order-container'>Không tìm thấy đơn hàng nào</p>
                )}
            </div>
        </>
    )
}

TrackingOrderContainer = reduxForm({
    form: 'TrackingOrderContainer',
    enableReinitialize: true,
})(TrackingOrderContainer)
const selector = formValueSelector('TrackingOrderContainer')
TrackingOrderContainer = connect((state) => {
    const OrderCode = selector(state, 'orderCode')
    return {
        OrderCode:OrderCode
    }
})(TrackingOrderContainer)

export default TrackingOrderContainer;