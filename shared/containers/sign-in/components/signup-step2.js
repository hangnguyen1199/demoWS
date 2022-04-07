import SelectBox from '@spo/components/redux-form/common/render-select-custom.js';
import RenderInput from '@spo/components/redux-form/common/sign-up/render-input';
import * as Validator from '@spo/lib/validator';
import SignUpActions from '@spo/redux/sign-up/action';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import ButtonMain from '../../../components/common/button-main';
import AsyncValidate from '../../../utils/AsyncValidate';
import ButtonRipple from './../../../components/common/button-ripple';
import Utils from './../../../utils/utils';

function SignupStep2(props) {
    const { handleSubmit, pristine, submitting, invalid } = props;
    const dispatch = useDispatch();
    const onSubmit = (data) => {
        if (pristine || submitting || invalid) {
            document.getElementById("Lastname").focus();
            return;
        }
        try {
            let newDataSubmit = {
                FirstName: data.Firstname,
                LastName : data.Lastname,
                Username : data.Username,
                Email    : data.Email,
                Gender   : data.Gender,
                Password : Utils.MD5(data.Password),
                From     : 7 //web
            };
            dispatch({
                type   : SignUpActions.SIGN_UP_STEP_TWO,
                data   : newDataSubmit,
                success: handleSuccess,
                error  : handleError,
            });
        } catch (error) {
            console.log(error);
        }
    };
    const handleSuccess = () => {};
    const handleError = () => {};
    return (
        <div>
            <div className="" style={{ paddingBottom: 45, paddingTop: 60 }}>
                <Field
                    name="Lastname"
                    type="text"
                    component={RenderInput}
                    placeholder="Họ & Tên Đệm"
                    validate={[
                        Validator.required,
                        Validator.maxLength30,
                        Validator.lastname,
                    ]}
                    image="/images/sign-up/first_and_middle_name.svg"
                    maxLength={30}
                />
            </div>
            <div className="" style={{ paddingBottom: 45 }}>
                <Field
                    name="Firstname"
                    type="text"
                    component={RenderInput}
                    placeholder="Tên"
                    validate={[
                        Validator.required,
                        Validator.maxLength10,
                        Validator.firstname,
                    ]}
                    image="/images/sign-up/last_name.svg"
                    maxLength={10}
                />
            </div>
            <div className="" style={{ paddingBottom: 45 }}>
                <Field
                    name="Username"
                    type="text"
                    component={RenderInput}
                    placeholder="Nhập tên đăng nhập"
                    validate={[
                        Validator.required,
                        Validator.maxLength16,
                        Validator.minLength8,
                        Validator.blackListString,
                        Validator.notOnlyNumber,
                        Validator.usernameCheck,
                    ]}
                    image="/images/sign-up/user_name.svg"
                    maxLength={16}
                />
            </div>
            <div className="" style={{ paddingBottom: 45 }}>
                <Field
                    name="Gender"
                    readonly={false}
                    showSearch={false}
                    data={[
                        { label: 'Nam', value: 'M' },
                        { label: 'Nữ', value: 'F' },
                        { label: 'Không công khai', value: 'O' },
                    ]}
                    placeholder="Chọn giới tính"
                    component={SelectBox}
                    image="/images/sign-up/gender.svg"></Field>
            </div>
            <div className="" style={{ paddingBottom: 45 }}>
                <Field
                    name="Email"
                    type="text"
                    component={RenderInput}
                    placeholder="Nhập email"
                    validate={[
                        Validator.required,
                        Validator.maxLength50,
                        Validator.email,
                    ]}
                    image="/images/sign-up/email.svg"
                    maxLength={50}
                />
            </div>
            <div className="" style={{ paddingBottom: 45 }}>
                <Field
                    autoComplete={false}
                    name="Password"
                    type="password"
                    component={RenderInput}
                    placeholder="Nhập mã PIN"
                    isShowPassIcon={true}
                    validate={[
                        Validator.required,
                        Validator.checkPIN,
                        Validator.checkPinSpecial,
                    ]}
                    image="/images/sign-up/pin.svg"
                    maxLength={6}
                />
            </div>
            <div className="" style={{ paddingBottom: 60 }}>
                <Field
                    name="ConfirmPassword"
                    type="password"
                    component={RenderInput}
                    placeholder="Nhập lại mã PIN"
                    isShowPassIcon={true}
                    validate={[
                        Validator.required,
                        Validator.checkPIN,
                        Validator.confirmPassword,
                    ]}
                    image="/images/sign-up/repeat_pin.svg"
                    maxLength={6}
                />
            </div>
            <div className="" style={{ height: 39 }}>
                <ButtonMain
                    className="w-100 btn-main"
                    title="Đăng ký"
                    //disabled={pristine || submitting || invalid}
                    onClick={handleSubmit(onSubmit)}
                />
            </div>
            <div className=" d-center" style={{paddingTop: 30, fontSize: '16px'}}>
                <span tabIndex="0" className="text-center">
                    Thông qua việc{' '}
                    <span className="policy-signin-text" style={{ fontWeight: '500'}}>Đăng ký </span> 
                    tài khoản 
                    <span style={{ color: '#FF2C00', fontWeight: '500'}}> FM Plus</span>, bạn xác
                    nhận đã đọc & đồng ý với các
                    <span className="policy-terms-text">
                        {' '}
                        Điều Khoản Sử Dụng
                    </span>{' '}
                    cùng{' '}
                    <span className="policy-terms-text">
                        {' '}
                        Chính Sách Bảo Mật & Chia Sẻ Thông Tin
                    </span>{' '}
                    của <span style={{ color: '#FF2C00', fontWeight: '500'}}>FM Plus</span>.
                </span>
            </div>
        </div>
    );
}
SignupStep2 = reduxForm({
    form        : 'SignupStep2',
    enableReinitialize: true,
    asyncValidate: AsyncValidate,
    asyncBlurFields: ['Username', 'Email'],
    onSubmitFail: (errors) => {},
})(SignupStep2);
export default SignupStep2;
