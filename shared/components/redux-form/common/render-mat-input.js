import { PropTypes } from 'prop-types';
import React,{ useRef } from 'react';


/**
 * ****************************************************************************
 * DUNGNT RenderMatInput CODE
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
function RenderMatInput(props) {
    const {
        label = 'Label',
        readonly,
        autoComplete,
        input,
        placeholder,
        type,
        maxLength,
        iconClass,
        className,
        meta: { touched, error, submitFailed, pristine },
    } = props;
    const ref = useRef(null)
    // const showError = submitFailed && touched && error;
    const showError = touched && error;
    const handleOnClick = () =>{
        if(typeof props.onClick == 'function'){
            props?.onClick()
        }else{
            ref.current.focus()
        }
    }
    return (
        <div
            onClick={handleOnClick}
            className={`mat-input position-relative ${
                showError ? 'error' : ''
            } ${readonly ? 'readonly' : ''}`}>
            <div className="position-relative wrap_input">
                <label htmlFor="">{label}</label>
                <input
                    ref={ref}
                    readOnly={readonly}
                    tabIndex={0}
                    id={input.name}
                    autoComplete={autoComplete.toString()}
                    type={type ?? 'text'}
                    {...input}
                    className={`w-100 ${className}`}
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
RenderMatInput.propTypes = {
    autoComplete: PropTypes.bool,
    input: PropTypes.object,
    placeholder: PropTypes.string,
    type: PropTypes.string,
    meta: PropTypes.object,
    maxLength: PropTypes.number,
    readonly: PropTypes.bool,
};
RenderMatInput.defaultProps = {
    autoComplete: true,
    placeholder: 'Nhập ...',
    type: 'text',
    maxLength: -1,
    readonly: false,
};
export default RenderMatInput;
