import React, { useEffect, useState } from 'react'
import Image from '@spo/components/common/image'
import { Field, reduxForm ,formValueSelector} from 'redux-form'
import RenderMatInput from '../redux-form/common/render-mat-input'
import * as Validator from '@spo/lib/validator'
import { connect, useDispatch ,useSelector} from 'react-redux'
import RenderMatSelect from './../redux-form/common/render-mat-select'
import MasterActions from '@spo/redux/master/action';
import submit from './submit';
import { scrollToFirstError } from '../../library/helper'
import actions from './../../../redux/order/action';

function AddressSyncComponent(props) {
    const lbl_first_name = 'Họ & Tên Đệm'
    const lbl_address = 'Địa chỉ cụ thể'
    const lbl_input_address = 'Số nhà ,tên toà nhà ,tên khu vực'
    const lbl_email = 'Email'
    const lbl_input_first_name = 'Nhập Họ & Tên Đệm'
    const lbl_input_email = 'Nhập Email'
    const lbl_last_name = 'Tên'
    const lbl_input_last_name = 'Nhập Tên'
    const lbl_phone = 'Số điện thoại'
    const lbl_input_phone = 'Nhập số điện thoại'
    const lbl_city = 'Tỉnh/Thành phố'
    const lbl_input_city = 'Chọn Tỉnh/Thành phố'
    const lbl_district = 'Quận/Huyện'
    const lbl_input_district = 'Chọn Quận/Huyện'
    const lbl_ward = 'Phường/Xã'
    const lbl_input_ward = 'Chọn Phường/Xã'
    const Name_Address_Title = 'Địa chỉ nhận hàng'
    const [Districts, setDistricts] = useState([])
    const [Communes, setCommunes] = useState([]);
    const dispatch=useDispatch();
    const {
        data: { Genders, Provinces },
    } = useSelector((state) => state.Master)
    const { handleSubmit, ProvinceId, CommuneId, DistrictId } = props
    useEffect(() => {
        if (ProvinceId) {
            dispatch({
                type: MasterActions.GET_DISTRICT_MASTER,
                data: { ProvinceId: ProvinceId },
                success: (res) => {
                    setDistricts(res)
                    if (res.findIndex((x) => x.Id == DistrictId) == -1) {
                        props.change('DistrictId', null)
                        props.change('CommuneId', null)
                    }
                },
            })
        }
    }, [ProvinceId])
    useEffect(() => {
        if(ProvinceId && CommuneId && DistrictId){
            dispatch({
                type:actions.CALC_ORDER_VALUES_SYNC,
                order: {
                    ProvinceId,DistrictId,CommuneId,
                    RequestFrom: 3,
                    Carts: JSON.parse(localStorage.getItem('checkedCarts'))
                }
            })
        }
    }, [ProvinceId, CommuneId, DistrictId])

    useEffect(() => {
        if (DistrictId) {
            dispatch({
                type: MasterActions.GET_COMMUNE_MASTER,
                data: { DistrictId: DistrictId },
                success: (res) => {
                    setCommunes(res)
                    if (res.findIndex((x) => x.Id == CommuneId) == -1) {
                        props.change('CommuneId', null)
                    }
                },
            })
        }
    }, [DistrictId])
    return (
        <form onSubmit={props.handleSubmit} className="w-100 container-order-sync">
            <div className="d-flex align-items-baseline">
                <Image
                    src={`/images/icon/marker.svg`}
                    style={{ width: 19, paddingBottom: 2 }}
                />
                <p className="mb-0 pl-2">{Name_Address_Title}</p>
            </div>

            <div className="row mr-0 ml-0 w-100 mb-3">
                <div className="col-md-4 col-md-4-sync col-sm-12 pr-0 pl-0">
                    <div className="input-order-wrap">
                        <Field
                            id="FirstNameId"
                            label={lbl_first_name}
                            placeholder={lbl_input_first_name}
                            name="LastName"
                            component={RenderMatInput}
                            type="text"
                            className="input-order-style "
                            validate={[
                                Validator.required,
                                Validator.maxLength50,
                            ]}
                        />
                    </div>
                </div>
                <div className="col-md-4 col-md-4-sync col-sm-12">
                    <div className="input-order-wrap">
                        <Field
                            id="LastNameId"
                            label={lbl_last_name}
                            placeholder={lbl_input_last_name}
                            name="FirstName"
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
                <div className="col-md-4 col-md-4-sync col-sm-12 pr-0 pl-0">
                    <div className="input-order-wrap ">
                        <Field
                            id="PhoneId"
                            label={lbl_phone}
                            placeholder={lbl_input_phone}
                            name="Phone"
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
            <div className="row mr-0 ml-0 w-100">
                <div className="col-md-4 col-md-4-sync col-sm-12 pr-0 pl-0">
                    <div className="input-order-wrap input-order-style-sync">
                        <Field
                            id="EmailId"
                            label={lbl_email}
                            placeholder={lbl_input_email}
                            name="Email"
                            component={RenderMatInput}
                            type="text"
                            className="input-order-style "
                            validate={[
                                Validator.required,
                                Validator.email2,
                            ]}
                        />
                    </div>
                </div>
                <div className="col-md-4 col-md-4-sync col-sm-12">
                    <div className="input-order-wrap input-order-style-sync">
                        <Field
                            id="ProvinceId"
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
                <div className="col-md-4 col-md-4-sync col-sm-12 pr-0 pl-0">
                    <div className="input-order-wrap input-order-style-sync">
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
            </div>
            <div className="row mr-0 ml-0 w-100 mt-3">
                <div className="col-md-4 col-md-4-sync col-sm-12 pr-0 pl-0">
                    <div className="input-order-wrap input-order-style-sync">
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
                <div className="col-md-8 col-md-8-sync col-sm-12 pr-0">
                    <div className="input-order-wrap">
                        <Field
                            id="Address"
                            label={lbl_address}
                            placeholder={lbl_input_address}
                            name="Address"
                            component={RenderMatInput}
                            type="text"
                            className="input-order-style "
                            validate={[
                                Validator.required,
                                Validator.maxLength50,
                            ]}
                        />
                    </div>
                </div>
            </div>
        </form>
    )
}
AddressSyncComponent = reduxForm({
    form: 'AddressSyncComponent',
    enableReinitialize: true,
    onSubmit: submit,
    onSubmitFail: (errors) => {
        scrollToFirstError(errors);
    },
})(AddressSyncComponent)
const selector = formValueSelector('AddressSyncComponent')
AddressSyncComponent = connect((state) => {
    const ProvinceId = selector(state, 'ProvinceId')
    const DistrictId = selector(state, 'DistrictId')
    const CommuneId = selector(state, 'CommuneId')
    return {
        ProvinceId: ProvinceId,
        CommuneId: CommuneId,
        DistrictId: DistrictId,
    }
})(AddressSyncComponent)
export default AddressSyncComponent
