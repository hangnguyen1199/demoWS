import RenderInput from '@spo/components/redux-form/common/sign-up/render-input';
import * as Validator from '@spo/lib/validator';
import React, { useEffect, useRef } from 'react';
import { findDOMNode } from 'react-dom';
import { useDispatch } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import AuthActions from '../../../../../redux/auth/action';
import { GetMsg } from '../../../../config/Message';
import { SECOND_POPUP } from '../../../../utils/EventRegister';
import Utils from '../../../../utils/utils';
import ButtonMain from '../../button-main';
import ButtonRipple from '../../button-ripple';


function FormInputEmail (props) {
    const {
        handleSubmit,
        pristine,
        submitting,
        invalid,
        setCurrentStep,
        setEmail,
    } = props;
    const dispatch = useDispatch();
    const elRef = useRef(null)
    useEffect(() => {
        findDOMNode(elRef.current).getElementsByTagName("input")[0].focus()
    }, [])
    const onSubmit = (data) => {
        dispatch({
            type: AuthActions.SEND_OTP_EMAIL,
            data: data,
            success: () => {
                handleSuccess(data)
            },
            error: err => {
                // handleSuccess(data)
                console.log(err);
                if (err) {
                    if (err == 'E045') {
                        Utils.alertPopup('Bạn vừa yêu cầu mã OTP vài phút trước. Vui lòng đợi vài phút & thử lại', null, null, SECOND_POPUP);
                        handleSuccess(data)
                    } else {
                        let msg = GetMsg(err);
                        Utils.alertPopup(msg, null, null, SECOND_POPUP)
                    }
                } else {
                    Utils.alertPopup("Lỗi hệ thống", null, null, SECOND_POPUP);
                    handleSuccess(data)
                }
            },
        });

    };
    const handleSuccess = (data) => {
        setCurrentStep(2);
        setEmail(data?.Email)
    };

    return (
        <div className="d-flex flex-wrap">
            <div
                className="w-100"
                style={{ paddingBottom: 45, paddingTop: 60 }}>
                <Field
                    ref={elRef}
                    name="Email"
                    type="text"
                    component={RenderInput}
                    placeholder="Nhập email"
                    validate={[
                        Validator.required,
                        Validator.maxLength100,
                        Validator.email,
                    ]}
                    maxLength={100}
                    showIcon={false}
                    image="/images/sign-up/phone-area.png"
                />
            </div>

            <div className="" style={{ width: '100%', height: 39 }}>
                <ButtonMain
                    className="w-100 btn-main"
                    title="Tiếp tục"
                    onClick={handleSubmit(onSubmit)}
                />
            </div>
        </div>
    );
}
FormInputEmail = reduxForm({
    form: 'FormInputEmail',
    onSubmitFail: (errors) => { },
})(FormInputEmail);
export default FormInputEmail;
