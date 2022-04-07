import React from 'react';
import ButtonMain from './button-main';
import ButtonRipple from './button-ripple';

function ButtonPopup(props) {
    const { type, className } = props;
    const getClass = () => {
        if (type == 'main') {
            return 'button-main';
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
            <ButtonMain className={className} onClick={handleClick} title={props.title} />
        </div>
    );
}
export default ButtonPopup;
