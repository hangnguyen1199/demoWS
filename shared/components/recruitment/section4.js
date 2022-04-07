import React from 'react';
import { Field, reduxForm } from 'redux-form';
import RenderInput from '@spo/components/redux-form/recruitment/render-input';
import * as Validator from '@spo/lib/validator';
import ButtonMain from '../common/button-main';

const Section4 = (props) => {
    const {
        showButtons,
        sectionTitle,
        handleSubmit,
        handleStepActive,
        handleDataSubmit,
        step = 0,
    } = props;
    const onSubmit = (data) => {
        handleDataSubmit(data);
        handleStepActive(5);
    };
    return (
        <div
            className={`recruitment-form--section bordered-right bordered-right--section4 ${
                step > 4 && 'active'
            }`}>
            {sectionTitle && (
                <p className="recruitment-form--section-header">{sectionTitle}</p>
            )}
            <Field
                id="Personality"
                label="Tính cách"
                placeholder="Nhập tính cách"
                name="Personality"
                component={RenderInput}
                type="text"
                validate={[Validator.required]}
            />
            <Field
                id="Hobbies"
                label="Sở thích"
                placeholder="Nhập sở thích"
                name="Hobbies"
                component={RenderInput}
                type="text"
                validate={[Validator.required]}
            />
            <Field
                id="Strength"
                label="Điểm mạnh"
                placeholder="Nhập điểm mạnh"
                name="Strength"
                component={RenderInput}
                type="text"
                validate={[Validator.required]}
            />
            <Field
                id="Weakness"
                label="Điểm yếu"
                placeholder="Nhập điểm yếu"
                name="Weakness"
                component={RenderInput}
                type="text"
                validate={[Validator.required]}
            />
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
export default reduxForm({ form: 'Section4Form' })(Section4);
