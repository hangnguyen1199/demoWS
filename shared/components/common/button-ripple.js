import React from 'react';

function ButtonRipple(props) {
    const { tabIndex, className, fontSize, title, disabled, height, type } = props;
    function createRipple(event) {
        const button = event.currentTarget;

        const circle = document.createElement('span');
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;

        // eslint-disable-next-line no-multi-assign
        circle.style.width = circle.style.height = `${diameter}px`;
        // circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
        // circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
        circle.style.left = 0;
        circle.style.top = 0;
        circle.classList.add('_ripple');

        const ripple = button.getElementsByClassName('_ripple')[0];

        if (ripple) {
            ripple.remove();
        }

        button.appendChild(circle);
    }
    const handleClick = (e) => {
        props.onClick(e);
    };
    return (
        <button
            disabled={props.disabled ?? false}
            type="button"
            className={`btn_ripple ${props.className ?? ''}`}
            onMouseDown={createRipple}
            onClick={handleClick}
        >
            <span>{title}</span>
        </button>
    );
}
export default ButtonRipple;
