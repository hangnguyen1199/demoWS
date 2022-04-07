import { Field, reduxForm, formValueSelector } from 'redux-form';
import * as Validator from '@spo/lib/validator';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector, connect } from 'react-redux';
import MasterActions from '@spo/redux/master/action';
import OrderActions from '@spo/redux/order/action';

import PropTypes from 'prop-types';
import RenderInput from '@spo/components/redux-form/order/render-input';
import RenderSelect from '@spo/components/redux-form/recruitment/render-select';
import ButtonDark from '@spo/components/common/button-dark';
import ModalComponent from './ModalComponent';
import RenderMatSelect from './../../redux-form/common/render-mat-select';
import RenderMatInput from './../../redux-form/common/render-mat-input';
import ButtonMain from '../../common/button-main';

AddNewAddressModal.propTypes = {};

function AddNewAddressModal(props) {
    const dispatch = useDispatch();

    const lbl_contact_name = 'Thông tin liên hệ';
    const lbl_first_name = 'Họ & Tên Đệm';
    const lbl_input_first_name = 'Nhập Họ & Tên Đệm';
    const lbl_last_name = 'Tên';
    const lbl_input_last_name = 'Nhập Tên';
    const lbl_phone = 'Số điện thoại';
    const lbl_input_phone = 'Nhập số điện thoại';
    const lbl_address_name = 'Địa chỉ nhận hàng';
    const lbl_city = 'Tỉnh/Thành phố';
    const lbl_input_city = 'Chọn Tỉnh/Thành phố';
    const lbl_district = 'Quận/Huyện';
    const lbl_input_district = 'Chọn Quận/Huyện';
    const lbl_ward = 'Phường/Xã';
    const lbl_input_ward = 'Chọn Phường/Xã';
    const lbl_address_detail = 'Địa chỉ cụ thể';
    const lbl_input_address_detail =
        'Số nhà, tên tòa nhà, tên đường, tên khu vực';
    const lbl_btn_confirm = 'Xác nhận';

    const { handleSubmit, ProvinceId, CommuneId, DistrictId } = props;
    // const [Provinces, setProvinces] = useState([]);
    const [Districts, setDistricts] = useState([]);
    const [Communes, setCommunes] = useState([]);
    // const [ProvinceId, setProvinceId] = useState(null);
    // const [DistrictId, setDistrictId] = useState(null);
    // const [CommuneId, setCommuneId] = useState(null);
    const {
        data: { Genders, Provinces },
    } = useSelector((state) => state.Master);
    const onSubmit = (data) => {
        dispatch({
            type: OrderActions.SAVE_USER_ADDRESS,
            address: {
                Firstname: data.FirstNameId ?? '',
                Lastname: data.LastNameId ?? '',
                Phone: data.PhoneId ?? '',
                Address: data.AddressId ?? '',
                CommuneId: CommuneId ?? '',
                DistrictId: DistrictId ?? '',
                ProvinceId: ProvinceId ?? '',
                IsDefault: false,
                Type: 3,
            },
            callback: {
                success: () => {
                    props.hide();
                },
            },
        });
    };

    // const changeProvince = (val) => {
    //     setProvinceId(val);
    // };

    // const changeDistrict = (val) => {
    //     setDistrictId(val);
    // };

    // useEffect(() => {
    //     dispatch({
    //         type: MasterActions.GET_PROVINCE_MASTER,
    //         success: (res) => {
    //             setProvinces(res);
    //             if (res.findIndex((x) => x.Id == ProvinceId) == -1) {
    //                 setProvinceId(null);
    //             }
    //         },
    //     });
    // }, []);

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

    const _renderComponentChildren = () => {
        return (
            <>
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <span className="title-address-modal">
                                {lbl_contact_name}
                            </span>
                            <hr
                                className="cross-line"
                                style={{ marginTop: '20px' }}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 col-sm-12">
                            <div
                                className="input-order-wrap"
                                style={{ marginTop: '20px' }}>
                                <Field
                                    id="FirstNameId"
                                    label={lbl_first_name}
                                    placeholder={lbl_input_first_name}
                                    name="FirstNameId"
                                    component={RenderMatInput}
                                    type="text"
                                    className="input-order-style"
                                    validate={[
                                        Validator.required,
                                        Validator.maxLength50,
                                    ]}
                                />
                            </div>
                        </div>

                        <div className="col-md-6 col-sm-12">
                            <div className="input-order-wrap mg-t-b-20">
                                <Field
                                    id="LastNameId"
                                    label={lbl_last_name}
                                    placeholder={lbl_input_last_name}
                                    name="LastNameId"
                                    component={RenderMatInput}
                                    type="text"
                                    className="input-order-style"
                                    validate={[
                                        Validator.required,
                                        Validator.maxLength50,
                                    ]}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div className="input-order-wrap">
                                <Field
                                    id="PhoneId"
                                    label={lbl_phone}
                                    placeholder={lbl_input_phone}
                                    name="PhoneId"
                                    component={RenderMatInput}
                                    type="text"
                                    className="input-order-style"
                                    validate={[
                                        Validator.required,
                                        Validator.maxLength10,
                                        Validator.phone,
                                    ]}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <hr className="cross-line  mg-t-b-20" />
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <span className="title-address-modal">
                                {lbl_address_name}
                            </span>
                            <hr
                                className="cross-line"
                                style={{ marginTop: '20px' }}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4 col-sm-12">
                            <div
                                // className="input-order-wrap"
                                style={{ marginTop: '20px' }}>
                                {/* <Field
                                    id="CityId"
                                    label={lbl_city}
                                    placeholder={lbl_input_city}
                                    name="CityId"
                                    component={RenderSelect}
                                    type="text"
                                    className="input-order-style"
                                    masterData={Provinces}
                                    fieldValue="Id"
                                    input={{
                                        onChange: changeProvince,
                                    }}
                                /> */}
                                <Field
                                    name="ProvinceId"
                                    type="text"
                                    component={RenderMatSelect}
                                    label={lbl_city}
                                    placeholder={lbl_input_city}
                                    validate={[Validator.required]}
                                    maxLength={50}
                                    masterData={Provinces}
                                    field={['Name', 'Id']}
                                />
                            </div>
                        </div>
                        <div className="col-md-4 col-sm-12">
                            <div
                                // className="input-order-wrap"
                                style={{ marginTop: '20px' }}>
                                {/* <Field
                                    id="DistrictId"
                                    label={lbl_district}
                                    placeholder={lbl_input_district}
                                    name="DistrictId"
                                    component={RenderSelect}
                                    type="text"
                                    className="input-order-style"
                                    masterData={Districts}
                                    fieldValue="Id"
                                    input={{
                                        onChange: changeDistrict,
                                    }}
                                /> */}
                                <Field
                                    name="DistrictId"
                                    type="text"
                                    component={RenderMatSelect}
                                    label={lbl_district}
                                    placeholder={lbl_input_district}
                                    validate={[Validator.required]}
                                    maxLength={50}
                                    masterData={Districts}
                                    field={['Name', 'Id']}
                                />
                            </div>
                        </div>
                        <div className="col-md-4 col-sm-12">
                            <div className=" mg-t-b-20">
                                {/* <Field
                                    id="WardId"
                                    label={lbl_ward}
                                    placeholder={lbl_input_ward}
                                    name="WardId"
                                    component={RenderSelect}
                                    type="text"
                                    className="input-order-style"
                                    validate={[Validator.required]}
                                    masterData={Communes}
                                    fieldValue="Id"
                                /> */}
                                <Field
                                    name="CommuneId"
                                    type="text"
                                    component={RenderMatSelect}
                                    label={lbl_ward}
                                    placeholder={lbl_input_ward}
                                    validate={[Validator.required]}
                                    maxLength={50}
                                    masterData={Communes}
                                    field={['Name', 'Id']}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div className="">
                                <Field
                                    id="AddressId"
                                    label={lbl_address_detail}
                                    placeholder={lbl_input_address_detail}
                                    name="AddressId"
                                    component={RenderMatInput}
                                    type="text"
                                    className="input-order-style"
                                />
                            </div>
                        </div>
                        <div className="col-12 d-center">
                            <ButtonMain
                                className="btn-size-small text-uppercase btn-addr-confirm"
                                title={lbl_btn_confirm}
                                onClick={handleSubmit(onSubmit)}
                                fontSize={14}
                            />
                        </div>
                    </div>
                </div>
            </>
        );
    };

    return (
        <>
            <ModalComponent
                open={props.open}
                hide={() => props.hide()}
                children={_renderComponentChildren()}
                className="new-addr-modal"
                title={props.title}></ModalComponent>
        </>
    );
}
AddNewAddressModal = reduxForm({
    form: 'AddNewAddressModal',
    enableReinitialize: true,
})(AddNewAddressModal);
const selector = formValueSelector('AddNewAddressModal');
AddNewAddressModal = connect((state) => {
    const ProvinceId = selector(state, 'ProvinceId');
    const DistrictId = selector(state, 'DistrictId');
    const CommuneId = selector(state, 'CommuneId');
    return {
        // initialValues: {
        //     FirstName: state.Auth.data.UserProfile?.FirstName,
        //     Phone: state.Auth.data.UserProfile?.Phone,
        //     LastName: state.Auth.data.UserProfile?.LastName,
        //     Username: state.Auth.data.UserProfile?.Username,
        //     Email: state.Auth.data.UserProfile?.Email,
        //     Gender: state.Auth.data.UserProfile?.Gender,
        //     Birthday: state.Auth.data.UserProfile?.Birthday
        //         ? format(
        //               new Date(state.Auth.data.UserProfile?.Birthday),
        //               'yyyy-MM-dd',
        //           )
        //         : null,
        //     ProvinceId: state.Auth.data.UserProfile?.Address?.ProvinceId,
        //     CommuneId: state.Auth.data.UserProfile?.Address?.CommuneId,
        //     DistrictId: state.Auth.data.UserProfile?.Address?.DistrictId,
        //     Address: state.Auth.data.UserProfile?.Address?.Address,
        // },
        ProvinceId: ProvinceId,
        CommuneId: CommuneId,
        DistrictId: DistrictId,
    };
})(AddNewAddressModal);
export default AddNewAddressModal;
