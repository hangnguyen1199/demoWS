import React from 'react';
import { PropTypes } from 'prop-types';

/**
 * ****************************************************************************
 * DUNGNT RenderTextarea CODE
 * render-input.js
 *
 * description		:
 * created at		:	2020-07-30
 * created by		:	DungNT
 * package			:	spo\shared\components\redux-form\login\render-input.js
 * copyright			:	Copyright (c) DungNT
 * version			:	1.0.0
 * ****************************************************************************
 */

function RenderTextarea (props) {
    const {
        autoComplete,
        input,
        placeholder,
        type,
        maxLength,
        meta: { touched, error, submitFailed },
        className,
        rows
    } = props;
    const showError = submitFailed && touched && error;
    return (
        <div className="render-input position-relative">
            <div className="position-relative">
                <textarea
                    rows={rows}
                    tabIndex={0}
                    id={input.name}
                    autoFocus
                    autoComplete={autoComplete.toString()}
                    type={type ?? 'text'}
                    {...input}
                    className={`w-100 ${showError ? 'border-danger' : ''} ${className}`}
                    placeholder={placeholder}
                    maxLength={maxLength ?? -1}
                    style={{ paddingRight: 60 }}
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
                    {`${input.value.length} / ${props.maxLength}`}
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
RenderTextarea.propTypes = {
    autoComplete: PropTypes.bool,
    input: PropTypes.object,
    placeholder: PropTypes.string,
    type: PropTypes.string,
    meta: PropTypes.object,
    maxLength: PropTypes.number,
    className: PropTypes.string
};
RenderTextarea.defaultProps = {
    autoComplete: true,
    placeholder: 'Nh???p ...',
    type: 'text',
    maxLength: -1,
    className: "",
    rows:3
};
export default RenderTextarea;
