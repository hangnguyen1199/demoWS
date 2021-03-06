import React from 'react';

export function IconX(props) {
    return (
        <div onClick={props.onClick} className="d-center justify-content-center">
            <svg
                style={{
                    fontSize: props.fontSize ?? 20,
                    color: props.color ?? '#000',
                }}
                width="1em"
                height="1em"
                viewBox="0 0 16 16"
                className="bi bi-x"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg">
                <path
                    fillRule="evenodd"
                    d="M11.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708 0z"
                />
                <path
                    fillRule="evenodd"
                    d="M4.146 4.146a.5.5 0 0 0 0 .708l7 7a.5.5 0 0 0 .708-.708l-7-7a.5.5 0 0 0-.708 0z"
                />
            </svg>
        </div>
    );
}
export default IconX;
