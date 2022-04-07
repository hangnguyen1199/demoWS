import React from 'react';
import { Field, reduxForm } from 'redux-form';
import RenderInput from '@spo/components/redux-form/recruitment/render-input';
import ButtonMain from '../common/button-main';

const Section9 = (props) => {
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
        handleStepActive(10);
    };

    return (
        <div
            className={`recruitment-form--section bordered-right bordered-right--section9 ${
                step > 9 && 'active'
            }`}>
            {sectionTitle && (
                <p className="recruitment-form--section-header">{sectionTitle}</p>
            )}
            <Field
                id="ITskill"
                label="Kỹ năng tin học"
                placeholder="Nhập kỹ năng tin học"
                name="ITskill"
                component={RenderInput}
                type="text"
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
export default reduxForm({ form: 'Section9Form' })(Section9);
