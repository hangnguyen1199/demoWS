import RenderInput from '@spo/components/redux-form/common/sign-up/render-input';
import * as Validator from '@spo/lib/validator';
import { useRouter } from 'next/router';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import AuthActions from '../../../../redux/auth/action';
import AppConfig from '../../../config/AppConfig';
import { POPUP_WARNING_TYPE } from '../../../utils/EventRegister';
import Utils from '../../../utils/utils';
import ButtonRipple from './../../../components/common/button-ripple';

/**
 * ****************************************************************************
 * DUNGNT ForgotPassowrdStep1 CODE
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
function ForgotPassowrdStep1(props) {
    const {
        handleSubmit,
        pristine,
        submitting,
        invalid,
        setCurrentStep,
        setEmail,
    } = props;
    const router = useRouter();
    const dispatch = useDispatch();
    //----------------------------------------------
    // Effect
    //----------------------------------------------

    const onSubmit = (data) => {
        let newData = {
            Email: data.Email,
            LatOfMap: Utils.getLocation()[0],
            LongOfMap: Utils.getLocation()[1],
            Browser: AppConfig.BROWER,
        };
        dispatch({
            type: AuthActions.FORGOT_PASSWORD,
            data: newData,
            success: () => {
                setCurrentStep(2);
                setEmail(data.Email);
            },
            error: () => {
                Utils.alertPopup(
                    'Mã OTP bạn yêu cầu trước đó vẫn còn hiệu lực, Xin vui lòng kiểm tra lại',
                    POPUP_WARNING_TYPE,
                    () => {
                        setCurrentStep(2);
                        setEmail(data.Email);
                    }
                );
            },
        });
    };
    return (
        <div className="forgot-passowrd-step1">
            <div className="d-center" style={{ paddingBottom: 20 }}>
                <span
                    style={{ fontSize: 20, color: '#333333', fontWeight: 500 }}>
                    Quên mã PIN
                </span>
            </div>
            <div className="d-center" style={{ paddingBottom: 60 }}>
                <span
                    style={{ fontSize: 16, color: '#333333', fontWeight: 400 }}>
                    Vui lòng nhập địa chỉ email để lấy lại mã PIN
                </span>
            </div>
            <div className=" d-center flex-wrap ">
                <div className="" style={{ width: '100%', paddingBottom: 60 }}>
                    <Field
                        name="Email"
                        type="text"
                        component={RenderInput}
                        placeholder="Nhập địa chỉ email"
                        validate={[
                            Validator.required,
                            Validator.maxLength100,
                            Validator.email,
                        ]}
                        maxLength={100}
                        showIcon={false}
                        image="/images/footer/email.svg"
                    />
                </div>
                <div className="" style={{ width: '100%', paddingBottom: 283 }}>
                    <div style={{ width: '100%', height: 39 }}>
                        <ButtonRipple
                            className="w-100 btn-main"
                            title="Gửi"
                            disabled={pristine || submitting || invalid}
                            onClick={handleSubmit(onSubmit)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

ForgotPassowrdStep1 = reduxForm({
    form: 'ForgotPassowrdStep1',
    onSubmitFail: (errors) => {},
})(ForgotPassowrdStep1);
export default ForgotPassowrdStep1;
