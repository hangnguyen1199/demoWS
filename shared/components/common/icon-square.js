import React from 'react';

export default function IconSquare (props) {
    return (
        <div className="d-center" style={{ fontSize: props.fontSize ?? 20 }}>
            <svg

                width="1em"
                height="1em"
                viewBox="0 0 16 16"
                className="bi bi-square"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg">
                <path
                    fillRule="evenodd"
                    d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"
                />
            </svg>
        </div>
    );
}
