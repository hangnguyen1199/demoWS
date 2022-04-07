import { PropTypes } from 'prop-types';
import React from 'react';

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
function RenderInput (props) {
    const {
        readonly,
        autoComplete,
        input,
        placeholder,
        type,
        maxLength,
        image,
        meta: { touched, error, submitFailed,pristine },
    } = props;
    // const showError = submitFailed && touched && error;
    const showError =   touched  && error;
    return (
        <div className={`render-input position-relative ${readonly ? "readonly" : ""}`}>
            <div className="position-relative">
                <input
                    className="signup-email"
                    readOnly={readonly}
                    autoComplete={autoComplete.toString()}
                    type={type ?? 'text'}
                    {...input}
                    placeholder={placeholder}
                    maxLength={maxLength ?? -1}
                />
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
