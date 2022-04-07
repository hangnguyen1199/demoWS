import React, { useState } from 'react';
import { Field, reduxForm } from 'redux-form';
import RenderDatePicker from '@spo/components/redux-form/recruitment/render-datepicker';
import RenderInput from '@spo/components/redux-form/recruitment/render-input';
import * as Validator from '@spo/lib/validator';
import IconX from '../common/icon-x';
import ButtonMain from '../common/button-main';

const Section11 = (props) => {
    const {
        showButtons,
        sectionTitle,
        handleSubmit,
        handleStepActive,
        handleDataSubmit,
        step = 0,
    } = props;
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
        data?.length > 0 &&
      data?.map((item, index) => {
          item['Salary'] = Number(item['Salary']);
      });
        handleDataSubmit(data);
        handleStepActive(12);
    };
    return (
        <div
            className={`recruitment-form--section bordered-right bordered-right--section11 ${
                step > 11 && 'active'
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
                        id={`CandidateExperiences[${index}][CompanyName]`}
                        label="Tên công ty"
                        placeholder="Nhập tên công ty"
                        name={`CandidateExperiences[${index}][CompanyName]`}
                        component={RenderInput}
                        type="text"
                    />
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            justifyContent: 'center',
                        }}>
                        <div style={{ width: '50%', paddingRight: 5 }}>
                            <Field
                                id={`CandidateExperiences[${index}][TimeStart]`}
                                label="Thời gian bắt đầu"
                                name={`CandidateExperiences[${index}][TimeStart]`}
                                component={RenderDatePicker}
                                validate={[Validator.validateMinDate]}
                            />
                        </div>
                        <div style={{ width: '50%', paddingLeft: 5 }}>
                            <Field
                                id={`CandidateExperiences[${index}][TimeEnd]`}
                                label="Thời gian kết thúc"
                                name={`CandidateExperiences[${index}][TimeEnd]`}
                                component={RenderDatePicker}
                                validate={[Validator.validateMinDate]}
                            />
                        </div>
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            justifyContent: 'center',
                        }}>
                        <div style={{ flex: 1, paddingRight: 5 }}>
                            <Field
                                id={`CandidateExperiences[${index}][Position]`}
                                label="Vị trí công việc"
                                placeholder="Nhập vị trí công việc"
                                name={`CandidateExperiences[${index}][Position]`}
                                component={RenderInput}
                                type="text"
                            />
                        </div>
                        <div style={{ flex: 1, paddingLeft: 5 }}>
                            <Field
                                id={`CandidateExperiences[${index}][Salary]`}
                                label="Mức lương"
                                placeholder="Chọn mức lương"
                                name={`CandidateExperiences[${index}][Salary]`}
                                component={RenderInput}
                                icon="range"
                                validate={[Validator.number]}
                            />
                        </div>
                    </div>
                    <Field
                        id={`CandidateExperiences[${index}][Mission]`}
                        label="Nhiệm vụ & trách nhiệm cụ thể"
                        placeholder="Nhập nhiệm vụ & trách nhiệm cụ thể"
                        name={`CandidateExperiences[${index}][Mission]`}
                        component={RenderInput}
                        type="text"
                    />
                    <Field
                        id={`CandidateExperiences[${index}][ReasonLeavingJob]`}
                        label="Lý do thôi việc"
                        placeholder="Nhập lý do thôi việc"
                        name={`CandidateExperiences[${index}][ReasonLeavingJob]`}
                        component={RenderInput}
                        type="text"
                    />
                </div>
            ))}
            <button type="button" onClick={handleAdd} className="btn-add">
        + Thêm quá trình công tác
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
export default reduxForm({ form: 'Section11Form' })(Section11);
