import React, { useState } from 'react';
import { Field, reduxForm } from 'redux-form';
import RenderDatePicker from '@spo/components/redux-form/recruitment/render-datepicker';
import RenderInput from '@spo/components/redux-form/recruitment/render-input';
import RenderSelect from '@spo/components/redux-form/recruitment/render-select';
import * as Validator from '@spo/lib/validator';
import { useSelector } from 'react-redux';
import IconX from '../common/icon-x';
import ButtonMain from '../common/button-main';

const Section5 = (props) => {
    const {
        showButtons,
        sectionTitle,
        handleSubmit,
        handleStepActive,
        handleDataSubmit,
        step = 0,
    } = props;
    const { TypeTrainingMaster, DegreeOfTypeMaster } = useSelector(
        (state) => state.Common,
    );
    const [list, setList] = useState([0]);
    const handleAdd = () => {
        let newFamily = [...list];
        newFamily.push(newFamily.length);
        setList(newFamily);
    };
    const handleDelete = (index) => {
        let newFamily = [...list];
        newFamily.splice(index, 1);
        setList(newFamily);
    };
    const onSubmit = (data) => {
        handleDataSubmit(data);
        handleStepActive(6);
    };
    return (
        <div
            className={`recruitment-form--section bordered-right bordered-right--section5 ${
                step > 5 && 'active'
            }`}>
            {sectionTitle && (
                <p className="recruitment-form--section-header">{sectionTitle}</p>
            )}
            {list?.map((ls, index) => (
                <div key={index} className="recruitment-form--list--container">
                    {index > 0 && (
                        <button
                            onClick={() => handleDelete(index)}
                            className="recruitment-form--list--btn-delete">
                            <IconX color="#fff" fontSize={30} />
                        </button>
                    )}
                    <Field
                        id={`CandidateEducations[${index}][School]`}
                        label="Trường đào tạo"
                        placeholder="Nhập Trường đào tạo"
                        name={`CandidateEducations[${index}][School]`}
                        component={RenderInput}
                        type="text"
                    />
                    <Field
                        id={`CandidateEducations[${index}][Type]`}
                        placeholder="Chọn loại hình đào tạo"
                        label="Loại hình đào tạo"
                        name={`CandidateEducations[${index}][Type]`}
                        component={RenderSelect}
                        type="text"
                        field={['Name', 'Value']}
                        masterData={TypeTrainingMaster}
                        typeIcon="dropdown"
                    />
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            justifyContent: 'center',
                        }}>
                        <div style={{ flex: 1, paddingRight: 5 }}>
                            <Field
                                id={`CandidateEducations[${index}][Major]`}
                                label="Chuyên ngành"
                                placeholder="Nhập chuyên ngành"
                                name={`CandidateEducations[${index}][Major]`}
                                component={RenderInput}
                                type="text"
                            />
                        </div>
                        <div style={{ flex: 1, paddingLeft: 5 }}>
                            <Field
                                id={`CandidateEducations[${index}][Ranking]`}
                                placeholder="Chọn xếp loại"
                                label="Xếp loại"
                                name={`CandidateEducations[${index}][Ranking]`}
                                component={RenderSelect}
                                type="text"
                                field={['Name', 'Value']}
                                masterData={DegreeOfTypeMaster}
                                typeIcon="dropdown"
                            />
                        </div>
                    </div>
                </div>
            ))}
            <button type="button" onClick={handleAdd} className="btn-add">
        + Thêm trình độ học vấn
            </button>
            {showButtons && (
                <ButtonMain
                    title="Tiếp tục"
                    className="btn-recruitment--continue"
                    type="button"
                    onClick={handleSubmit(onSubmit)}
                />
            )}
        </div>
    );
};
export default reduxForm({ form: 'Section5Form' })(Section5);
