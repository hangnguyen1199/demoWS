import React, { useState } from 'react';
import { Field, reduxForm } from 'redux-form';
import RenderDatePicker from '@spo/components/redux-form/recruitment/render-datepicker';
import RenderInput from '@spo/components/redux-form/recruitment/render-input';
import RenderSelect from '@spo/components/redux-form/recruitment/render-select';
import * as Validator from '@spo/lib/validator';
import { useSelector } from 'react-redux';
import IconX from '../common/icon-x';
import ButtonMain from '../common/button-main';

const Section3 = (props) => {
    const {
        showButtons,
        sectionTitle,
        handleSubmit,
        handleStepActive,
        handleDataSubmit,
        step = 0,
    } = props;
    const { RelationMaster } = useSelector((state) => state.Common);
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
        handleStepActive(4);
    };
    return (
        <div
            className={`recruitment-form--section bordered-right bordered-right--section3 ${
                step > 3 && 'active'
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
                        id={`CandidateFamilies[${index}][Name]`}
                        label="H??? & T??n"
                        placeholder="Nh???p H??? & T??n ?????y ?????"
                        name={`CandidateFamilies[${index}][Name]`}
                        component={RenderInput}
                        type="text"
                        validate={[Validator.required]}
                    />
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            justifyContent: 'center',
                        }}>
                        <div style={{ flex: 1, paddingRight: 5 }}>
                            <Field
                                id={`CandidateFamilies[${index}][DateOfBirth]`}
                                label="N??m sinh"
                                name={`CandidateFamilies[${index}][DateOfBirth]`}
                                component={RenderDatePicker}
                                validate={[Validator.required, Validator.validateMinDate]}
                            />
                        </div>
                        <div style={{ flex: 1, paddingLeft: 5 }}>
                            <Field
                                id={`CandidateFamilies[${index}][Relationship]`}
                                placeholder="Ch???n m???i quan h???"
                                label="M???i quan h???"
                                name={`CandidateFamilies[${index}][Relationship]`}
                                component={RenderSelect}
                                masterData={RelationMaster}
                                field={['Name', 'Value']}
                                validate={[Validator.required]}
                            />
                        </div>
                    </div>
                    <Field
                        id={`CandidateFamilies[${index}][Job]`}
                        label="Ngh??? nghi???p"
                        name={`CandidateFamilies[${index}][Job]`}
                        component={RenderInput}
                        validate={[Validator.required]}
                    />
                    <Field
                        id={`CandidateFamilies[${index}][PlaceOfWord]`}
                        label="N??i c??ng t??c"
                        placeholder="Nh???p n??i c??ng t??c"
                        name={`CandidateFamilies[${index}][PlaceOfWord]`}
                        component={RenderInput}
                        type="text"
                        validate={[Validator.required]}
                    />
                </div>
            ))}
            <button type="button" onClick={handleAdd} className="btn-add">
        + Th??m th??nh vi??n
            </button>
            {showButtons && (
                <ButtonMain
                    title="Ti???p t???c"
                    className="btn-recruitment--continue"
                    type="button"
                    onClick={handleSubmit(onSubmit)}
                />
            )}
        </div>
    );
};
export default reduxForm({ form: 'Section3Form' })(Section3);
