import RenderCheckBox from '@spo/components/redux-form/common/sign-up/render-checkbox';
import RenderInput from '@spo/components/redux-form/common/sign-up/render-input';
import * as Validator from '@spo/lib/validator';
import SignInActions from '@spo/redux/sign-in/action';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect, useDispatch } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import ButtonMain from '../../../components/common/button-main';
import SignInSocial from '../../../components/common/sign-in-social';
import RenderCaptcha from '../../../components/redux-form/common/render-captcha';
import useCustomRoute from '../../../library/use-custom-route';
import { POPUP_WARNING_TYPE } from '../../../utils/EventRegister';
import ButtonRipple from './../../../components/common/button-ripple';
import AppConfig from './../../../config/AppConfig';
import { GetMsg } from './../../../config/Message';
import Utils from './../../../utils/utils';

/**
 * ****************************************************************************
 * HaiDT WrapSignIn CODE
 * wrap-sign-in.js
 *
 * description		:
 * created at		:	2020-11-08
 * created by		:	HaiDT
 * package			:	spo\shared\containers\sign-in\components\wrap-sign-in.js
 * copyright			:	Copyright (c) HaiDT
 * version			:	1.0.0
 * ****************************************************************************
 */
let LocalLoginFailed = 0;
function WrapSignIn (props) {
    const dispatch = useDispatch();
    const recaptchaRef = React.createRef();
    const { handleSubmit, errors, invalid, pristine, submitting } = props;
    const [saveLogin, setSaveLoginInfo] = useState(false);
    const [isSaveLogin, setIsSaveLogin] = useState(false);
    const phoneHistory = Cookies.get('phone');
    const nameHistory = Cookies.get('displayName');
    const [loginFailed, setLoginFailed] = useState(0);
    useEffect(() => {
        document.getElementById('Username').focus();
        return () => {
            dispatch({ type: SignInActions.RESET_FORM_LOGIN });
        };
    }, []);
    useEffect(() => {
        if (phoneHistory) {
            setIsSaveLogin(true);
        }
    }, [phoneHistory]);

    const onSubmitLogin = (e) => {
        if (pristine || submitting || invalid) {
            document.getElementById("Username").focus();
            return;
        }
        const recaptchaValue = recaptchaRef?.current?.getValue();
        excuteLogin(e, recaptchaValue);
    };
    const excuteLogin = async (e, token) => {
        try {
            let phone;
            if (isSaveLogin) {
                phone = phoneHistory;
            } else {
                phone = e.Username;
            }
            let dataSubmit = {
                Username: phone,
                Password: Utils.MD5(e.Password),
                CaptchaToken: e?.CaptchaToken,
            };
            if (checkBeforeSubmit()) {
                dispatch({
                    type: SignInActions.SUBMIT_LOGIN,
                    data: dataSubmit,
                    isSaveLogin: saveLogin || isSaveLogin,
                    success: () => { },
                    error: handleError,
                });
            }
        } catch (err) {
            console.log(err)
        }
    };
    const handleError = (MsgNo, LoginFailed = -1) => {
        if (MsgNo) {
            if (MsgNo == 'E014') {
                if (LoginFailed > 0) {
                    LocalLoginFailed = LoginFailed;
                } else {
                    LocalLoginFailed++;
                }
                setLoginFailed(LocalLoginFailed);
                let time =
                    LocalLoginFailed * AppConfig.TIME_WAITING_LOGIN_FAILED;
                Utils.alertPopup(GetMsg(MsgNo));
                // EventRegister.emit(EVENT_SHOW_POPUP, {
                //     type: POPUP_WAITING_COUNTDOWN,
                //     open: true,
                //     payload: { Time: time },
                // });
            } else if (MsgNo == 'E054') {
                // TODO
                Utils.alertPopup(
                    'Tài khoản của bạn đã bị tạm khóa. Vui lòng liên hệ bộ phận CSKH để được giải quyết',
                    POPUP_WARNING_TYPE,
                );
                // EventRegister.emit(EVENT_SHOW_POPUP, {
                //     type: POPUP_ACCOUNT_LOCKED,
                //     open: true,
                // });
            } else if (MsgNo == 'E050') {
                setLoginFailed(3);
            } else if (MsgNo == 'E064') {
                // TODO
                Utils.alertPopup(
                    'Tài khoản của bạn đã đưa vào danh sách đen. Vui lòng liên hệ bộ phận CSKH để được giải quyết',
                    POPUP_WARNING_TYPE,
                );
                // EventRegister.emit(EVENT_SHOW_POPUP, {
                //     type: POPUP_ACCOUNT_IN_BACKLIST,
                //     open: true,
                // });
            } else {
                Utils.alertPopup(GetMsg(MsgNo));
            }
        } else {
            LocalLoginFailed = 0;
        }
        props.change('CaptchaToken', '');
    };
    const checkBeforeSubmit = () => {
        const token = AppConfig.ACCESS_TOKEN;
        console.log("token", token, AppConfig.ACCESS_TOKEN)
        if (token) {
            Utils.alertPopup(
                'Lỗi hệ thống. Xin Vui lòng thử lại!'
            );
            return false;
        }
        return true;
    };
    const onForgetPassword = () => {
        useCustomRoute(dispatch, '/forgot-password');
    };
    const onChangeAccount = () => {
        Cookies.remove('phone');
        Cookies.remove('displayName');
        setIsSaveLogin(false);
    };
    const handleKeyDown = function (e, cb) {
        if (e.key === 'Enter' && e.shiftKey === false) {
            e.preventDefault();
            cb();
        }
    };
    const responseGoogle = (response) => {
        if (response.tokenId) {
            try {
                dispatch({
                    type: SignInActions.AUTH_SOCIAL,
                    data: {
                        Type: 'google',
                        Token: response.tokenId,
                        CaptchaToken: "",
                        LatOfMap: "",
                        LongOfMap: "",
                        Browser: "",
                        PlayerId: "",
                        Serial: "",
                    }
                })
            } catch (error) {
                console.log("err", error)
            }
        }
    };
    const responseFacebook = (response) => {
        if (response.accessToken) {
            try {
                dispatch({
                    type: SignInActions.AUTH_SOCIAL,
                    data: {
                        Type: 'facebook',
                        Token: response.accessToken,
                        CaptchaToken: "",
                        LatOfMap: "",
                        LongOfMap: "",
                        Browser: "",
                        PlayerId: "",
                        Serial: "",
                    }
                })
            } catch (error) {
                console.log("err", error)
            }
        }
    };
    return (
        <>
            <form
                className="position-relative _custom_screen"
                style={{ minHeight: 500, maxWidth: 400, width: '100%' }}
                onKeyDown={(e) => handleKeyDown(e, handleSubmit(onSubmitLogin))}
                onSubmit={handleSubmit(onSubmitLogin)}>
                <div>
                    <div className='welcome'>
                        {isSaveLogin ? (
                            <div className="d-center flex-column">
                                <div>
                                    <span>Xin chào,</span>{' '}
                                    <span style={{ fontWeight: 500 }}>{nameHistory}</span>
                                </div>
                                <div>
                                    <span>{phoneHistory}</span>
                                </div>
                            </div>
                        ) : (
                            <Field
                                name="Username"
                                type="text"
                                component={RenderInput}
                                placeholder="Nhập số điện thoại"
                                validate={[
                                    Validator.required,
                                    Validator.maxLength10,
                                    Validator.phone,
                                ]}
                                image="/images/sign-up/phone-area.png"
                                maxLength={10}
                            />
                        )}
                    </div>
                    <div style={{ paddingBottom: isSaveLogin ? 60 : 30 }}>
                        <Field
                            name="Password"
                            type="password"
                            component={RenderInput}
                            placeholder="Nhập mã PIN"
                            isShowPassIcon={true}
                            validate={[Validator.required, Validator.checkPIN]}
                            maxLength={6}
                        />
                    </div>
                    {loginFailed >= 3 && (
                        <div style={{ paddingBottom: 60, width: '100%' }}>
                            {/* <ReCAPTCHA
                                ref={recaptchaRef}
                                sitekey={AppConfig.CAPTCHA_SITE_KEY}
                            /> */}
                            <Field
                                name="CaptchaToken"
                                component={RenderCaptcha}
                                validate={[Validator.required]}
                            />
                        </div>
                    )}
                    {!isSaveLogin && (
                        <div className="d-start save-login">
                            <Field
                                name="saveLogin"
                                value={saveLogin}
                                typeValue={[true, false]}
                                component={RenderCheckBox}
                                onChange={(e) => setSaveLoginInfo(e)}></Field>
                            <span
                                className="label_save_info"
                                style={{ paddingLeft: 10 }}>
                                Lưu thông tin đăng nhập
                            </span>
                        </div>
                    )}
                    <div className="padding-bottom-login">
                        <div style={{ height: 39 }}>
                            <ButtonMain
                                className="w-100 btn-main"
                                title="Đăng nhập"
                                //disabled={pristine || submitting || invalid}
                                onClick={handleSubmit(onSubmitLogin)}
                            />
                        </div>
                    </div>
                    {isSaveLogin && (
                        <>
                            <div className="d-flex justify-content-between">
                                <span
                                    style={{ fontSize: 16, fontWeight: 400 }}
                                    tabIndex="0"
                                    className="link-hover link-focus"
                                    onClick={onForgetPassword}>
                                    <FormattedMessage id="common.forgot_password" />
                                </span>
                                <span
                                    style={{ fontSize: 16, fontWeight: 400 }}
                                    tabIndex="0"
                                    className="link-hover link-focus"
                                    onClick={onChangeAccount}>
                                    Đổi tài khoản
                                </span>
                            </div>
                        </>
                    )}
                    {!isSaveLogin && (
                        <>
                            {/* <div
                                className="d-center padding-bottom-login">
                                <span
                                    tabIndex="0"
                                    className="link-hover link-focus"
                                    onClick={onForgetPassword}>
                                    <FormattedMessage id="common.forgot_password" />
                                </span>
                            </div>
                            <div
                                className="d-flex padding-bottom-login">
                                <hr className="my-auto flex-grow-1" />
                                <div
                                    className="px-4"
                                    style={{ fontSize: 14, fontWeight: 400 }}>
                                    HOẶC
                                </div>
                                <hr className="my-auto flex-grow-1" />
                            </div>
                            <div
                                className=" d-center form-group"
                                style={{ paddingBottom: 30 }}>
                                <ButtonRipple
                                    className="button-go-sign-up"
                                    style={{ width: 200 }}
                                    title="Đăng ký mới"
                                    onClick={props.changeTab}
                                />
                            </div> */}
                            <SignInSocial
                                responseFacebook={responseFacebook}
                                responseGoogle={responseGoogle}
                            />
                            <div
                                className=" d-center" style={{marginTop:60}}>
                                <span tabIndex="0" className="text-center">
                                    Bằng việc chọn <span style={{ fontWeight: 500 }}>Đăng Nhập</span>, bạn xác nhận đã
                                    đọc & đồng ý với các
                                    <span className="policy-terms-text">
                                        {' '}
                                        Điều Khoản Sử Dụng
                                    </span>{' '}
                                    cùng{' '}
                                    <span className="policy-terms-text">
                                        {' '}
                                        Chính Sách Bảo Mật & Chia Sẻ Thông Tin
                                    </span>{' '}
                                    của{' '}
                                    <span style={{ fontWeight: 400, color: "#FF2C00" }}>FM</span>
                                    .
                                </span>
                            </div>
                        </>
                    )}
                </div>
            </form>
        </>
    );
}

WrapSignIn = reduxForm({
    form: 'WrapSignIn',
})(WrapSignIn);

WrapSignIn = connect((state) => ({}))(WrapSignIn);
export default WrapSignIn;
