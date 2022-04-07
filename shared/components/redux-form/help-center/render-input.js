const RenderInput = (props) => {
    const {
        readonly,
        icon,
        input,
        autoComplete,
        typeInput,
        placeholder,
        maxLength,
        meta: { touched, error, submitFailed },
    } = props;
    const showError = touched && error;
    return (
        <div
            className={`render-input position-relative ${
                readonly ? 'readonly' : ''
            }`}>
            <div className="position-relative">
                <input
                    readOnly={readonly}
                    tabIndex={0}
                    id={input.name}
                    autoFocus
                    autoComplete={autoComplete?.toString()}
                    type={typeInput}
                    {...input}
                    className={`w-100 ${showError ? 'border-danger' : ''}`}
                    placeholder={placeholder}
                    maxLength={maxLength ?? -1}
                    style={{ paddingRight: 60 }}
                />
                <div
                    className="position-absolute d-end pr-2"
                    style={{
                        top: 0,
                        right: 0,
                        width: 40,
                        fontSize: '0.7rem',
                    }}>
                    <div className="render-input-icon">
                        <button>{icon && icon}</button>
                    </div>
                </div>
            </div>
            <div className={`error-float ${showError ? '' : 'd-none'} `}>
                <div className="wrap _shadow1">
                    <span className="text-error">{error}</span>
                </div>
            </div>
        </div>
    );
};

export default RenderInput;
