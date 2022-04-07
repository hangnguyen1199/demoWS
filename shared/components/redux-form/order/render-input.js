import React from 'react';

const RenderInput = (props) => {
    const {
        placeholder,
        input,
        label,
        meta: { touched, error },
        maxLength,
        icon,
        inputIcon,
        className,
    } = props;
    const showError = touched && error;
    return (
        <div className={`form-input--wrapper`}>
            <div
                className={`${
                    showError && 'border-error'
                } render-input position-relative`}>
                {label && <label htmlFor={input?.name}>{label}</label>}
                <div className="d-center">
                    <div className="position-relative">
                        <div className="d-center">
                            <input
                                {...input}
                                className={`${className}`}
                                placeholder={placeholder}
                                maxLength={maxLength ?? -1}
                            />
                            {inputIcon && <span>input Icon</span>}
                        </div>
                    </div>
                    {icon && <span>{icon}</span>}
                </div>
                <div className={`error-float ${showError ? '' : 'd-none'} `}>
                    <div className="wrap _shadow1">
                        <span className="text-error">{error}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
RenderInput.defaultProps = {
    placeholder: 'Nhập',
};
export default RenderInput;
