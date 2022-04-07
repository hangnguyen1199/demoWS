import React from 'react';

export default function Divider(props) {
    return (
        <div
            className="w-100 border-bottom-1"
            style={{ borderColor: props.color ?? '' }}></div>
    );
}
