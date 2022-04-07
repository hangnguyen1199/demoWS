import React, { useEffect, useState } from 'react';
import PackageCart from '../../components/cart/package-cart';
import ButtonMain from '../../components/common/button-main';
import Currency from 'react-currency-formatter';
import navigate from './../../library/navigate';
import PageList from './../../config/PageList';
import { useSelector, useDispatch } from 'react-redux';
import useCustomRoute from '@spo/lib/use-custom-route';
import action from './../../../redux/tracking-order/action';
import Utils from '../../utils/utils';
import AppConfig from '../../config/AppConfig';
import constants from '@spo/config/constants';

function OrderSuccessContainer(props) {
    const dataTrackingOrder = useSelector((state) => state.TrackingOrder);
    const [info, setInfo] = useState(null)
    const dispatch = useDispatch();
    let orderCode = localStorage.getItem('orderCode');

    useEffect(() => {
        if(orderCode){
            dispatch({
                type:action.LOAD_TRACKING_ORDER,
                data: {
                    orderCode:orderCode
                }
            })

            localStorage.removeItem("orderCode")
        }else{
            useCustomRoute(dispatch,PageList.CART.SERVER)
        }
    }, [])
    const handleCopy=(data)=>{
        Utils.alertPopup('Đã sao chép', () => {}) 
        navigator.clipboard.writeText(data)
    }

    useEffect(() => {
        let dataInfoOrder=JSON.parse(localStorage.getItem('orderInfoDetail'))
        setInfo(dataInfoOrder);
        localStorage.removeItem("orderInfoDetail")
    }, [])
    return (
        <>
            <div style={{marginTop:36}} className="bg-white order-container">
                <div className="tracking-header-container">
                    <p className="title-tracking-header title-tracking-header-24">ĐẶT HÀNG THÀNH CÔNG</p>
                    <p>Cảm ơn bạn đã mua hàng tại FM Style. </p>
                    <p className='title-top3-order'>
                        Đơn hàng của bạn hiện đang được xử lý. Chúng tôi sẽ sớm
                        liên hệ để giao hàng.
                    </p>
                    <ButtonMain
                        className="btn-order-scc"
                        title="Tiếp tục mua sắm"
                        onClick={() => {
                            useCustomRoute(dispatch, '/');
                        }}
                    />
                </div>
                <div className="mt-5">
                    <p className="title-tracking-header mt-5 mb-3">
                        THÔNG TIN ĐƠN HÀNG
                    </p>
                    {dataTrackingOrder?.TrackingOrder?.OrderDetails && dataTrackingOrder?.TrackingOrder?.OrderDetails.length > 0 ? (
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
                                    <div  className="border-solid title-payment-order tracking-order-code-res">
                                        <div className="address-order-block">
                                            <div className="block-info-border">
                                                <img
                                                    src="/images/icon/order-detail/ic_location.svg"
                                                    style={{ width: 14 }}></img>
                                                <span
                                                    style={{
                                                        paddingLeft: 8,
                                                        fontSize: 16,
                                                        fontWeight: 500,
                                                    }}>
                                                Địa chỉ nhận hàng
                                                </span>
                                                <div className="address-order d-flex flex-column">
                                                    <span className="pl-4 pt-2">
                                                        {info?.ShippingName || ''}
                                                    </span>
                                                    <span className="pl-4">
                                                        {info?.OrderPhone || ''}
                                                    </span>
                                                    <span className="pl-4">
                                                        {info?.ReceiveAddress || ''}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="border-solid title-payment-order tracking-order-code-res">
                                        <div className="title-payment-order-item">
                                            <p>Tổng tiền hàng</p>
                                            <p>
                                                <Currency
                                                    quantity={Number.parseFloat(
                                                        dataTrackingOrder
                                                            ?.TrackingOrder
                                                            ?.PaymentSalePrice ||
                                                            0
                                                    )}
                                                    currency="VND"
                                                    pattern="##,### !"
                                                    symbol=""
                                                />
                                                <span>VND</span>
                                            </p>
                                        </div>
                                        <div className="title-payment-order-item">
                                            <p>Phí vận chuyển</p>
                                            <p>
                                                <Currency
                                                    quantity={Number.parseFloat(
                                                        dataTrackingOrder
                                                            ?.TrackingOrder
                                                            ?.ShipmentPrice || 0
                                                    )}
                                                    currency="VND"
                                                    pattern="##,### !"
                                                    symbol=""
                                                />
                                                <span>VND</span>
                                            </p>
                                        </div>
                                        {
                                            AppConfig.ACCESS_TOKEN ? <>
                                                <div className="title-payment-order-item">
                                                    <p>Miễn phí vận chuyển</p>
                                                    <p>
                                                        {
                                                            dataTrackingOrder
                                                                ?.TrackingOrder
                                                                ?.FreeShipDiscountPrice
                                                        }{' '}
                                                        <span>VND</span>
                                                    </p>
                                                </div>
                                                <div className="title-payment-order-item">
                                                    <p>Giảm trừ</p>
                                                    <p>
                                                        <Currency
                                                            quantity={Number.parseFloat(
                                                                dataTrackingOrder
                                                                    ?.TrackingOrder
                                                                    ?.VoucherPrice || 0
                                                            )}
                                                            currency="VND"
                                                            pattern="##,### !"
                                                            symbol=""
                                                        />
                                                        <span>VND</span>
                                                    </p>
                                                </div></> : <></>
                                        }
                                        <div className="title-payment-order-item">
                                            <p>Tổng thanh toán</p>
                                            <p style={{ color: '#FF2C00' }}>
                                                <Currency
                                                    quantity={Number.parseFloat(
                                                        dataTrackingOrder
                                                            ?.TrackingOrder
                                                            ?.PaymentTotal || 0
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
                                            <p className='pl-1'>
                                                {
                                                    dataTrackingOrder
                                                        ?.TrackingOrder
                                                        ?.PaymentMethodName
                                                }
                                            </p>
                                        </div>
                                        {
                                            info?.PaymentMethodId == constants.PAYMENT_METHOD.TRANSFER?
                                                <ul className='info-payment-order'>
                                                    <li>
                                                        <div className='d-flex flex-row'>
                                                            <p className='info-payment-order-left'>Số tài khoản</p>
                                                            <p className='d-flex align-items-center justify-content-between info-payment-order-right'>
                                                                <span>
                                                                    :&nbsp;{info?.TransferAccountNumber}
                                                                </span>
                                                                <img
                                                                    onClick={()=>handleCopy(info?.TransferAccountNumber)}
                                                                    className="hover-color-svg copy-id-product"
                                                                    title="Copy"
                                                                    src="/images/icon/order-detail/icon_copy_detail.svg"
                                                                    style={{
                                                                        width: 20,
                                                                        height: 20,
                                                                        marginLeft: 10,
                                                                    }}
                                                                />
                                                            </p>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className='d-flex flex-row '>
                                                            <p className='info-payment-order-left'>Ngân hàng</p>
                                                            <p className='info-payment-order-right'>:&nbsp;{info?.BankName}</p>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className='d-flex flex-row'>
                                                            <p className='info-payment-order-left'>Chủ tài khoản</p>
                                                            <p className='info-payment-order-right'>:&nbsp;{info?.BankOwner}</p>
                                                        </div>
                                                    </li>
                                                    <li className=' w-100'>
                                                        <p className=' w-100'>Nội dung chuyển khoản</p>
                                                        <div className='d-flex flex-row'>
                                                            <p className='content-payment-order w-100 pl-3'>{info?.Content}</p>
                                                            <img
                                                                className="hover-color-svg copy-id-product"
                                                                title="Copy"
                                                                onClick={()=>handleCopy(info?.Content)}
                                                                src="/images/icon/order-detail/icon_copy_detail.svg"
                                                                style={{
                                                                    width: 20,
                                                                    height: 20,
                                                                    marginLeft: 10,
                                                                }}
                                                            />
                                                        </div>
                                                    </li>
                                                </ul>
                                                :
                                                <></>}
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
                    ) : (
                        <></>
                    )}
                </div>
            </div>
        </>
    );
}
export default OrderSuccessContainer;
