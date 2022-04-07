import React, { useEffect, useState } from 'react';
import { handleScroll } from '../../../library/helper';
import EventRegister, {
    ADD_ADDRESS_POPUP, BUY_POINT_BANK_POPUP, BUY_POINT_POPUP, CHANGE_MAIL_POPUP, CHANGE_PHONE_POPUP, CHOOSE_FREESHIP_VOUCHER_POPUP,
    CHOOSE_VOUCHER_POPUP,
    CONFIRM_POPUP, DAILY_REWARD_POPUP, EVENT_SHOW_POPUP, EVENT_SHOW_POPUP2,
    FIRST_POPUP, POINTS_TRANSACTION_DETAIL_POPUP, PURCHASE_BAR_CODE_POPUP, REFUND_REASON_POPUP, REQUEST_VERIFY_PHONE_POPUP, REVIEW_POPUP,
    SHOW_IMAGE_POPUP,
    SHOW_LIST_COLOR,
    SUCCESS_POPUP, USER_QR_DATA_POPUP, WARNING_POPUP
} from '../../../utils/EventRegister';
import AddressPopup from './add-address-popup';
import BuyGoldPointBankPopup from './buy-gold-points-bank-popup';
import BuyGoldPointPopup from './buy-gold-points-popup';
import ChangeEmailPopup from './change-mail-popup';
import ChangePhonePopup from './change-phone-popup';
import ConfirmPopup from './confirm-popup';
import DailyRewardPopup from './daily-reward-popup';
import PointsTransactionDetailPopup from './points-transaction-detail-popup';
import PurchaseBarCodePopup from './purchase-bar-code-popup';
import RefundReasonPopup from './refund-reason-popup';
import RequestVerifyPhonePopup from './request-verify-phone-popup.js';
import ReviewPopup from './review-popup';
import ShowImagePopup from './show-image-popup';
import SuccessPopup from './success-popup';
import TextPopup from './text-popup';
import UserQrDataPopup from './user-qr-data-popup';
import VoucherPopup from './voucher-popup';
import WarningPopup from './warning-popup';
import ListColorPopup from './list-color-popup';


const CommonPopup = (props) => {
    let zIndex = props?._key == FIRST_POPUP ? 1050 : 1052
    const [visible, showVisible] = useState(false);
    const [type, setType] = useState(REFUND_REASON_POPUP);
    const [payload, setPayload] = useState(null);
    useEffect(() => {
        let eventName = props?._key == FIRST_POPUP ? EVENT_SHOW_POPUP : EVENT_SHOW_POPUP2
        const reloadEvent = EventRegister.on(eventName, (params) => {
            showVisible(false);
            setTimeout(() => {
                if (params) {
                    setType(params.type);
                    showVisible(params.open);
                    setPayload(params?.payload);
                }
            }, 100);
        });
        return () => {
            EventRegister.off(reloadEvent);
        };
    }, []);

    useEffect(() => {
        let _class = props?._key == FIRST_POPUP ? 'popup-open' : 'popup-open-layer2'
        handleScroll(visible, _class)
        // if (visible) {
        //     // $('html').addClass('popup-open');
        //     if ($(document).height() > $(window).height()) {
        //         var scrollTop = ($('html').scrollTop()) ? $('html').scrollTop() : $('body').scrollTop(); // Works for Chrome, Firefox, IE...
        //         $('html').addClass('popup-open').css('top', -scrollTop);
        //     }
        // } else {
        //     // $('html').removeClass('popup-open');
        //     var scrollTop = parseInt($('html').css('top'));
        //     $('html').removeClass('popup-open');
        //     $('html,body').scrollTop(-scrollTop);
        // }
    }, [visible]);

    const hiddenPopup = () => {
        showVisible(false);
        payload?.backdropCallback &&  payload.backdropCallback()
    };

    const getType = () => {
        switch (type) {
            case SUCCESS_POPUP:
                return (
                    <SuccessPopup payload={payload} showVisible={hiddenPopup} />
                );
            case WARNING_POPUP:
                return (
                    <WarningPopup payload={payload} showVisible={hiddenPopup} />
                );
            case CONFIRM_POPUP:
                return (
                    <ConfirmPopup payload={payload} showVisible={hiddenPopup} />
                );
            case ADD_ADDRESS_POPUP:
                return (
                    <AddressPopup payload={payload} showVisible={hiddenPopup} />
                );
            case CHOOSE_VOUCHER_POPUP:
                return (
                    <VoucherPopup type="1" payload={payload} showVisible={hiddenPopup} />
                );
            case CHOOSE_FREESHIP_VOUCHER_POPUP:
                return (
                    <VoucherPopup type="2" payload={payload} showVisible={hiddenPopup} />
                );
            case REVIEW_POPUP:
                return (
                    <ReviewPopup payload={payload} showVisible={hiddenPopup} />
                );
            case BUY_POINT_POPUP:
                return (
                    <BuyGoldPointPopup payload={payload} showVisible={hiddenPopup} />
                );
            case BUY_POINT_BANK_POPUP:
                return (
                    <BuyGoldPointBankPopup payload={payload} showVisible={hiddenPopup} />
                );
            case PURCHASE_BAR_CODE_POPUP:
                return (
                    <PurchaseBarCodePopup payload={payload} showVisible={hiddenPopup} />
                );
            case POINTS_TRANSACTION_DETAIL_POPUP:
                return (
                    <PointsTransactionDetailPopup payload={payload} showVisible={hiddenPopup} />
                );
            case USER_QR_DATA_POPUP:
                return (
                    <UserQrDataPopup payload={payload} showVisible={hiddenPopup} />
                );
            case DAILY_REWARD_POPUP:
                return (
                    <DailyRewardPopup payload={payload} showVisible={hiddenPopup} />
                );
            case REQUEST_VERIFY_PHONE_POPUP:
                return (
                    <RequestVerifyPhonePopup payload={payload} showVisible={hiddenPopup} />
                );
            case CHANGE_PHONE_POPUP:
                return (
                    <ChangePhonePopup payload={payload} showVisible={hiddenPopup} />
                );
            case CHANGE_MAIL_POPUP:
                return (
                    <ChangeEmailPopup payload={payload} showVisible={hiddenPopup} />
                );
            case SHOW_IMAGE_POPUP:
                return (
                    <ShowImagePopup payload={payload} showVisible={hiddenPopup} />
                );
            case REFUND_REASON_POPUP:
                return (
                    <RefundReasonPopup payload={payload} showVisible={hiddenPopup} />
                );
            case SHOW_LIST_COLOR:
                return (
                    <ListColorPopup payload={payload} showVisible={hiddenPopup} />
                );
            default:
                return (
                    <TextPopup payload={payload} showVisible={hiddenPopup} />
                );
        }
    };
    const handleStopPropagation = (e) => {
        e.stopPropagation();
    };
    return (
        visible && (
            <>
                <div
                    className={`wrap_common_popup ${visible ? 'show' : ''} ${payload?.className ?? ""}`}
                    id="commonPopup"
                    onClick={hiddenPopup}
                    style={{ zIndex: zIndex + 1 }}
                >
                    <div className="popup-dialog">
                        <div
                            className="popup-content"
                            onClick={handleStopPropagation}>
                            {getType() ?? <></>}
                        </div>
                    </div>
                </div>
                <div
                    style={{ zIndex: zIndex }}
                    className={`popup-backdrop fade ${visible ? 'show' : ''
                    }`}></div>
            </>
        )
    );
};

export default CommonPopup;
