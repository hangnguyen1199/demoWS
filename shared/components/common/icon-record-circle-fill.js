import React from 'react';

function IconRecordCircleFill(props) {
    return (
        <div className="icon-record-circle-fill d-center">
            <svg
                style={{ fontSize: props.fontSize ?? 20 }}
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                fill="currentColor"
                className="bi bi-record-circle-fill"
                viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-8 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
            </svg>
        </div>
    );
}
export default IconRecordCircleFill;
