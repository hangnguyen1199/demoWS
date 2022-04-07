import React, { useState } from 'react';
import { Field, reduxForm } from 'redux-form';
import RenderDatePicker from '@spo/components/redux-form/recruitment/render-datepicker';
import RenderInput from '@spo/components/redux-form/recruitment/render-input';
import RenderSelect from '@spo/components/redux-form/recruitment/render-select';
import * as Validator from '@spo/lib/validator';
import IconX from '../common/icon-x';
import ButtonMain from '../common/button-main';

const Section12 = (props) => {
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
        handleDataSubmit(data);
        handleStepActive(13);
    };
    return (
        <div
            className={`recruitment-form--section bordered-right bordered-right--section12 ${
                step > 12 && 'active'
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
                        id={`CandidateReferences[${index}][PersonName]`}
                        label="Họ & Tên người tham chiều"
                        placeholder="Nhập Họ & Tên người tham chiếu"
                        name={`CandidateReferences[${index}][PersonName]`}
                        component={RenderInput}
                        type="text"
                    />
                    <Field
                        id={`CandidateReferences[${index}][CompanyName]`}
                        label="Đơn vị công tác"
                        placeholder="Nhập đơn vị công tác"
                        name={`CandidateReferences[${index}][CompanyName]`}
                        component={RenderInput}
                        type="text"
                    />
                    <Field
                        id={`CandidateReferences[${index}][Position]`}
                        label="Chức vụ"
                        placeholder="Nhập chức vụ"
                        name={`CandidateReferences[${index}][Position]`}
                        component={RenderInput}
                        type="text"
                    />
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            justifyContent: 'center',
                        }}>
                        <div style={{ flex: 1, paddingRight: 5 }}>
                            <Field
                                id={`CandidateReferences[${index}][Email]`}
                                label="Email"
                                placeholder="Nhập email"
                                name={`CandidateReferences[${index}][Email]`}
                                component={RenderInput}
                                type="text"
                                validate={[Validator.emailOrPhone]}
                            />
                        </div>
                        <div style={{ flex: 1, paddingLeft: 5 }}>
                            <Field
                                id={`CandidateReferences[${index}][Phone]`}
                                label="Số điện thoại"
                                placeholder="Nhập số điện thoại"
                                name={`CandidateReferences[${index}][Phone`}
                                component={RenderInput}
                                type="text"
                                validate={[Validator.phone]}
                            />
                        </div>
                    </div>
                </div>
            ))}
            <button type="button" onClick={handleAdd} className="btn-add">
        + Thêm người tham chiếu
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
export default reduxForm({ form: 'Section12Form' })(Section12);
