import React, { useState } from 'react';
import { Field, reduxForm } from 'redux-form';
import RenderDatePicker from '@spo/components/redux-form/recruitment/render-datepicker';
import RenderInput from '@spo/components/redux-form/recruitment/render-input';
import RenderSelect from '@spo/components/redux-form/recruitment/render-select';
import RenderCheckbox from '@spo/components/redux-form/recruitment/render-checkbox';
import * as Validator from '@spo/lib/validator';
import { useSelector } from 'react-redux';
import IconX from '../common/icon-x';
import ButtonMain from '../common/button-main';

const Section6 = (props) => {
    const {
        showButtons,
        sectionTitle,
        handleSubmit,
        handleStepActive,
        handleDataSubmit,
        step = 0,
    } = props;
    const { DegreeMaster, DegreeOfTypeMaster } = useSelector(
        (state) => state.Common,
    );

    const [list, setList] = useState([999]);
    const handleAdd = () => {
        let newFamily = [...list];
        newFamily.push(newFamily.length * 1000);
        setList(newFamily);
    };
    const handleDelete = (index) => {
        let newFamily = [...list];
        newFamily.splice(index, 1);
        setList(newFamily);
    };
    const onSubmit = (data) => {
        handleDataSubmit(data);
        handleStepActive(7);
    };
    return (
        <div
            className={`recruitment-form--section bordered-right bordered-right--section6 ${
                step > 6 && 'active'
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
                        label="Trường/Đơn vị đào tạo"
                        placeholder="Nhập Trường/Đơn vị đào tạo"
                        name={`CandidateEducations[${index}][School]`}
                        component={RenderInput}
                        type="text"
                    />
                    <Field
                        id={`CandidateEducations[${index}][ContentOfStudy]`}
                        label="Nội dung đào tạo"
                        placeholder="Nhập nội dung đào tạo"
                        name={`CandidateEducations[${index}][ContentOfStudy]`}
                        component={RenderInput}
                        type="text"
                    />
                    <Field
                        id={`CandidateEducations[${index}][Type]`}
                        label="Bằng cấp/Chứng chỉ"
                        name={`CandidateEducations[${index}][Type]`}
                        masterData={DegreeMaster}
                        component={RenderCheckbox}
                        type="text"
                    />
                    <Field
                        id={`CandidateEducations[${index}][Ranking]`}
                        placeholder="Chọn xếp loại"
                        label="Xếp loại"
                        name={`CandidateEducations[${index}][Ranking]`}
                        component={RenderSelect}
                        field={['Name', 'Value']}
                        masterData={DegreeOfTypeMaster}
                        type="text"
                    />
                </div>
            ))}
            <button type="button" onClick={handleAdd} className="btn-add">
        + Thêm khoá huấn luyện, đào tạo khác
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
export default reduxForm({ form: 'Section6Form' })(Section6);
