import React from "react";
import constants from "../../config/constants";
import ButtonRipple from "./button-ripple";

function ButtonMain(props) {
    const { tabIndex, className, fontSize, title, disabled, height, type } = props;
    const handleClick = (e) => {
        props.onClick(e);
    };
    return (
        <ButtonRipple
            className={`btn-main-fm btn-none-border ${className} ${props.disabled ? 'disabled' : ''}`}
            onClick={handleClick}
            title={props.title}
        // fontSize={props.fontSize}
        />
    );
}
export default ButtonMain;
