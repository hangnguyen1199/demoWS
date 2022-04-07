import React, { useState } from 'react';

const IncDecButton = (props) => {
    const [value, setValue] = useState(1);
    const clickIncrease = () => {
        setValue(value + 1)
    };
    const clickDecrease = () => {
        if(value > 0)
        {setValue(value - 1)}
    };
    return (
        <div className="wrapQtyBtn">
            <div className="qtyField">
                <span className="label">Qty:</span>
                <a className="qtyBtn minus" onClick={clickDecrease}><i className="fa anm anm-minus-r" aria-hidden="true"></i></a>
                <input type="text" id="Quantity" name="quantity" value={value} className="product-form__input qty" readOnly/>
                <a className="qtyBtn plus" onClick={clickIncrease}><i className="fa anm anm-plus-r" aria-hidden="true"></i></a>
            </div>
        </div>
    )
}

export default IncDecButton;