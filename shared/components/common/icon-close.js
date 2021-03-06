import React from 'react';

export default function IconClose(props) {
    return (
        <div className="d-center">
            <svg
                fontSize={props.fontSize ?? 20}
                width="1em"
                height="1em"
                viewBox="0 0 16 16"
                className="bi bi-dash-square"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg">
                <path
                    fillRule="evenodd"
                    d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"
                />
                <path
                    fillRule="evenodd"
                    d="M3.5 8a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.5-.5z"
                />
            </svg>
        </div>
    );
}
