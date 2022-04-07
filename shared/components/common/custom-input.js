import React, { useEffect } from 'react';
import { findDOMNode } from 'react-dom';

function CustomInput(props) {
    const {
        input: { onChange, name },
        setRef,
        type,
        className,
        placeholder,
        errorMess,
    } = props;
    useEffect(() => {
        let element = findDOMNode(setRef.current);
        element.addEventListener('animationend', (e) => {
            element.classList.remove('apply-shake');
        });
    }, []);
    return (
        <div className="custom-input">
            <input
                name={name}
                onChange={onChange}
                type={type}
                ref={setRef}
                placeholder={placeholder}
                type={props.type}
                className={className}
            />
            {errorMess && (
                <div className="_error_mess error-float">
                    <div className="wrap">{errorMess}</div>
                </div>
            )}
        </div>
    );
}
CustomInput.defaultProps = {
    type: 'text',
    className: '',
    placeholder: 'Nhập ...',
};
export default CustomInput;
