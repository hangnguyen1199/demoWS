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
                        label="Tr?????ng/????n v??? ????o t???o"
                        placeholder="Nh???p Tr?????ng/????n v??? ????o t???o"
                        name={`CandidateEducations[${index}][School]`}
                        component={RenderInput}
                        type="text"
                    />
                    <Field
                        id={`CandidateEducations[${index}][ContentOfStudy]`}
                        label="N???i dung ????o t???o"
                        placeholder="Nh???p n???i dung ????o t???o"
                        name={`CandidateEducations[${index}][ContentOfStudy]`}
                        component={RenderInput}
                        type="text"
                    />
                    <Field
                        id={`CandidateEducations[${index}][Type]`}
                        label="B???ng c???p/Ch???ng ch???"
                        name={`CandidateEducations[${index}][Type]`}
                        masterData={DegreeMaster}
                        component={RenderCheckbox}
                        type="text"
                    />
                    <Field
                        id={`CandidateEducations[${index}][Ranking]`}
                        placeholder="Ch???n x???p lo???i"
                        label="X???p lo???i"
                        name={`CandidateEducations[${index}][Ranking]`}
                        component={RenderSelect}
                        field={['Name', 'Value']}
                        masterData={DegreeOfTypeMaster}
                        type="text"
                    />
                </div>
            ))}
            <button type="button" onClick={handleAdd} className="btn-add">
        + Th??m kho?? hu???n luy???n, ????o t???o kh??c
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
export default reduxForm({ form: 'Section6Form' })(Section6);
