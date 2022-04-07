import React from 'react';

export default function IconRectangle(props) {
    return (
        <div className="d-center">
            <svg
                fontSize={props?.fontSize ?? 11}
                xmlns="http://www.w3.org/2000/svg"
                width="11"
                height="11"
                viewBox="0 0 11 11"
            >
                <g
                    id="Rectangle_3358"
                    data-name="Rectangle 3358"
                    fill="none"
                    stroke="#707070"
                    strokeWidth="0.5"
                >
                    <rect width="11" height="11" rx="1" stroke="none" />
                    <rect
                        x="0.25"
                        y="0.25"
                        width="10.5"
                        height="10.5"
                        rx="0.75"
                        fill="none"
                    />
                </g>
            </svg>
        </div>
    );
}
