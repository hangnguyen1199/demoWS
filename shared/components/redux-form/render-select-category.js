import React from 'react';
import SelectCategory from './../create-item-management/select-category';
import constants from '@spo/config/constants';

function RenderSelectCategory (props) {
    const {
        list,
        input,
        label,
        type,
        meta: { touched, error,submitFailed },
    } = props;
    const showError = submitFailed && touched && error;
    return (
        <div className="render-select-box position-relative">
            <div className="position-relative" id={input.name}>
                <SelectCategory  data={list}  {...input} mode={constants.SELECT_CATEGORY.MODE.ID} />
            </div>
            <div className={`error-float ${showError ? '' : 'd-none'} `}>
                <div className="wrap _shadow1">
                    <span className="text-error">{error}</span>
                </div>
            </div>
        </div>
    );
}
export default RenderSelectCategory;
