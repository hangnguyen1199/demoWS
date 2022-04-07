import React from 'react';

export default function IconHeart(props) {
    return (
        <div className="d-center">
            <svg style={{ fontSize: props.fontSize ?? 20 }} xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26">
                <path id="Path_23620" data-name="Path 23620" d="M57.5,25.5l-3.584-2.845a43.659,43.659,0,0,1-3.561-3.21C47.862,16.925,45,13.415,45,8.6,45,4.129,47.956.5,51.6.5a6.612,6.612,0,0,1,5.9,4.463A6.612,6.612,0,0,1,63.4.5C67.044.5,70,4.129,70,8.6c0,4.81-2.862,8.32-5.355,10.84a43.659,43.659,0,0,1-3.561,3.21Z" transform="translate(-44.5)" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="1" />
            </svg>

        </div>
    );
}
