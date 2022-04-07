import React from 'react';
/**
 * ****************************************************************************
 * DUNGNT RenderInput CODE
 * render-input.js
 *
 * description		:
 * created at		:	2020-07-19
 * created by		:	DungNT
 * package			:	spo\shared\components\redux-form\render-input.js
 * copyright			:	Copyright (c) DungNT
 * version			:	1.0.0
 * ****************************************************************************
 */

function RenderInput (props) {
    const {
        placeholder,
        input,
        label,
        type,
        icon,
        meta: { touched, error },
        readonly= false,
    } = props;
    return (
        <div className="render-input position-relative">
            <div className="position-relative" >
                <input
                    {...input}
                    id={input.name}
                    readOnly={readonly}
                    className="w-100 form-control"
                    placeholder={placeholder}
                    maxLength={props.maxLength ?? -1}
                    style={{ paddingRight: 60 }}
                ></input>
                <div
                    className="position-absolute d-center"
                    style={{
                        top: 0,
                        right: 0,
                        width: 60,
                        height: '100%',
                    }}>
                    {`${input.value.length} / ${props.maxLength}`}
                </div>
            </div>
            <div style={{ position: 'absolute', top: 40, right: 0 }}>
                {touched && error && (
                    <span className="text-error">{error}</span>
                )}
            </div>
        </div>
    );
}
RenderInput.defaultProps = {
    placeholder:"Nhập"
}
export default RenderInput;
