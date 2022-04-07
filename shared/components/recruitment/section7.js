import React from 'react';
import { Field, reduxForm } from 'redux-form';
import RenderInput from '@spo/components/redux-form/recruitment/render-input';
import ButtonMain from '../common/button-main';

const Section7 = (props) => {
    const {
        sectionTitle,
        showButtons,
        handleSubmit,
        handleStepActive,
        handleDataSubmit,
        step = 0,
    } = props;

    const onSubmit = (data) => {
        handleDataSubmit(data);
        handleStepActive(8);
    };
    return (
        <div
            className={`recruitment-form--section bordered-right bordered-right--section7 ${
                step > 7 && 'active'
            }`}>
            {sectionTitle && (
                <p className="recruitment-form--section-header">{sectionTitle}</p>
            )}
            <Field
                id="Achievements"
                label="Thành tích nổi bật"
                placeholder="Nhập thành tích nổi bật"
                name="Achievements"
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
export default reduxForm({ form: 'Section7Form' })(Section7);
