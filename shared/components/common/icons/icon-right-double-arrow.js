import React from 'react';

function IconRightDoubleArrow(props) {
    return (
        <div className="icon-right-double-arrow d-center">
            <svg
                style={{ fontSize: props.fontSize ?? 20 }}
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                fill="currentColor"
                className="bi bi-chevron-double-right"
                viewBox="0 0 16 16">
                <path
                    fillRule="evenodd"
                    d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708z"
                />
                <path
                    fillRule="evenodd"
                    d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708z"
                />
            </svg>
        </div>
    );
}
export default IconRightDoubleArrow;
