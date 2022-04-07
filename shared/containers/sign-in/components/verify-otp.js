import SignUpActions from '@spo/redux/sign-up/action';
import React, { useState } from 'react';
import OtpInput from 'react-otp-input';
import { useDispatch } from 'react-redux';
import { reduxForm } from 'redux-form';
import AuthActions from '../../../../redux/auth/action';
import ButtonMain from '../../../components/common/button-main';
import useCountDown from '../../../library/use-count-down';
import ButtonRipple from './../../../components/common/button-ripple';
import CountdownOtp from './../../../components/common/countdown-otp';
import AppConfig from './../../../config/AppConfig';
import Utils from './../../../utils/utils';

function VerifyOtp(props) {
    const {
        handleSubmit,
        pristine,
        submitting,
        invalid,
        setCurrentStep,
        phone,
    } = props;
    const dispatch = useDispatch();
    const ResendOTPTime = AppConfig.COUNTDOWN_RESEND_OTP;
    const [otp, setOtp] = useCountDown('');
    const [time, setTime] = useCountDown(ResendOTPTime);
    const [loadingResend, setLoadingResend] = useState(false);
    const handleSubmitOtp = (e) => {
        let newDataSubmit = {
            Phone: phone,
            Code: otp,
            LatOfMap: Utils.getLocation()[0],
            LongOfMap: Utils.getLocation()[1],
            Browser: AppConfig.BROWER,
            PlayerId: AppConfig.PLAYER_ID,
            Serial: AppConfig.SERIAL_NUMBER,
        };
        dispatch({
            type: SignUpActions.SIGN_UP_VERIFY_OTP,
            data: newDataSubmit,
            success: handleSuccess,
            error: handleError,
        });
    };
    const handleSuccess = () => {
        setCurrentStep(3);
    };
    const handleError = () => {};
    const onResend = () => {
        setLoadingResend(true);
        let newDataSubmit = {
            Phone: phone,
            LatOfMap: Utils.getLocation()[0],
            LongOfMap: Utils.getLocation()[1],
            Browser: AppConfig.BROWER,
            PlayerId: AppConfig.PLAYER_ID,
            Serial: AppConfig.SERIAL_NUMBER,
        };
        setTime(ResendOTPTime);
        dispatch({
            type: AuthActions.RESEND_OTP,
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
            <div className="title">Xác nhận OTP</div>
            <div className="_sub-title">
                Một mã xác nhận gồm 6 số đã được gửi đến số điện thoại {phone}
            </div>
            <div className="_sub-title2">Nhập để tiếp tục</div>
            <div>
                {/* <OtpCode onChange={onChangeOTP} /> */}
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
                    className="w-100"
                    title="Tiếp tục"
                    onClick={handleSubmit(handleSubmitOtp)}
                />
            </div>
        </div>
    );
}
VerifyOtp = reduxForm({
    form: 'VerifyOtp',
    onSubmitFail: (errors) => {},
})(VerifyOtp);
export default VerifyOtp;
