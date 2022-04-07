import RenderInput from '@spo/components/redux-form/common/sign-up/render-input';
import * as Validator from '@spo/lib/validator';
import { useRouter } from 'next/router';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import AuthActions from '../../../../redux/auth/action';
import AppConfig from '../../../config/AppConfig';
import Utils from '../../../utils/utils';
import ButtonRipple from '../../../components/common/button-ripple';
import ButtonMain from '../../../components/common/button-main';

/**
 * ****************************************************************************
 * DUNGNT ResetPassword CODE
 * forgot-passowrd-step1.js
 *
 * description		:
 * created at		:	2021-12-20
 * created by		:	DungNT
 * package			:	shared\containers\forgot-password\components\forgot-passowrd-step1.js
 * copyright			:	Copyright (c) DungNT
 * version			:	1.0.0
 * ****************************************************************************
 */
function ResetPassword(props) {
    const {
        handleSubmit,
        pristine,
        submitting,
        invalid,
        setCurrentStep,
        email,
        otp
    } = props;
    const router = useRouter();
    const dispatch = useDispatch();
    //----------------------------------------------
    // Effect
    //----------------------------------------------

    const onSubmit = (data) => {
        let newData = {
            Email: email,
            OTP: otp,
            Password: Utils.MD5(data.Password),
        };
        dispatch({
            type: AuthActions.UPDATE_PASSWORD,
            data: newData,
            success: () => {
                console.log("success")
            },
            error: () => {},
        });
    };
    return (
        <div className="forgot-passowrd-step1">
            <div className="d-center" style={{ paddingBottom: 20 }}>
                <span
                    style={{ fontSize: 20, color: '#333333', fontWeight: 500 }}>
                    Đặt lại mật khẩu
                </span>
            </div>
            <div className=" d-center flex-wrap ">
                <div className="w-100" style={{ paddingBottom: 45 }}>
                    <Field
                        autoComplete={false}
                        name="Password"
                        type="password"
                        component={RenderInput}
                        placeholder="Nhập mã PIN"
                        validate={[
                            Validator.required,
                            Validator.checkPIN,
                            Validator.checkPinSpecial,
                        ]}
                        image="/images/sign-up/pin.svg"
                        maxLength={20}
                    />
                </div>
                <div className="w-100" style={{ paddingBottom: 70 }}>
                    <Field
                        name="ConfirmPassword"
                        type="password"
                        component={RenderInput}
                        placeholder="Xác nhận lại mã PIN"
                        validate={[
                            Validator.required,
                            Validator.checkPIN,
                            Validator.confirmPassword,
                        ]}
                        image="/images/sign-up/repeat_pin.svg"
                        maxLength={20}
                    />
                </div>
                <div className="" style={{ width: '100%', paddingBottom: 283 }}>
                    <div style={{ width: '100%', height: 39 }}>
                        <ButtonMain
                            className="w-100 btn-main"
                            title="Cập nhật mật khẩu"
                            disabled={pristine || submitting || invalid}
                            onClick={handleSubmit(onSubmit)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

ResetPassword = reduxForm({
    form: 'ResetPassword',
    onSubmitFail: (errors) => {},
})(ResetPassword);
export default ResetPassword;
