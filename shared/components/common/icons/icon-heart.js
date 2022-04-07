import React from 'react';

function IconHeart(props) {
    const {widthLine="1.8"}=props;
    return (
        <div className="icon-heart d-center">
            <svg
                style={{ fontSize: props.fontSize ?? 20 }}
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 40.702 40.702">
                <path
                    id="Path_18149"
                    d="M24.118,43.569l-5.577-4.427a68.2,68.2,0,0,1-5.542-5C9.12,30.226,4.667,24.764,4.667,17.28c0-6.966,4.6-12.613,10.272-12.613,4.013,0,7.488,2.825,9.179,6.944,1.691-4.119,5.166-6.944,9.179-6.944,5.673,0,10.272,5.647,10.272,12.613,0,7.484-4.453,12.946-8.333,16.867a68.2,68.2,0,0,1-5.542,5Z"
                    transform="translate(-3.767 -3.767)"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={widthLine}
                />
            </svg>
        </div>
    );
}
export default IconHeart;
