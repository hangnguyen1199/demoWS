import React from 'react';
import { Field, reduxForm } from 'redux-form';
import RenderDatePicker from '@spo/components/redux-form/recruitment/render-datepicker';
import RenderSelect from '@spo/components/redux-form/recruitment/render-select';
import CustomInput from '@spo/components/redux-form/recruitment/custom-input';
import * as Validator from '@spo/lib/validator';
import RenderInput from '../redux-form/recruitment/render-input';
import { useSelector } from 'react-redux';
import { convertToCurrency, convertToNumber, normalizeCurrency } from '../../library/helper';
import CustomCurrencyInput from '../redux-form/recruitment/custom-currency-input';

const Section0 = () => {
    const { listBranch } = useSelector((state) => state.Common.data);
    const normalize = (value) => {
        return value;
    };
    return (
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
            <Field
                id="BranchId"
                label="Địa điểm làm việc"
                placeholder="Chọn địa điểm làm việc"
                name="BranchId"
                component={RenderSelect}
                masterData={listBranch}
                field={['Name', 'Id']}
                type="text"
                validate={[Validator.required]}
                readonly={true}
            />
            <div className={`form-input--wrapper`}>
                <div className={`render-input position-relative`}>
                    <label>
            Mức lương mong muốn <span className="text-required">*</span>
                    </label>
                    <div className="d-start">
                        <div style={{ width: '50%', paddingRight: 5 }}>
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
                                    borderBottom: '1px solid #ccc',
                                }}
                            />
                        </div>
                        <div style={{ width: '50%', paddingLeft: 5 }}>
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
                                    borderBottom: '1px solid #ccc',
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <Field
                id="StartWorkAt"
                placeholder="Ngày có thể tiếp nhận công việc"
                label={<p>Ngày có thể tiếp nhận công việc <span className="text-required">*</span></p>}
                name="StartWorkAt"
                component={RenderDatePicker}
                validate={[Validator.required, Validator.isExpired]}
            />
        </div>
    );
};

export default reduxForm({ form: 'Section0Form' })(Section0);
