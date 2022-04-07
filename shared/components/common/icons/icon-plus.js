import React from 'react';

function IconPlus(props) {
    return (
        <div className="_icon-plus d-center">
            <svg
                style={{ fontSize: props.fontSize ?? 20 }}
                xmlns="http://www.w3.org/2000/svg"
                color="currentColor"
                width="1em"
                height="1em"
                viewBox="0 0 19 19">
                <path
                    id="Icon_ionic-ios-add"
                    d="M26.782,17.282H19.648V10.148a1.183,1.183,0,1,0-2.366,0v7.134H10.148a1.183,1.183,0,0,0,0,2.366h7.134v7.134a1.183,1.183,0,1,0,2.366,0V19.648h7.134a1.183,1.183,0,1,0,0-2.366Z"
                    transform="translate(-8.965 -8.965)"
                    fill="currentColor"
                />
            </svg>
        </div>
    );
}
export default IconPlus;
