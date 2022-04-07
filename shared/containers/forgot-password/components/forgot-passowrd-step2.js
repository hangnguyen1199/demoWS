import React, { useState } from 'react';
import OtpInput from 'react-otp-input';
import { useDispatch } from 'react-redux';
import { reduxForm } from 'redux-form';
import AuthActions from '../../../../redux/auth/action';
import ButtonMain from '../../../components/common/button-main';
import useCountDown from '../../../library/use-count-down';
import Utils from '../../../utils/utils';
import ButtonRipple from './../../../components/common/button-ripple';
import CountdownOtp from './../../../components/common/countdown-otp';
import AppConfig from './../../../config/AppConfig';

/**
 * ****************************************************************************
 * DUNGNT ForgotPassowrdStep2 CODE
 * forgot-passowrd-step2.js
 *
 * description		:
 * created at		:	2021-12-20
 * created by		:	DungNT
 * package			:	shared\containers\forgot-password\components\forgot-passowrd-step2.js
 * copyright			:	Copyright (c) DungNT
 * version			:	1.0.0
 * ****************************************************************************
 */
function ForgotPassowrdStep2(props) {
    const {
        handleSubmit,
        pristine,
        submitting,
        invalid,
        setCurrentStep,
        email = '',
        otp,
        setOtp,
    } = props;
    const dispatch = useDispatch();
    const ResendOTPTime = AppConfig.COUNTDOWN_RESEND_OTP;
    const [time, setTime] = useCountDown(ResendOTPTime);
    const [loadingResend, setLoadingResend] = useState(false);
    const handleSubmitOtp = (e) => {
        let newDataSubmit = {
            Email: email,
            OTP: otp,
            LatOfMap: Utils.getLocation()[0],
            LongOfMap: Utils.getLocation()[1],
            Browser: AppConfig.BROWER,
            PlayerId: AppConfig.PLAYER_ID,
            Serial: AppConfig.SERIAL_NUMBER,
        };
        dispatch({
            type: AuthActions.CHECK_OTP_FORGOT_PASSWORD,
            data: newDataSubmit,
            success: () => {
                setCurrentStep(3);
                setOtp(otp);
            },
            error: handleError,
        });
    };

    const handleError = () => {};
    const onResend = () => {
        setLoadingResend(true);
        let newDataSubmit = {
            Email: email,
            LatOfMap: Utils.getLocation()[0],
            LongOfMap: Utils.getLocation()[1],
            Browser: AppConfig.BROWER,
            PlayerId: AppConfig.PLAYER_ID,
            Serial: AppConfig.SERIAL_NUMBER,
        };
        setTime(ResendOTPTime);
        dispatch({
            type: AuthActions.RESEND_OTP_FORGOT_PASSWORD,
            data: newDataSubmit,
            success: () => {
                setTime(ResendOTPTime);
                setLoadingResend(false);
            },
            error: () => {
                setLoadingResend(false);
                setTime(AppConfig.COUNTDOWN_RESEND_OTP);
            },
        });
    };
    const onChangeOTP = (val) => {
        setOtp(val);
    };
    return (
        <div className="verify-otp">
            <div className="title mt-0">Xác nhận OTP</div>
            <div className="_sub-title">
                Một mã xác nhận gồm 6 số đã được gửi đến email {email}
            </div>
            <div className="_sub-title2">Nhập để tiếp tục</div>
            <div>
                <OtpInput
                    className="_otpCode"
                    value={otp}
                    onChange={onChangeOTP}
                    numInputs={6}
                    separator={<span style={{ marginLeft: 3 }}></span>}
                    isInputSecure={false}
                    isInputNum={true}
                    shouldAutoFocus={true}
                    focusStyle={{ backgroundColor: '#FFFFFF' }}
                    inputStyle={{
                        width: 49,
                        height: 49,
                        color: '#000000',
                        borderRadius: 4,
                        backgroundColor: '#F2F2F2',
                    }}
                    containerStyle={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        color: '#000000',
                        borderRadius: 4,
                        backgroundColor: '#FFFFFF',
                    }}
                />
            </div>
            <CountdownOtp
                time={time}
                loadingResend={loadingResend}
                onResend={onResend}
            />
            <div className="wrap_btn" style={{ width: '100%', height: 39 }}>
                <ButtonMain
                    disabled={otp.length != 6}
                    className="w-100 btn-main"
                    title="Tiếp tục"
                    onClick={handleSubmit(handleSubmitOtp)}
                />
            </div>
        </div>
    );
}
ForgotPassowrdStep2 = reduxForm({
    form: 'ForgotPassowrdStep2',
    onSubmitFail: (errors) => {},
})(ForgotPassowrdStep2);
export default ForgotPassowrdStep2;
