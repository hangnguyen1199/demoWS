import React from 'react';
import { Field, reduxForm } from 'redux-form';
import RenderInput from '@spo/components/redux-form/recruitment/render-input';
import ButtonMain from '../common/button-main';

const Section10 = (props) => {
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
        handleStepActive(11);
    };
    return (
        <div
            className={`recruitment-form--section bordered-right bordered-right--section10 ${
                step > 10 && 'active'
            }`}>
            {sectionTitle && (
                <p className="recruitment-form--section-header">{sectionTitle}</p>
            )}
            <Field
                id="SpecialSkill"
                placeholder="Nhập tóm tắt các phẩm chất & kỹ năng đặc biệt"
                name="SpecialSkill"
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
export default reduxForm({ form: 'Section10Form' })(Section10);
