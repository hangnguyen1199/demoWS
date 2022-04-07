import React from 'react';

function LineX(props) {
    return (
        <div className={`line-x ${props.className}`}>
            <svg width="100%" height="100%">
                <line y1="100%" x2="100%" stroke="#DADADA"></line>
                <line
                    y1="100%"
                    x2="100%"
                    stroke="#1B1B1B"
                    strokeOpacity="0.6"
                    transform="translate(.5 .5)"></line>
            </svg>
        </div>
    );
}
LineX.defaultProps = {
    className: '',
};
export default LineX;
