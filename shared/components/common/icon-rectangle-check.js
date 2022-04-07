import React from 'react';

export default function IconRectangleCheck(props) {
    return (
        <div className='d-center'>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 11 11"
                fontSize={props?.fontSize ?? 11}
            >
                <g
                    id="Group_12927"
                    transform="translate(-0.268 -0.268)"
                >
                    <rect
                        id="Rectangle_2685"
                        data-name="Rectangle 2685"
                        width="11"
                        height="11"
                        rx="1"
                        transform="translate(0.268 0.268)"
                        fill="#ff2c00"
                    />
                    <path
                        id="Icon_material-check"
                        d="M7.868,13.6,5.814,11.542l-.7.694,2.753,2.753,5.91-5.91-.694-.694Z"
                        transform="translate(-3.679 -5.92)"
                        fill="#fff"
                        stroke="#fff"
                        strokeWidth="0.2"
                    />
                </g>
            </svg>
        </div>
    );
}
