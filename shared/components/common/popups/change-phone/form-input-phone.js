import RenderInput from '@spo/components/redux-form/common/sign-up/render-input';
import * as Validator from '@spo/lib/validator';
import SignUpActions from '@spo/redux/sign-up/action';
import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import Utils from '../../../../utils/utils';
import AppConfig from '../../../../config/AppConfig';
import ButtonRipple from '../../button-ripple';
import AuthActions from '../../../../../redux/auth/action';
import { GetMsg } from '../../../../config/Message';
import { POPUP_SUCCESS_TYPE, SECOND_POPUP } from '../../../../utils/EventRegister';
import { findDOMNode } from 'react-dom';


function FormInputPhone (props) {
    const {
        handleSubmit,
        pristine,
        submitting,
        invalid,
        setCurrentStep,
        setPhone,
    } = props;
    const dispatch = useDispatch();
    const elRef = useRef(null)
    useEffect(() => {
        findDOMNode(elRef.current).getElementsByTagName("input")[0].focus()
    }, [])
    const onSubmit = (data) => {
        dispatch({
            type: AuthActions.SEND_OTP_PHONE,
            data: data,
            success: () => {
                handleSuccess(data)
            },
            error: err => {
                // handleSuccess(data)
                console.log(err);
                if (err) {
                    if (err == 'E055' || err == 'E046') {
                        let msg = GetMsg(err);
                        Utils.alertPopup(msg, null, null, SECOND_POPUP);
                    } else if (err == 'E045') {
                        Utils.alertPopup('Bạn vừa yêu cầu mã OTP vài phút trước. Vui lòng đợi vài phút & thử lại', null, null, SECOND_POPUP);
                        handleSuccess(data)
                    } else {
                        Utils.showToast({
                            message: Utils.getMessageError(err),
                        });
                        handleSuccess(data)
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
        setPhone(data?.Phone)
    };

    return (
        <div className="d-flex flex-wrap">
            <div
                className="w-100"
                style={{ paddingBottom: 45, paddingTop: 60 }}>
                <Field
                    ref={elRef}
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

            <div className="" style={{ width: '100%', height: 39 }}>
                <ButtonRipple
                    className="w-100 btn-main"
                    title="Tiếp tục"
                    onClick={handleSubmit(onSubmit)}
                />
            </div>
        </div>
    );
}
FormInputPhone = reduxForm({
    form: 'FormInputPhone',
    onSubmitFail: (errors) => { },
})(FormInputPhone);
export default FormInputPhone;
