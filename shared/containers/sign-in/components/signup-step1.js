import RenderInput from '@spo/components/redux-form/common/sign-up/render-input';
import * as Validator from '@spo/lib/validator';
import SignUpActions from '@spo/redux/sign-up/action';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import SignInSocial from '../../../components/common/sign-in-social';
import RenderCaptcha from '../../../components/redux-form/common/render-captcha';
import ButtonRipple from './../../../components/common/button-ripple';
import AppConfig from './../../../config/AppConfig';
import Utils from './../../../utils/utils';
import SignInActions from '@spo/redux/sign-in/action';
import ButtonMain from '../../../components/common/button-main';

function SignupStep1 (props) {
    const {
        handleSubmit,
        pristine,
        submitting,
        invalid,
        setCurrentStep,
        setPhone,
    } = props;
    const dispatch = useDispatch();

    const onSubmit = (data) => {
        if (pristine || submitting || invalid) {
            document.getElementById("Phone").focus();
            return;
        }
        let newDataSubmit = {
            Phone: data.Phone,
            InviteCode: data.InviteCode,
            LatOfMap: Utils.getLocation()[0],
            LongOfMap: Utils.getLocation()[1],
            Browser: AppConfig.BROWER,
            CaptchaToken: data.CaptchaToken,
        };
        setPhone(data.Phone);
        dispatch({
            type: SignUpActions.SIGN_UP_STEP_ONE,
            data: newDataSubmit,
            success: handleSuccess,
            error: handleError,
        });
    };
    const handleSuccess = () => {
        setCurrentStep(2);
    };
    const handleError = (Msg) => {
        props.change('CaptchaToken', '');
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
        <div className="d-flex flex-wrap ">
            <div
                className="input-field-width"
                style={{ paddingBottom: 45, paddingTop: 60 }}>
                <Field
                    name="Phone"
                    type="text"
                    component={RenderInput}
                    placeholder="Nhập số điện thoại"
                    validate={[
                        Validator.required,
                        Validator.maxLength10,
                        Validator.phone,
                    ]}
                    maxLength={10}
                    showIcon={false}
                    image="/images/sign-up/phone-area.png"
                />
            </div>
            <div className="input-field-width" style={{ paddingBottom: 30 }}>
                <Field
                    name="InviteCode"
                    type="text"
                    component={RenderInput}
                    placeholder="Nhập mã giới thiệu (Không bắt buộc)"
                    validate={[Validator.maxLength100]}
                    maxLength={100}
                />
            </div>
            <div style={{ paddingBottom: 60, width: '100%' }}>
                <Field
                    name="CaptchaToken"
                    component={RenderCaptcha}
                    validate={[Validator.required]}
                />
            </div>

            <div className="" style={{ width: '100%', height: 39, marginBottom:30 }}>
                <ButtonMain
                    className="w-100 btn-main"
                    title="Tiếp tục"
                    //disabled={pristine || submitting || invalid}
                    onClick={handleSubmit(onSubmit)}
                />
            </div>
            <SignInSocial
                responseFacebook={responseFacebook}
                responseGoogle={responseGoogle}
                textFacebook="Đăng ký bằng Facebook"
                textGoogle="Đăng ký bằng Google"
            />
        </div>
    );
}
SignupStep1 = reduxForm({
    form: 'SignupStep1',
    onSubmitFail: (errors) => { },
})(SignupStep1);
export default SignupStep1;
