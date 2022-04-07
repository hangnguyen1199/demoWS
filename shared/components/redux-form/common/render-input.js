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
    return (
        <div className={`render-input position-relative ${readonly ? "readonly" : ""}`}>
            <div className="position-relative">
                <div
                    className="position-absolute d-start pl-3"
                    style={{
                        top: 0,
                        left: 0,
                        width: 60,
                        height: '100%',
                        fontSize: '25px',
                    }}>
                    <i className={iconClass} aria-hidden="true" style={{ color: '#9a9a9a' }}></i>
                </div>
                <input
                    readOnly={readonly}
                    tabIndex={0}
                    id={input.name}
                    autoComplete={autoComplete.toString()}
                    type={type ?? 'text'}
                    {...input}
                    className={`w-100 form-control ${showError ? 'border-danger error' : ''}`}
                    placeholder={placeholder}
                    maxLength={maxLength ?? -1}
                    style={{ paddingRight: 60, paddingLeft: 60 }}
                />
                <div
                    className="position-absolute d-end pr-2"
                    style={{
                        top: 0,
                        right: 0,
                        width: 60,
                        height: '100%',
                        fontSize: '0.7rem',
                    }}>
                    {`${input.value.length ?? 0} / ${props.maxLength}`}
                </div>
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
