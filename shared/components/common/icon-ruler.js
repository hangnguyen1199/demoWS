import React from 'react';

function IconRuler(props) {
    return (
        <div className="icon-ruler1 d-center">
            <svg
                title={props.title}
                style={{ fontSize: props.fontSize ?? 20 }}
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-bookshelf"
                viewBox="0 0 16 16">
                <path d="M2.5 0a.5.5 0 0 1 .5.5V2h10V.5a.5.5 0 0 1 1 0v15a.5.5 0 0 1-1 0V15H3v.5a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 .5-.5zM3 14h10v-3H3v3zm0-4h10V7H3v3zm0-4h10V3H3v3z" />
            </svg>
        </div>
    );
}
export default IconRuler;
