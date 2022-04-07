import React, { useEffect, useState } from "react";
import { Field, formValueSelector, reduxForm } from "redux-form";
import RenderDatePicker from "@spo/components/redux-form/recruitment/render-datepicker";
import RenderInput from "@spo/components/redux-form/recruitment/render-input";
import RenderSelect from "@spo/components/redux-form/recruitment/render-select";
import RenderCheckbox from "@spo/components/redux-form/recruitment/render-checkbox";
import * as Validator from "@spo/lib/validator";
import CustomCheckboxRow from "@spo/components/redux-form/recruitment/custom-checkbox-row";
import CustomSelect from "@spo/components/redux-form/recruitment/custom-select";
import DropdownIconUrl from "@spo/public/images/icon/ic_dropdown.svg";
import { connect, useDispatch, useSelector } from "react-redux";
import MasterActions from "@spo/redux/master/action";
import { scrollToFirstError ,
    convertToCurrency,
    convertToNumber,
    normalizeCurrency,
} from "../../library/helper";
import RenderInputFile from "../redux-form/recruitment/render-input-file";
import CustomCurrencyInput from "../redux-form/recruitment/custom-currency-input";
import CustomInput from "@spo/components/redux-form/recruitment/custom-input";
import ButtonMain from "../common/button-main";

