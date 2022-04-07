import React from 'react'

export default function IconFilter(props) {
    return (
        <div className={`d-center ${props.className ?? ""}`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 16.828 16.813">
                <path id="Icon_awesome-filter" data-name="Icon awesome-filter" d="M15.249,0H.751a.751.751,0,0,0-.53,1.28L6,7.061V13.5a.75.75,0,0,0,.32.614l2.5,1.749A.75.75,0,0,0,10,15.249V7.061l5.78-5.78A.751.751,0,0,0,15.249,0Z" transform="translate(0.414 0.4)" fill="none" stroke="currentColor" strokeWidth="0.8" />
            </svg>
        </div>
    )
}
