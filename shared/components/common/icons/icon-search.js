import React from 'react';

function IconSearch(props) {
    const { width = '19.809', height = '18.809',padding,color='currentColor' } = props;
    return (
        <div  style={{padding:padding}} className="icon-search d-center">
            <svg
                fontSize={props.fontSize ?? 20}
                xmlns="http://www.w3.org/2000/svg"
                width={width}
                height={height}
                viewBox="0 0 19.809 18.809">
                <g transform="translate(0.75 0.75)">
                    <ellipse
                        cx="7.297"
                        cy="7.235"
                        rx="7.297"
                        ry="7.235"
                        fill="none"
                        stroke={color}
                        strokeWidth="1.5"
                    />
                    <path
                        d="M5.98,5.211.66.49"
                        transform="translate(12.02 11.789)"
                        fill="none"
                        stroke={color}
                        strokeWidth="1.5"
                    />
                </g>
            </svg>
        </div>
    );
}
export default IconSearch;
