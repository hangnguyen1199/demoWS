import constants from '@spo/config/constants';
import * as Validator from '@spo/lib/validator';
import AppActions from '@spo/redux/app/action';
import ResetPasswordActions from '@spo/redux/reset-password/action';
import Router, { useRouter } from 'next/router';
import { PropTypes } from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import swal from 'sweetalert';
import WrapDialog from '../../../components/common/wrap-dialog';
import ButtonPrimary from './../../../components/common/button-primary';
import Notnull from './../../../components/common/notnull';
import RenderInput from './../../../components/redux-form/login/render-input';
import useCustomRoute from '@spo/lib/use-custom-route';
import Captcha from '../../../components/redux-form/common/captcha';
import PageList from '../../../config/PageList';

const TIME_RESEND = constants.TIME_RESEND;
/**
 * ****************************************************************************
 * DUNGNT WrapResetPassword CODE
 * wrap-reset-password.js
 *
 * description		:
 * created at		:	2020-08-03
 * created by		:	DungNT
 * package			:	spo\shared\containers\reset-password\components\wrap-reset-password.js
 * copyright			:	Copyright (c) DungNT
 * version			:	1.0.0
 * ****************************************************************************
 */

function WrapResetPassword(props) {
    const [time, setTime] = useState(0);
    const router = useRouter()
    const { handleSubmit } = props;
    const { data } = useSelector((state) => state.ForgotPassword);
    const {
        submitSuccess,
        status,
        error,
        loading: { loading_submit, loading_resend },
    } = useSelector((state) => state.ResetPassword);
    const [canSubmit, setCanSubmit] = useState(false);
    const dispatch = useDispatch();
    const formEl = useRef(null);

    const onSubmitForm = (formData) => {
        window.grecaptcha.ready(() => {
            window.grecaptcha
                .execute(constants.PLUGIN.RECAPTCHA.SITE_KEY, {
                    action: 'submit',
                })
                .then((token) => {
                    excuteSubmit(formData, token);
                });
        });
    };
    const excuteSubmit = (formData, token) => {
        dispatch({
            type: ResetPasswordActions.SUBMIT_RESET_PASSWORD,
            data: {
                from: data.from,
                verify_code: formData.verify_code,
                password: formData.password,
                authentication_method: data.authentication_method,
                recaptcha_res: token,
            },
        });
    };
    const onResendCode = (e) => {
        e.preventDefault();
        resendCode();
    };
    const resendCode = () => {
        setTime(TIME_RESEND);
        window.grecaptcha.ready(() => {
            window.grecaptcha
                .execute(constants.PLUGIN.RECAPTCHA.SITE_KEY, {
                    action: 'submit',
                })
                .then((token) => {
                    excuteResend(token);
                });
        });
    };
    const excuteResend = (token) => {
        dispatch({
            type: ResetPasswordActions.RESEND_CODE_RESET_PASSWORD,
            data: {
                from: data.from,
                authentication_method: data.authentication_method,
                recaptcha_res: token,
            },
        });
    };
    useEffect(() => {
        if (!time) {return;}
        const interval = setInterval(() => {
            setTime((time) => time - 1);
        }, 1000);
        return () => clearInterval(interval);
    }, [time]);
    useEffect(() => {
        if (!data.from) {
            useCustomRoute(dispatch, '/forgot-password');
        } else {
            resendCode();
        }
    }, [data.from]);

    // useEffect(() => {
    //     if (status == 404) {
    //         setShowError(true);
    //     }
    //     if (status == 200) {
    //         setShowError(false);
    //         swal(
    //             'Hoàn thành!',
    //             'Bạn đã đổi mật khẩu thành công',
    //             'success',
    //         ).then(() => {
    //             Router.pushRoute(PageList.SIGNIN.SERVER);
    //         });
    //     }
    // }, [error, status]);
    useEffect(() => {
        if (submitSuccess == true) {
            swal(
                'Hoàn thành!',
                'Bạn đã đổi mật khẩu thành công',
                'success',
            ).then(() => {
                Router.pushRoute(PageList.SIGNIN.SERVER);
            });
        }
    }, [submitSuccess]);

    useEffect(() => {
        if (loading_submit) {
            dispatch(AppActions.callLoader());
        } else {
            dispatch(AppActions.closeLoader());
        }
    }, [loading_submit]);
    useEffect(() => {
        document.getElementById('verify_code').focus();
        return () => {
            dispatch({
                type: ResetPasswordActions.RESET_COMPONENT_RESET_PASSWORD,
            });
        };
    }, []);
    return (
        <WrapDialog>
            <div className="title">
                <FormattedMessage id="common.reset_password" />
            </div>
            {submitSuccess == false && (
                <div className="text-center text-danger">
                    <FormattedMessage id="common.confirm_code_not_right" />!
                </div>
            )}
            <form
                ref={formEl}
                onSubmit={handleSubmit((e) => {
                    onSubmitForm(e);
                })}>
                {/* <Field name="captcharesponse" component={Captcha} /> */}
                <div className=" d-flex flex-wrap ">
                    <div className="col-12 py-2 text-center">
                        Mã xác nhận đã được gửi đến <b>{data.from}</b>
                        {/* <span>
                            <FormattedMessage id="common.account_name" />:
                        </span>
                        <span className="pl-4 font-weight-bold">
                            {user.display_name}
                        </span> */}
                    </div>
                </div>
                <div className=" d-flex flex-wrap ">
                    <div className="col-12 py-2">
                        <FormattedMessage id="common.confirm_code" />
                        <Notnull />
                    </div>
                    <div className="col-12 ">
                        <div className="d-flex flex-row">
                            <div className="flex-fill">
                                <Field
                                    name="verify_code"
                                    type="text"
                                    component={RenderInput}
                                    placeholder="Nhập mã xác nhận"
                                    validate={[
                                        Validator.required,
                                        Validator.maxLength50,
                                    ]}
                                    maxLength={50}
                                />
                            </div>
                            {/* <div className="pl-1">
                                <ButtonPrimary
                                    disabled={time > 0}
                                    className="h-100"
                                    title={
                                        'Gửi lại' +
                                        (time != 0 ? ` ( ${time} )` : '')
                                    }
                                    onClick={onResendCode}
                                />
                            </div> */}
                        </div>
                    </div>
                </div>
                <div className=" d-flex flex-wrap">
                    <div className="col-12 py-2">
                        <FormattedMessage id="common.new_password" />
                        <Notnull />
                    </div>
                    <div className="col-12 ">
                        <Field
                            name="password"
                            type="password"
                            component={RenderInput}
                            placeholder="Nhập lại mật khẩu"
                            validate={[
                                Validator.required,
                                Validator.maxLength20,
                                Validator.passwordCheck,
                            ]}
                            maxLength={20}
                        />
                    </div>
                </div>
                <div className=" d-flex flex-wrap pb-4">
                    <div className="col-12 py-2">
                        <FormattedMessage id="common.confirm_password_again" />
                        <Notnull />
                    </div>
                    <div className="col-12 ">
                        <Field
                            name="confirm_password"
                            type="password"
                            component={RenderInput}
                            placeholder="Xác nhận lại mật khẩu"
                            validate={[
                                Validator.required,
                                Validator.maxLength20,
                                Validator.confirmPassword,
                            ]}
                            maxLength={20}
                        />
                    </div>
                </div>
                <div className="form-group col-12 ">
                    <ButtonPrimary
                        className="w-100"
                        title="Xác nhận"
                        onClick={() =>
                            formEl.current.dispatchEvent(new Event('submit'))
                        }
                    />
                </div>
                {time != 0 ? (
                    <div className="text-center">
                        Vui lòng chờ <b>{time}</b> để gửi lại
                    </div>
                ) : (
                    <div className="text-center">
                        <div>Bạn không nhận được mã?</div>
                        <div>
                            <a
                                onClick={onResendCode}
                                href="#"
                                className="color-primary">
                                Gửi lại
                            </a>
                        </div>
                    </div>
                )}
            </form>
            <div className=" d-center pt-4">
                <span>
                    <FormattedMessage id="common.do_you_remember_password" /> ?{' '}
                </span>
                <span
                    className="link-hover px-1 color-primary"
                    onClick={() =>
                        router.push(PageList.SIGNIN.SERVER).then(() =>
                            window.scroll({
                                top: 0,
                                left: 0,
                            }),
                        )
                    }>
                    <FormattedMessage id="common.sign_in" />
                </span>
            </div>
        </WrapDialog>
    );
}

WrapResetPassword = reduxForm({
    form: 'WrapResetPassword',
    onSubmitFail: (errors) => {
        // focus first err
        document.getElementById(Object.keys(errors)[0]).focus();
    },
})(WrapResetPassword);

WrapResetPassword.propTypes = {
    status: PropTypes.number,
    error: PropTypes.object,
};
WrapResetPassword.defaultProps = {
    status: 200,
    error: {},
};
export default WrapResetPassword;
