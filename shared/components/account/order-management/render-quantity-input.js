import { useState } from "react";

const RenderQuantityInput = (props) => {
    const { defaultValue, input } = props;
    const [num, setNum] = useState(defaultValue);
    const onDecrease = () => {
        if (num > 0) {
            let temp = num - 1;
            setNum(temp);
            input.onChange(temp);
        }
    };
    const onIncrease = () => {
        if (num < defaultValue) {
            let temp = num + 1;
            setNum(temp);
            input.onChange(temp);
        }
    };

    return (
        <div className="btn-order-container">
            <button onClick={onDecrease} className="btn-red cursor-pointer">
                -
            </button>
            <div className="btn-count">{num}</div>
            <button onClick={onIncrease} className="btn-se cursor-pointer">
                +
            </button>
        </div>
    );
};
export default RenderQuantityInput;
