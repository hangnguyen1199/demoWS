// import IconSuccess from '@spo/icons/icon-success';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { reduxForm } from 'redux-form';
import AuthActions from '../../../../redux/auth/action';
import { GetMsg } from '../../../config/Message';
import { POPUP_SUCCESS_TYPE, SECOND_POPUP } from '../../../utils/EventRegister';
import Utils from '../../../utils/utils';
import FormInputPhone from './change-phone/form-input-phone';
import VerifyOtpCommon from './change-phone/verify-otp';
import ResizePopup from './resize-popup';

function ChangePhonePopup (props) {
    const { payload, showVisible } = props;
    const dispatch = useDispatch();
    const [phone, setPhone] = useState('');
    const [currentStep, setCurrentStep] = useState(1);
    const formRegister = useRef(null);
    const { onStepChange } = props;
    //----------------------------------------------
    // Effect
    //----------------------------------------------

    useEffect(() => {
        if (onStepChange) {
            onStepChange(currentStep);
        }
    }, [currentStep]);
    const onSubmitOtp = (data) => {
        dispatch({
            type: AuthActions.UPDATE_PHONE,
            data: data,
            success: () => {
                dispatch({ type: AuthActions.GET_USER_PROFILE });
                showVisible(false);
                Utils.alertPopup('Cập nhật số điện thoại thành công', POPUP_SUCCESS_TYPE);
            },
            error: err => {
                if (err) {
                    let msg = GetMsg(err)
                    Utils.alertPopup(msg, null, null, SECOND_POPUP);
                }
            },
        });
    }
    const onResend = ({success,error}) => {
        dispatch({
            type: AuthActions.SEND_OTP_PHONE,
            data: {
                Phone: phone
            },
            success: () => {
                success && success()
            },
            error: err => {
                console.log(err)
                error && error(err)
            },
        });
    }
    const renderBody = () => {
        return (
            <>
                <form
                    className="position-relative _custom_screen"
                    ref={formRegister}>
                    {currentStep == 1 && (
                        <div>
                            <FormInputPhone
                                setPhone={setPhone}
                                setCurrentStep={setCurrentStep}
                            />
                        </div>
                    )}
                    {currentStep === 2 && (
                        <div className='signin-signup'>
                            <VerifyOtpCommon phone={phone} onSubmit={onSubmitOtp} onResend={onResend}  />
                        </div>
                    )}
                </form>
            </>
        );
    };

    return (
        <ResizePopup
            payload={payload}
            showVisible={showVisible}
            body={renderBody}
            className="change-phone-popup"
        />
    );
}
ChangePhonePopup.defaultProps = {
    payload: {
        title: 'Đã lưu thành công',
    },
};

export default ChangePhonePopup;