const DropdownIcon = () => <img src={DropdownIconUrl} />;
let Section1 = (props) => {
    const dispatch = useDispatch();
    const {
        handleSubmit,
        handleStepActive,
        handleDataSubmit,
        showButtons = false,
        sectionTitle = "",
        PermanentProvinceId,
        PermanentDistrictId,
        PermanentCommuneId,
        TemporaryProvinceId,
        TemporaryDistrictId,
        TemporaryCommuneId,
        MaritalStatus,
        RecruitmentName,
        Email,
        Phone,
        Name,
        Address,
        BranchId,
        step = 0,
    } = props;
    const { GenderMaster, YesNoMaster, MaritalStatusMaster } = useSelector(
        (state) => state.Common
    );
    const { listBranch } = useSelector((state) => state.Common.data);
    const normalize = (value) => {
        return value;
    };
    const { cities } = useSelector((state) => state.Location);
    const [permanentDistrict, setPermanentDistrict] = useState([]);
    const [permanentWard, setPermanentWard] = useState([]);
    const [temporaryDistrict, setTemporaryDistrict] = useState([]);
    const [temporaryWard, setTemporaryWard] = useState([]);
    const onSubmit = (data) => {
        handleDataSubmit(data);
        handleStepActive(2);
    };
    useEffect(() => {
        if (PermanentProvinceId) {
            dispatch({
                type: MasterActions.GET_DISTRICT_MASTER,
                data: { ProvinceId: PermanentProvinceId },
                success: (res) => {
                    setPermanentDistrict(res);
                    if (res.findIndex((x) => x.Id == DistrictId) == -1) {
                        props.change("PermanentDistrictId", null);
                        props.change("PermanentCommuneId", null);
                    }
                },
            });
        }
    }, [PermanentProvinceId]);
    useEffect(() => {
        if (PermanentDistrictId) {
            dispatch({
                type: MasterActions.GET_COMMUNE_MASTER,
                data: { DistrictId: PermanentDistrictId },
                success: (res) => {
                    setPermanentWard(res);
                    if (res.findIndex((x) => x.Id == CommuneId) == -1) {
                        props.change("PermanentCommuneId", null);
                    }
                },
            });
        }
    }, [PermanentDistrictId]);
    useEffect(() => {
        if (TemporaryProvinceId) {
            dispatch({
                type: MasterActions.GET_DISTRICT_MASTER,
                data: { ProvinceId: TemporaryProvinceId },
                success: (res) => {
                    setTemporaryDistrict(res);
                    if (res.findIndex((x) => x.Id == DistrictId) == -1) {
                        props.change("TemporaryDistrictId", null);
                        props.change("TemporaryCommuneId", null);
                    }
                },
            });
        }
    }, [TemporaryProvinceId]);
    useEffect(() => {
        if (TemporaryDistrictId) {
            dispatch({
                type: MasterActions.GET_COMMUNE_MASTER,
                data: { DistrictId: TemporaryDistrictId },
                success: (res) => {
                    setTemporaryWard(res);
                    if (res.findIndex((x) => x.Id == CommuneId) == -1) {
                        props.change("TemporaryCommuneId", null);
                    }
                },
            });
        }
    }, [TemporaryDistrictId]);
 useEffect(() => {
   if(RecruitmentName){
       props.change('RecruitmentName',RecruitmentName);
   }
   if(Email){
    props.change('Email',Email);
    }
    if(Phone){
        props.change('Phone',Phone);
    }
    if(Name){
        props.change('Name',Name);
    }
    if(Address){
        props.change('Address',Address);
    }
    if(BranchId){
        props.change('BranchId',BranchId);
    }
 }, [RecruitmentName,Email, Phone, Address, BranchId])
 
    return (
        <div>
            <div className="mx-0 row justify-content-between">
                <div className="recruitment-form--section">
                    <Field
                        id="FileImage"
                        label="Tải ảnh 3x4 tại đây"
                        name="FileImage"
                        type="file"
                        component={RenderInputFile}
                        validate={[Validator.required]}
                    />
                </div>
                <div className="recruitment-form--section">
                    <div className="d-none">
                        <Field
                            id="RecruitmentId"
                            label="Vị trí ứng tuyển"
                            placeholder="Nhập vị trí ứng tuyển"
                            name="RecruitmentId"
                            component={RenderInput}
                            type="hidden"
                        />
                    </div>
                    <Field
                        id="RecruitmentName"
                        label="Vị trí ứng tuyển"
                        placeholder="Nhập vị trí ứng tuyển"
                        name="RecruitmentName"
                        component={RenderInput}
                        type="text"
                    />
                    <Field
                        id="OtherPosition"
                        label="Vị trí ứng tuyển khác"
                        placeholder="Nhập vị trí ứng tuyển khác"
                        name="OtherPosition"
                        component={RenderInput}
                        type="text"
                    />
                    <div className="work-location">
                        <Field
                            id="BranchId"
                            label="Địa điểm làm việc"
                            placeholder="Chọn địa điểm làm việc"
                            name="BranchId"
                            component={RenderSelect}
                            masterData={listBranch}
                            field={["Name", "Id"]}
                            validate={[Validator.required]}
                            readonly={true}
                        />
                    </div>
                    <div className={`form-input--wrapper`}>
                        <div className={`render-input position-relative`}>
                            <label>
                  Mức lương mong muốn <span className="text-required">*</span>
                            </label>
                            <div className="d-start">
                                <div style={{ width: "50%", paddingRight: 5 }}>
                                    <Field
                                        id="SalaryFrom"
                                        placeholder="Từ"
                                        name="SalaryFrom"
                                        component={CustomCurrencyInput}
                                        typeIcon="range"
                                        isDot={true}
                                        type="text"
                                        validate={[Validator.required, Validator.number]}
                                        style={{
                                            borderBottom: "1px solid #ccc",
                                        }}
                                    />
                                </div>
                                <div style={{ width: "50%", paddingLeft: 5 }}>
                                    <Field
                                        id="SalaryTo"
                                        placeholder="Đến"
                                        label="Mức lương mong muốn"
                                        name="SalaryTo"
                                        component={CustomCurrencyInput}
                                        isDot={true}
                                        typeIcon="range"
                                        type="text"
                                        validate={[
                                            Validator.required,
                                            Validator.number,
                                            Validator.rangeSalary,
                                        ]}
                                        style={{
                                            borderBottom: "1px solid #ccc",
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <Field
                        id="StartWorkAt"
                        placeholder="Ngày có thể tiếp nhận công việc"
                        label={
                            <p>
                  Ngày có thể tiếp nhận công việc{" "}
                                <span className="text-required">*</span>
                            </p>
                        }
                        name="StartWorkAt"
                        component={RenderDatePicker}
                        validate={[Validator.required, Validator.isExpired]}
                    />
                </div>
            </div>
            <div
                className={`recruitment-form--section bordered-right bordered-right--section1 ${
                    step > 1 && "active"
                }`}
            >
                {sectionTitle && (
                    <p className="recruitment-form--section-header">{sectionTitle}</p>
                )}
                <div>
                    <Field
                        id="Name"
                        label="Họ & Tên"
                        name="Name"
                        component={RenderInput}
                        type="text"
                        validate={[Validator.required]}
                    />
                    <div
                        style={{
                            display: "flex",
                            alignItems: "flex-start",
                            justifyContent: "center",
                        }}
                    >
                        <div style={{ width: "50%", paddingRight: 5 }}>
                            <Field
                                id="Birthday"
                                label="Ngày sinh"
                                name="Birthday"
                                maxDate={new Date()}
                                component={RenderDatePicker}
                                validate={[Validator.required, Validator.validateMinDate]}
                            />
                        </div>
                        <div style={{ width: "50%", paddingLeft: 5 }}>
                            <Field
                                id="Birthplace"
                                placeholder="Chọn nơi sinh"
                                label="Nơi sinh"
                                name="Birthplace"
                                component={RenderSelect}
                                field={["Name", "Id"]}
                                masterData={cities}
                                type="text"
                                validate={[Validator.required]}
                            />
                        </div>
                    </div>
                    <Field
                        id="Gender"
                        label="Giới tính"
                        name="Gender"
                        masterData={GenderMaster}
                        component={RenderCheckbox}
                        type="text"
                        validate={[Validator.required]}
                    />
                    <div
                        style={{
                            display: "flex",
                            alignItems: "flex-start",
                            justifyContent: "center",
                        }}
                    >
                        <div style={{ flex: 1, paddingRight: 5 }}>
                            <Field
                                id="Height"
                                placeholder="Nhập chiều cao"
                                label="Chiều cao (cm)"
                                name="Height"
                                component={RenderInput}
                                step={1}
                                validate={[Validator.required, Validator.number]}
                            />
                        </div>
                        <div style={{ flex: 1, paddingLeft: 5 }}>
                            <Field
                                id="Weight"
                                placeholder="Nhập cân nặng"
                                label="Cân nặng (kg)"
                                name="Weight"
                                type="number"
                                step={1}
                                component={RenderInput}
                                validate={[Validator.required, Validator.number]}
                            />
                        </div>
                    </div>
                    <Field
                        id="IDCard"
                        label="Số CMND/CCCD"
                        placeholder="Nhập số CMND/CCCD"
                        name="IDCard"
                        component={RenderInput}
                        validate={[Validator.required, Validator.number]}
                    />
                    <div
                        style={{
                            display: "flex",
                            alignItems: "flex-start",
                            justifyContent: "center",
                        }}
                    >
                        <div style={{ flex: 1, paddingRight: 5 }}>
                            <Field
                                id="DateOfIDCard"
                                label="Ngày cấp"
                                name="DateOfIDCard"
                                component={RenderDatePicker}
                                maxDate={new Date()}
                                validate={[Validator.required, Validator.validateMinDate]}
                            />
                        </div>
                        <div style={{ flex: 1, paddingLeft: 5 }}>
                            <Field
                                id="PlaceOfIDCard"
                                placeholder="Chọn nơi cấp"
                                label="Nơi cấp"
                                name="PlaceOfIDCard"
                                component={RenderSelect}
                                field={["Name", "Id"]}
                                masterData={cities}
                                type="text"
                                validate={[Validator.required]}
                            />
                        </div>
                    </div>
                    <p className="recruitment-form--section-sub-header">
          Địa chỉ thường trú <span>(địa chỉ ghi trên CMND/CCCD)</span>
                    </p>
                    <Field
                        id="PermanentProvinceId"
                        label="Tỉnh/Thành phố"
                        placeholder="Chọn Tỉnh/Thành phố"
                        name="PermanentProvinceId"
                        masterData={cities}
                        component={RenderSelect}
                        field={["Name", "Id"]}
                        type="text"
                        validate={[Validator.required]}
                    />
                    <div
                        style={{
                            display: "flex",
                            alignItems: "flex-start",
                            justifyContent: "center",
                        }}
                    >
                        <div style={{ flex: 1, paddingRight: 5 }}>
                            <Field
                                id="PermanentDistrictId"
                                label="Quận/Huyện"
                                placeholder="Chọn Quận/Huyện"
                                name="PermanentDistrictId"
                                masterData={permanentDistrict}
                                component={RenderSelect}
                                field={["Name", "Id"]}
                                type="text"
                                validate={[Validator.required]}
                            />
                        </div>
                        <div style={{ flex: 1, paddingLeft: 5 }}>
                            <Field
                                id="PermanentCommuneId"
                                label="Phường/Xã"
                                placeholder="Chọn Phường/Xã"
                                name="PermanentCommuneId"
                                masterData={permanentWard}
                                component={RenderSelect}
                                field={["Name", "Id"]}
                                type="text"
                                validate={[Validator.required]}
                            />
                        </div>
                    </div>
                    <Field
                        id="PermanentAddress"
                        label="Địa chỉ cụ thể"
                        placeholder="Nhập số nhà, tên toà nhà, tên đường, tên khu vực"
                        name="PermanentAddress"
                        component={RenderInput}
                        type="text"
                        validate={[Validator.required]}
                    />
                    <p className="recruitment-form--section-sub-header">
          Địa chỉ tạm trú <span>(địa chỉ đang ở hiện tại)</span>
                    </p>
                    <Field
                        id="TemporaryProvinceId"
                        label="Tỉnh/Thành phố"
                        placeholder="Chọn Tỉnh/Thành phố"
                        name="TemporaryProvinceId"
                        component={RenderSelect}
                        masterData={cities}
                        field={["Name", "Id"]}
                        type="text"
                        validate={[Validator.required]}
                    />
                    <div
                        style={{
                            display: "flex",
                            alignItems: "flex-start",
                            justifyContent: "center",
                        }}
                    >
                        <div style={{ flex: 1, paddingRight: 5 }}>
                            <Field
                                id="TemporaryDistrictId"
                                label="Quận/Huyện"
                                placeholder="Chọn Quận/Huyện"
                                name="TemporaryDistrictId"
                                masterData={temporaryDistrict}
                                field={["Name", "Id"]}
                                component={RenderSelect}
                                type="text"
                                validate={[Validator.required]}
                            />
                        </div>
                        <div style={{ flex: 1, paddingLeft: 5 }}>
                            <Field
                                id="TemporaryCommuneId"
                                label="Phường/Xã"
                                placeholder="Chọn Phường/Xã"
                                name="TemporaryCommuneId"
                                masterData={temporaryWard}
                                component={RenderSelect}
                                field={["Name", "Id"]}
                                type="text"
                                validate={[Validator.required]}
                            />
                        </div>
                    </div>
                    <Field
                        id="TemporaryAddress"
                        label="Địa chỉ cụ thể"
                        placeholder="Nhập số nhà, tên toà nhà, tên đường, tên khu vực"
                        name="TemporaryAddress"
                        component={RenderInput}
                        type="text"
                        validate={[Validator.required]}
                    />
                    <div className={`form-input--wrapper`}>
                        <div className={`render-input position-relative`}>
                            <label>
              Tình trạng hôn nhân
                                <span className="text-required">*</span>
                            </label>
                            <Field
                                id="MaritalStatus"
                                label="Tình trạng hôn nhân"
                                name="MaritalStatus"
                                data={MaritalStatusMaster}
                                component={CustomCheckboxRow}
                                type="text"
                                validate={[Validator.required]}
                            />
                            {MaritalStatus != 1 && (
                                <div className="d-flex">
                                    <label>Con cái</label>
                                    <Field
                                        id="Children"
                                        name="Children"
                                        component={CustomSelect}
                                        style={{
                                            marginLeft: 5,
                                            borderBottom: "1px solid #ccc",
                                        }}
                                        inputIcon={<DropdownIcon />}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                    <Field
                        id="IsOnBusinessTrip"
                        label="Có thể đi công tác không ?"
                        name="IsOnBusinessTrip"
                        masterData={YesNoMaster}
                        component={RenderCheckbox}
                        type="text"
                        validate={[Validator.required]}
                    />
                    <div
                        style={{
                            display: "flex",
                            alignItems: "flex-start",
                            justifyContent: "center",
                        }}
                    >
                        <div style={{ flex: 1, paddingRight: 5 }}>
                            <Field
                                id="Phone"
                                label="Số điện thoại"
                                placeholder="Nhập số điện thoại"
                                name="Phone"
                                component={RenderInput}
                                type="number"
                                validate={[Validator.required, Validator.phone]}
                            />
                        </div>
                        <div style={{ flex: 1, paddingLeft: 5 }}>
                            <Field
                                id="Email"
                                label="Địa chỉ email"
                                placeholder="Nhập địa chỉ email"
                                name="Email"
                                component={RenderInput}
                                type="email"
                                validate={[Validator.required, Validator.emailOrPhone]}
                            />
                        </div>
                    </div>
                    {showButtons && (
                        <ButtonMain
                            title="Tiếp tục"
                            className="btn-recruitment--continue"
                            type="button"
                            onClick={handleSubmit(onSubmit)}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};
Section1 = reduxForm({
    form: "Section1Form",
    enableReinitialize: true,
    onSubmitFail: (errors) => {
        scrollToFirstError(errors);
    },
})(Section1);
const selector = formValueSelector("Section1Form");
Section1 = connect((state) => {
    const PermanentProvinceId = selector(state, "PermanentProvinceId");
    const PermanentDistrictId = selector(state, "PermanentDistrictId");
    const PermanentCommuneId = selector(state, "PermanentCommuneId");
    const TemporaryProvinceId = selector(state, "TemporaryProvinceId");
    const TemporaryDistrictId = selector(state, "TemporaryDistrictId");
    const TemporaryCommuneId = selector(state, "TemporaryCommuneId");
    const RecruitmentName = selector(state, "RecruitmentName");
    const BranchId = selector(state, "BranchId");
    const Address = selector(state, "Address");
    const Name = selector(state, "Name");
    const Phone = selector(state, "Phone");
    const Email = selector(state, "Email");


    const MaritalStatus = selector(state, "MaritalStatus");
    let branchId =
    state.Recruitment.detail?.Branches?.length > 0
        ? state.Recruitment.detail?.Branches[0]?.Id
        : 0;
    return {
        initialValues: {
            Name: state.Auth.data.User?.DisplayName,
            Phone: state.Auth.data.User?.Phone,
            Email: state.Auth.data.User?.Email,
            Gender: state.Auth.data.User?.Gender || 1,
            Birthday: state.Auth.data.UserInfo?.Birthday
                ? format(new Date(state.Auth.data.UserInfo?.Birthday), "yyyy-MM-dd")
                : null,
            TemporaryProvinceId: state.Auth.data.UserInfo?.Address?.ProvinceId,
            TemporaryCommuneId: state.Auth.data.UserInfo?.Address?.CommuneId,
            TemporaryDistrictId: state.Auth.data.UserInfo?.Address?.DistrictId,
            Address: state.Auth.data.User?.UserInfo?.Address,
            RecruitmentId: state.Recruitment.detail?.Id,
            RecruitmentName: state.Recruitment.detail?.Title,
            BranchId: branchId,
            MaritalStatus: 1,
            IsOnBusinessTrip: 1,
            Children: 1,
        },
        PermanentProvinceId,
        PermanentDistrictId,
        PermanentCommuneId,
        TemporaryProvinceId,
        TemporaryDistrictId,
        TemporaryCommuneId,
        MaritalStatus,
        RecruitmentName,
        Email,
        Phone,
        Name,
        Address,
        BranchId,
}})(Section1);
export default Section1;
