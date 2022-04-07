import { PropTypes } from 'prop-types';
import React, { useEffect } from 'react';

/**
* ****************************************************************************
* DUNGNT RenderInput CODE
* render-input.js 
* 
* description		:	
* created at		:	2020-10-14 
* created by		:	DungNT 
* package			:	spo\shared\components\redux-form\common\render-input.js  
* copyright			:	Copyright (c) DungNT 
* version			:	1.0.0 
* ****************************************************************************
*/
function RenderInput(props) {
    const {
        readonly,
        autoComplete,
        input,
        placeholder,
        type,
        maxLength,
        iconClass,
        meta: { touched, error, submitFailed, pristine },
    } = props;
    // const showError = submitFailed && touched && error;
    const showError = touched && error;
    useEffect(() => {
        if (input.value !== "") {
            $(".input-effect input").addClass("has-content");
        }
    }, [input.value]);
    return (
        <div className={`render-input position-relative ${readonly ? "readonly" : ""}`}>
            <div className=" input-effect">
                <input className={`render-input-field ${input.value !== "" ? "has-content" : ""}`} type="text" placeholder="" />
                <label>{placeholder}</label>
                <span className="focus-border"></span>
            </div>
            <div className={`error-float ${showError ? '' : 'd-none'} `}>
                <div className="wrap _shadow1">
                    <span className="text-error">{error}</span>
                </div>
            </div>
        </div>
    );
}
RenderInput.propTypes = {
    autoComplete: PropTypes.bool,
    input: PropTypes.object,
    placeholder: PropTypes.string,
    type: PropTypes.string,
    meta: PropTypes.object,
    maxLength: PropTypes.number,
    readonly: PropTypes.bool,
};
RenderInput.defaultProps = {
    autoComplete: true,
    placeholder: 'Nhập ...',
    type: 'text',
    maxLength: -1,
    readonly: false,
};
export default RenderInput;
