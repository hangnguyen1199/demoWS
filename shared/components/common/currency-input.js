import React, { useEffect } from 'react';
import { findDOMNode } from 'react-dom';
import MaskedInput from 'react-text-mask';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';

const defaultMaskOptions = {
    prefix: '',
    suffix: ' đ',
    includeThousandsSeparator: true,
    thousandsSeparatorSymbol: ',',
    allowDecimal: false,
    decimalSymbol: '.',
    decimalLimit: 2, // how many digits allowed after the decimal
    integerLimit: 10, // limit length of integer numbers
    allowNegative: false,
    allowLeadingZeroes: false,
};
function CurrencyInput(props) {
    const {
        input,
        setRef,
        type,
        className,
        placeholder,
        errorMess,
        maskOptions,
        defaultValue
    } = props;
    useEffect(() => {
        if (setRef) {
            let element = findDOMNode(setRef.current);
            element.addEventListener('animationend', (e) => {
                element.classList.remove('apply-shake');
            });
        }
    }, []);
    const currencyMask = createNumberMask({
        ...defaultMaskOptions,
        ...maskOptions,
    });
    const onBlur = (e)=>{
        if(typeof props.onBlur == "function"){
            props.onBlur(0)
        }
    }
    return (
        <div className="currency-input">
            <MaskedInput
                onBlur={onBlur}
                mask={currencyMask}
                className={className}
                ref={setRef}
                placeholder={placeholder}
                defaultValue = {defaultValue}
                value={defaultValue}
            />
        </div>
    );
}
CurrencyInput.defaultProps = {
    type: 'text',
    className: '',
    placeholder: 'Nhập ...',
    maskOptions: {},
};
export default CurrencyInput;
