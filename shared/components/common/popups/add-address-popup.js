// import IconSuccess from '@spo/icons/icon-success';
import * as Validator from '@spo/lib/validator';
import MasterActions from '@spo/redux/master/action';
import OrderActions from '@spo/redux/order/action';
import React, { useEffect, useRef, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Field, formValueSelector, reduxForm } from 'redux-form';
import RenderMatInput from './../../redux-form/common/render-mat-input';
import RenderMatSelect from './../../redux-form/common/render-mat-select';
import ButtonDark from './../button-dark';
import ClosePopupBtn from './close-popup-btn';
import CustomFrame from './../custom-frame';
import RenderTextRadio from '../../redux-form/common/render-text-radio';
import constants from '@spo/config/constants';
import UseWindowSize from '@spo/lib/use-window-size';
import ResizePopup from './resize-popup';
import ButtonRipple from './../button-ripple';
import ButtonMain from '../button-main';

function AddAddressPopup (props) {
    const { payload, showVisible } = props;
    const dataAddress=payload?.data;

    const handleClick = () => {
        if (typeof payload.callback == 'function') {
            payload.callback();
        }
        showVisible(false);
    };

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
    const lbl_address_type = 'Loại địa chỉ';

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
        let value={};

        if(dataAddress?.UserAddressId){
            value['UserAddressId']=dataAddress?.UserAddressId?.toString()
        }
        value={
            Firstname: data.FirstNameId ?? '',
            Lastname: data.LastNameId ?? '',
            Phone: data.PhoneId ?? '',
            Address: data.AddressId ?? '',
            CommuneId: CommuneId ?? '',
            DistrictId: DistrictId ?? '',
            ProvinceId: ProvinceId ?? '',
            IsDefault: false,
            Type: data.Type,
            ...value
        }
        dispatch({
            type: OrderActions.SAVE_USER_ADDRESS,
            address: value,
            callback: {
                success: (res_save) => {
                    dispatch({
                        type: OrderActions.LOAD_USER_ORDER_ADDRESS,
                        callback: {
                            success: (res) => {
                                showVisible(false);
                                if (typeof payload.callback == 'function') {
                                    payload.callback({
                                        id:res_save?.data?.Data?.UserAddressId,
                                        data:res?.data?.UserAddresses
                                    });
                                }
                            }
                        }
                    })
                },
            },
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
        if (dataAddress?.UserAddressId) {
            props.change('LastNameId', dataAddress.Lastname)
            props.change('FirstNameId', dataAddress.Firstname)
            props.change('PhoneId', dataAddress.Phone)
            props.change('ProvinceId', dataAddress.ProvinceId)
            props.change('DistrictId', dataAddress.DistrictId)
            props.change('CommuneId', dataAddress.CommuneId)
            props.change('AddressId', dataAddress.Address)
            props.change('Type', dataAddress.Type)
        }else{
            props.change('LastNameId', null)
            props.change('FirstNameId', null)
            props.change('PhoneId', null)
            props.change('ProvinceId', null)
            props.change('DistrictId', null)
            props.change('CommuneId', null)
            props.change('AddressId', null)
            props.change('Type', 1)
        }
    }, [dataAddress])

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
    const refParent = useRef(false);
    const headerRef = useRef(false);
    const bodyRef = useRef(false);
    const footerRef = useRef(false);
    const [maxBodyHeight, setMaxBodyHeight] = useState('calc(80%');
    useEffect(() => {
        let marginTop = 56;
        if (window.innerWidth < constants.WINDOW_SIZE.MEDIUM) {
            marginTop = 0;
        }
        let maxHeight =
			window.outerHeight -
			(headerRef.current.clientHeight +
				footerRef.current.clientHeight +
				marginTop);
        setMaxBodyHeight(maxHeight);
    }, []);
    const masterType = [
        {
            Id: 1,
            Name: 'Văn phòng',
        },
        {
            Id: 2,
            Name: 'Nhà riêng',
        },
        {
            Id: 3,
            Name: 'Khác',
        },
    ];
    const renderBody = () => {
        return (
            <>
                <div className="_section">
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
                                    id="LastNameId"
                                    label={lbl_first_name}
                                    placeholder={lbl_input_first_name}
                                    name="LastNameId"
                                    component={RenderMatInput}
                                    type="text"
                                    className="input-order-style"
                                    validate={[
                                        Validator.required,
                                        Validator.maxLength30
                                    ]}
                                />

                            </div>
                        </div>

                        <div className="col-md-6 col-sm-12">
                            <div className="input-order-wrap mg-t-b-20">
                                <Field
                                    id="FirstNameId"
                                    label={lbl_last_name}
                                    placeholder={lbl_input_last_name}
                                    name="FirstNameId"
                                    component={RenderMatInput}
                                    type="text"
                                    className="input-order-style"
                                    validate={[
                                        Validator.required,
                                        Validator.maxLength30
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
                                    maxLength={10}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <hr className="cross-line" />
                <div className="_section">
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
                            <div style={{ marginTop: 20 }}>
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
                            <div style={{ marginTop: '20px' }}>
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
                    </div>
                </div>

                <hr className="cross-line" />
                <div className="_section address_type">
                    <div className="row">
                        <div className="col-12">
                            <span className="title-address-modal">
                                {lbl_address_type}
                            </span>
                            <hr
                                className="cross-line"
                                style={{ marginTop: '20px' }}
                            />
                        </div>
                    </div>
                    <div>
                        <Field
                            id="Type"
                            name="Type"
                            component={RenderTextRadio}
                            type="text"
                            master={masterType}
                            defaultValue={1}
                            className="input-order-style"
                        />
                    </div>
                </div>
            </>
        );
    };
    const renderFooter = () => {
        return (
            <div className="col-12 d-center">
                <ButtonMain
                    className="__btn_main btn_confirm_address"
                    title={lbl_btn_confirm}
                    onClick={handleSubmit(onSubmit)}
                    fontSize={14}
                />
            </div>
        );
    };
    return (
        <ResizePopup
            payload={payload}
            showVisible={showVisible}
            body={renderBody}
            footer={renderFooter}
        />
    );
}
AddAddressPopup.defaultProps = {
    payload: {
        title: 'Đã lưu thành công',
    },
};
AddAddressPopup = reduxForm({
    form: 'AddAddressPopup',
    enableReinitialize: true,
})(AddAddressPopup);
const selector = formValueSelector('AddAddressPopup');
AddAddressPopup = connect((state) => {
    const ProvinceId = selector(state, 'ProvinceId');
    const DistrictId = selector(state, 'DistrictId');
    const CommuneId = selector(state, 'CommuneId');
    return {
        ProvinceId: ProvinceId,
        CommuneId: CommuneId,
        DistrictId: DistrictId,
    };
})(AddAddressPopup);
export default AddAddressPopup;
