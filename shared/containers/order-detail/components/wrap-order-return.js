import UploadMultipleImages from '@spo/components/account/order-management/upload-multiple-images';
import PackageCart from '@spo/components/cart/package-cart';
import ButtonDark from '@spo/components/common/button-dark';
import IconChevronRight from '@spo/components/common/icon-chevron-right';
import Actions from '@spo/redux/account/actions';
import { useRouter } from 'next/router';
import { PropTypes } from 'prop-types';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import EventRegister, {
    EVENT_SHOW_POPUP,
    POPUP_WARNING_TYPE,
    REFUND_REASON_POPUP
} from '../../../../shared/utils/EventRegister';
import Utils from '../../../../shared/utils/utils';
import ButtonMain from '../../../components/common/button-main';
import PageList from '../../../config/PageList';
import useCustomRoute from '../../../library/use-custom-route';

function WrapOrderInfoReTurn (props) {
    const { handleSubmit } = props;
    const { listReturnReason } = useSelector((state) => state.Common.data);

    const router = useRouter();
    const dispatch = useDispatch();
    const orderDetail = useSelector((state) => state.OrderDetail.data.orderDetail);
    const [openReturnReasonModal, setOpenReturnReasonModal] = useState(false);
    const [reasonReturn, setReasonReturn] = useState('');
    function goOrderList () {
        useCustomRoute(dispatch, PageList.ORDER_MANAGEMENT.SERVER);
    }
    const toggleReturnReasonModal = async () => {
        // setOpenReturnReasonModal(!openReturnReasonModal);
        EventRegister.emit(EVENT_SHOW_POPUP, {
            type   : REFUND_REASON_POPUP,
            open   : true,
            payload: {
                List     : listReturnReason,
                title    : "Chọn lý do Trả hàng/ Hoàn tiền",
                className: "refund_reason_popup _mobile_screen",
                active   : reasonReturn,
                callback : (e) => {
                    handleGetReasonReturnOrder(e)
                }
            },
        });
    };
    const handleGetReasonReturnOrder = (data) => {
        setReasonReturn(data);
        // setOpenReturnReasonModal(false);
    };
    const handleSendReasonReturnOrder = (e) => {
        let param = {};
        param.OrderId = orderDetail.OrderId
        param.OrderCode = orderDetail.Code;
        param.RefundReason = reasonReturn.Id;
        param.Files = e.return.Files;
        if (!param.RefundReason || param.Files.length === 0) {
            Utils.alertPopup('Vui lòng chọn lý do trả hàng và đính kèm hình ảnh', POPUP_WARNING_TYPE);
            return;
        }
        dispatch({
            type   : Actions.RETURN_ORDER,
            data   : param,
            orderId: orderDetail?.OrderId
        });
    };
    return (
        <>
            {/* {openReturnReasonModal ? (
                <ReturnReasonModal
                    active={openReturnReasonModal}
                    hide={toggleReturnReasonModal}
                    handleClick={handleGetReasonReturnOrder}
                />
            ) : null} */}
            <div className="col-12 px-0" style={{ display: 'block' }}>
                <div className="d-start" >
                    <div className='order-detail-go-back pointer d-flex align-items-center' onClick={goOrderList}>
                        <img className="order-arrow-back" src="/images/icon/order-detail/ic_back.svg"></img>
                        <span className='order-arrow-back-text'>Quản lý đơn hàng</span>
                    </div>
                </div>
                {/* <div className="block-info-border" style={{height: 59}}>
                    <div>
                        Vui lòng chọn sản phẩm để Trả hàng/ Hoàn tiền
                    </div>
                </div> */}
                <div style={{ paddingTop: 30 }}>
                    <PackageCart items={orderDetail?.OrderDetails} readonly={true}></PackageCart>
                </div>
                <div className='d-flex justify-content-between align-items-center' style={{ paddingTop: 60 }}>
                    <div className='d-flex align-items-center' style={{ fontSize: 16, fontWeight: 500, color: "#333333" }}>
                        Lý do
                    </div>
                    <div className='d-flex align-items-center pointer' onClick={toggleReturnReasonModal}>
                        <span style={{ color: "#707070", fontSize: 16, fontWeight: 400 }} >
                            Chọn lý do
                        </span>
                        <div style={{ marginLeft: 10 }}>
                            <IconChevronRight fontSize={14} />
                        </div>
                    </div>
                </div>
                <div style={{ paddingBottom: 20, borderBottom: "1px inset", paddingTop: 15 }}>
                    {reasonReturn?.Name}
                </div>
                <div style={{ paddingTop: 20 }}>
                    <div style={{ paddingBottom: 20 }}>
                        Vui lòng đăng tải hình ảnh/đoạn chat rõ ràng, thể hiện đúng tình trạng sản phẩm
                    </div>
                    <Field
                        name={`return[Files]`}
                        component={UploadMultipleImages}
                        defaultImages={[]}
                        maxFiles={5}
                        maxFileSize={3 * 1024 * 1024}
                        index={0}
                    />
                </div>
                <div className='' style={{ width: 180, height: 39 }}>
                    <ButtonMain
                        className="w-100"
                        title="Hoàn thành"
                        onClick={handleSubmit(handleSendReasonReturnOrder)}
                        type="submit"
                    />
                </div>
            </div>
        </>
    );
}

WrapOrderInfoReTurn.propTypes = {
    items: PropTypes.array,
};
WrapOrderInfoReTurn.defaultProps = {
    items: [],
};
WrapOrderInfoReTurn = reduxForm({ form: 'WrapOrderInfoReTurnForm' })(WrapOrderInfoReTurn);
export default WrapOrderInfoReTurn;
