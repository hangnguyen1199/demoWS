import React, { useState } from 'react';
import OtpInput from 'react-otp-input';
import { useDispatch } from 'react-redux';
import { reduxForm } from 'redux-form';
import AppConfig from '../../../../config/AppConfig';
import { useCountDown } from '../../../../library/use-count-down';
import ButtonRipple from '../../button-ripple';
import CountdownOtp from '../../countdown-otp';
import { GetMsg } from '../../../../config/Message';
import Utils from '../../../../utils/utils';
import { SECOND_POPUP } from '../../../../utils/EventRegister';
import ButtonMain from '../../button-main';


function VerifyOtpCommon(props) {
    const {
        handleSubmit,
        pristine,
        submitting,
        invalid,
        setCurrentStep,
        phone,
        isPhone = true
    } = props;
    const dispatch = useDispatch();
    const ResendOTPTime = AppConfig.COUNTDOWN_RESEND_OTP;
    const [otp, setOtp] = useCountDown('');
    const [time, setTime] = useCountDown(ResendOTPTime);
    const [loadingResend, setLoadingResend] = useState(false);
    const handleSubmitOtp = (e) => {

        let newDataSubmit = {
            OTP: otp,
        };
        if(isPhone){
            newDataSubmit["Phone"] = phone
        }else{
            newDataSubmit["Email"] = phone
        }
        props?.onSubmit(newDataSubmit)
    };
    const onResend = () => {
        // setLoadingResend(true);
        // let newDataSubmit = {
        //     Phone: phone,
        //     LatOfMap: Utils.getLocation()[0],
        //     LongOfMap: Utils.getLocation()[1],
        //     Browser: AppConfig.BROWER,
        //     PlayerId: AppConfig.PLAYER_ID,
        //     Serial: AppConfig.SERIAL_NUMBER,
        // };
        // setTime(ResendOTPTime);
        // dispatch({
        //     type: AuthActions.RESEND_OTP,
        //     data: newDataSubmit,
        //     success: () => {
        //         setTime(ResendOTPTime);
        //         setLoadingResend(false);
        //     },
        //     error: () => {
        //         setLoadingResend(false);
        //         setTime(AppConfig.COUNTDOWN_RESEND_OTP);
        //     },
        // });
        setLoadingResend(true);
        props.onResend({
            success:()=>{
                setTime(ResendOTPTime);
                setLoadingResend(false);
            },
            error: (err)=>{
                let msg = GetMsg(err);
                if(msg != null && msg != ""){
                    Utils.alertPopup(msg, null, null, SECOND_POPUP)
                }else{
                    Utils.alertPopup("Lỗi hệ thống, vui lòng thử lại sau", null, null, SECOND_POPUP)
                }
                        
                setLoadingResend(false);
                setTime(AppConfig.COUNTDOWN_RESEND_OTP);
                
            }
        })
    };
    const onChangeOTP = (val) => {
        setOtp(val);
    };
    return (
        <div className="verify-otp">
            <div className="title">Xác nhận OTP</div>
            <div className="_sub-title">
                Một mã xác nhận gồm 6 số đã được gửi đến {isPhone ? "số điện thoại" : "email"} {phone}
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
VerifyOtpCommon = reduxForm({
    form: 'VerifyOtpCommon',
    onSubmitFail: (errors) => {},
})(VerifyOtpCommon);
export default VerifyOtpCommon;
