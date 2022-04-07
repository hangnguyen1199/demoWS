import React from 'react';
import ButtonRipple from './button-ripple';

function ButtonPopupWhite(props) {
    const { type } = props;
    const getClass = () => {
        if (type == 'main') {
            return 'button-light';
        } else if (type == 'light') {
            return 'button-light';
        }
    };
    const handleClick = (e) => {
        props.onClick();
    };
    return (
        <div
            className={`custom-button button-popup ${getClass()}`}
            style={props.style}>
            <ButtonRipple
                className="button-popup-cancel-white"
                onClick={handleClick}
                title={props.title}
            />
        </div>
    );
}
export default ButtonPopupWhite;
