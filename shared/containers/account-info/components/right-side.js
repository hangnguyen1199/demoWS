import * as Validator from '@spo/lib/validator';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import React, { useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Field, formValueSelector, reduxForm } from 'redux-form';
import AuthActions from '../../../../redux/auth/action';
import MasterActions from '../../../../redux/master/action';
import ButtonMain from '../../../components/common/button-main';
import RenderMatDate from '../../../components/redux-form/common/render-mat-date';
import RenderMatInput from '../../../components/redux-form/common/render-mat-input';
import RenderMatSelect from '../../../components/redux-form/common/render-mat-select';
import { GetMsg } from '../../../config/Message';
import { scrollToFirstError } from '../../../library/helper';
import AsyncValidate from '../../../utils/AsyncValidate';
import EventRegister, {
    CHANGE_MAIL_POPUP,
    CHANGE_PHONE_POPUP,
    EVENT_SHOW_POPUP, POPUP_WARNING_TYPE
} from '../../../utils/EventRegister';
// import ButtonRipple from './../../../components/common/button-ripple';
import Utils from './../../../utils/utils';

function RightSide (props) {
    const dispatch = useDispatch();
    const { handleSubmit, ProvinceId, CommuneId, DistrictId } = props;
    const {
        data: { UserProfile },
    } = useSelector((state) => state.Auth);
    const {
        data: { Genders, Provinces },
    } = useSelector((state) => state.Master);
    const [Districts, setDistricts] = useState([]);
    const [Communes, setCommunes] = useState([]);
    const onSubmit = (e) => {
        Utils.confirmPopup('Xác nhận cập nhật thông tin cá nhân ?', (type) => {
            if (type) {
                let data = {
                    Username: e.Username,
                    FirstName: e.FirstName,
                    LastName: e.LastName,
                    Gender: e.Gender,
                    Birthday: format(new Date(Date.parse(
                        parse(e.Birthday, 'dd-MM-yyyy', new Date()),
                    )), "yyyy-MM-dd"),
                    Address: e.Address,
                    CommuneId: e.CommuneId,
                    IsShowFullName: true,
                };
                dispatch({
                    type: AuthActions.UPDATE_USER_PROFILE,
                    data: data,
                    success: (res) => {
                        if (res.Code == 200) {
                            Utils.alertPopup('Đã lưu thành công');
                            dispatch({ type: AuthActions.GET_USER });
                        } else if (res.Code == 202) {
                            Utils.alertPopup(
                                GetMsg(res.MsgNo),
                                POPUP_WARNING_TYPE,
                            );
                        }
                    },
                });
            }
        });
    };
    useEffect(() => {
        if (ProvinceId) {
            dispatch({
                type: MasterActions.GET_DISTRICT_MASTER,
                data: { ProvinceId: ProvinceId },
                success: (res) => {
                    setDistricts(res);
                    if (res.findIndex((x) => x.Id == DistrictId) == -1) {
                        props.change('DistrictId', null);
                        props.change('CommuneId', null);
                    }
                },
            });
        }
    }, [ProvinceId]);
    useEffect(() => {
        if (DistrictId) {
            dispatch({
                type: MasterActions.GET_COMMUNE_MASTER,
                data: { DistrictId: DistrictId },
                success: (res) => {
                    setCommunes(res);
                    if (res.findIndex((x) => x.Id == CommuneId) == -1) {
                        props.change('CommuneId', null);
                    }
                },
            });
        }
    }, [DistrictId]);
    const handleChangePhone = () => {
        EventRegister.emit(EVENT_SHOW_POPUP, {
            type: CHANGE_PHONE_POPUP,
            open: true,
            payload: {
                title: "Cập nhật số điện thoại",
                className: "_wrap_change_phone_popup"
            },
        });
    }
    const handleChangeMail = () => {
        EventRegister.emit(EVENT_SHOW_POPUP, {
            type: CHANGE_MAIL_POPUP,
            open: true,
            payload: {
                title: "Cập nhật Email",
                className: "_wrap_change_phone_popup"
            },
        });
    }
    return (
        <div className="right-side account-info-detail">
            <div className="_card">
                <div className="_wrap_title">
                    <div className="_title">Thông tin cá nhân</div>
                </div>
                <div className="_content">
                    <div className="col-12 col-lg-6 _col">
                        <Field
                            name="LastName"
                            type="text"
                            component={RenderMatInput}
                            label="Họ & Tên Đệm"
                            placeholder="Nhập họ & tên đệm"
                            validate={[
                                Validator.required,
                                Validator.maxLength30,
                                Validator.lastname,
                            ]}
                            maxLength={30}
                        />
                    </div>
                    <div className="col-12 col-lg-6 _col">
                        <Field
                            name="FirstName"
                            type="text"
                            component={RenderMatInput}
                            label="Tên"
                            placeholder="Nhập tên"
                            validate={[
                                Validator.required,
                                Validator.maxLength10,
                                Validator.firstname,
                            ]}
                            maxLength={10}
                        />
                    </div>
                    <div className="col-12 col-lg-6 _col">
                        <Field
                            name="Username"
                            type="text"
                            component={RenderMatInput}
                            label="Tên đăng nhập"
                            placeholder="Nhập tên đăng nhập"
                            validate={[
                                Validator.required,
                                Validator.maxLength16,
                                Validator.minLength8,
                                // Validator.blackListString,
                                Validator.notOnlyNumber,
                                Validator.usernameCheck,
                            ]}
                            maxLength={16}
                        />
                    </div>
                    <div className="col-12 col-lg-6 _col">
                        <Field
                            name="Birthday"
                            type="text"
                            component={RenderMatDate}
                            label="Ngày sinh"
                            placeholder="Chọn ngày sinh"
                            validate={[
                                Validator.required,
                                Validator.maxLength50,
                            ]}
                            maxLength={50}
                            maxDate={new Date()}
                        />
                    </div>
                    <div className="col-12 col-lg-6 _col">
                        <Field
                            name="Gender"
                            type="text"
                            component={RenderMatSelect}
                            label="Giới tính"
                            placeholder="Chọn giới tính"
                            validate={[Validator.required]}
                            masterData={Genders}
                        />
                    </div>
                    <div className="col-12 col-lg-6 _col">
                        <Field
                            name="PhoneUser"
                            type="text"
                            component={RenderMatInput}
                            label="Số điện thoại"
                            placeholder="Nhập số điện thoại"
                            validate={[Validator.phone]}
                            maxLength={10}
                            // readonly={true}
                            onClick={handleChangePhone}
                        />
                    </div>
                    <div className="col-12 _col">
                        <Field
                            name="EmailUser"
                            type="text"
                            component={RenderMatInput}
                            label="Email"
                            placeholder="Nhập mail"
                            validate={[
                                // Validator.required,
                                // Validator.maxLength50,
                                // Validator.email,
                            ]}
                            maxLength={50}
                            onClick={handleChangeMail}
                        />
                    </div>
                </div>
            </div>
            <div className="_card mt30">
                <div className="_wrap_title">
                    <div className="_title">Thông tin địa chỉ</div>
                </div>
                <div className="_content">
                    <div className="col-12 col-lg-4 _col">
                        <Field
                            name="ProvinceId"
                            type="text"
                            component={RenderMatSelect}
                            label="Tỉnh/Thành phố"
                            placeholder="Nhập Tỉnh/Thành phố"
                            validate={[Validator.required]}
                            maxLength={50}
                            masterData={Provinces}
                            field={['Name', 'Id']}
                        />
                    </div>
                    <div className="col-12 col-lg-4 _col">
                        <Field
                            name="DistrictId"
                            type="text"
                            component={RenderMatSelect}
                            label="Quận/Huyện"
                            placeholder="Nhập Quận/Huyện"
                            validate={[Validator.required]}
                            maxLength={50}
                            masterData={Districts}
                            field={['Name', 'Id']}
                        />
                    </div>
                    <div className="col-12 col-lg-4 _col">
                        <Field
                            name="CommuneId"
                            type="text"
                            component={RenderMatSelect}
                            label="Phường/Xã"
                            placeholder="Nhập Phường/Xã"
                            validate={[Validator.required]}
                            maxLength={50}
                            masterData={Communes}
                            field={['Name', 'Id']}
                        />
                    </div>
                    <div className="col-12 _col">
                        <Field
                            name="Address"
                            type="text"
                            component={RenderMatInput}
                            label="Địa chỉ cụ thể"
                            placeholder="Số nhà, tên tòa nhà, tên đường, tên khu vực"
                            validate={[Validator.required]}
                            maxLength={50}
                        />
                    </div>
                </div>
            </div>
            {/* <div className="_card mt30">
                <div className="_wrap_title">
                    <div className="_title">Liên kết mạng xã hội</div>
                </div>
                <div className="_content">
                    <div className="wrap_social_item">
                        <div className="col">
                            <div className="container-raito">
                                <div className="raito">
                                    <div className="social_item">
                                        <IconFb fontSize={34} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="social_item">
                                <IconGooglePlus fontSize={34} />
                            </div>
                        </div>
                        <div className="col">
                            <div className="social_item">
                                <IconInstagram fontSize={34} />
                            </div>
                        </div>
                        <div className="col">
                            <div className="social_item">
                                <IconZing fontSize={34} />
                            </div>
                        </div>
                        <div className="col">
                            <div className="social_item">
                                <IconFb fontSize={34} />
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
            <div className="wrap_btn"
                style={{marginTop:30}}
            >
                <ButtonMain 
                    title="Lưu"
                    onClick={handleSubmit(onSubmit)}
                />
            </div>
        </div>
    );
}
RightSide = reduxForm({
    form: 'AccountRightSide',
    enableReinitialize: true,
    onSubmitFail: (errors) => {
        scrollToFirstError(errors);
    },
    asyncValidate: AsyncValidate,
})(RightSide);
const selector = formValueSelector('AccountRightSide');
RightSide = connect((state) => {
    const ProvinceId = selector(state, 'ProvinceId');
    const DistrictId = selector(state, 'DistrictId');
    const CommuneId = selector(state, 'CommuneId');
    return {
        initialValues: {
            FirstName: state.Auth.data.UserProfile?.FirstName,
            PhoneUser: state.Auth.data.UserProfile?.Phone,
            LastName: state.Auth.data.UserProfile?.LastName,
            Username: state.Auth.data.UserProfile?.Username,
            EmailUser: state.Auth.data.UserProfile?.Email,
            Gender: state.Auth.data.UserProfile?.Gender,
            Birthday: state.Auth.data.UserProfile?.Birthday
                ? format(
                    new Date(state.Auth.data.UserProfile?.Birthday),
                    'dd-MM-yyyy',
                )
                : null,
            ProvinceId: state.Auth.data.UserProfile?.Address?.ProvinceId,
            CommuneId: state.Auth.data.UserProfile?.Address?.CommuneId,
            DistrictId: state.Auth.data.UserProfile?.Address?.DistrictId,
            Address: state.Auth.data.UserProfile?.Address?.Address,
        },
        ProvinceId: ProvinceId,
        CommuneId: CommuneId,
        DistrictId: DistrictId,
    };
})(RightSide);
export default RightSide;
