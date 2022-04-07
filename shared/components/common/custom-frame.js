import React from 'react';

function CustomFrame(props) {
    const { ratio } = props;
    return (
        <div
            className="container-raito"
            style={{ paddingTop: `${ratio * 100}%` }}>
            <div className={`raito ${props?.className ?? ""}`}>{props.children}</div>
        </div>
    );
}
export default CustomFrame;
