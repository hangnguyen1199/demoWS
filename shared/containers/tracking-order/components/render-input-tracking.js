import React from 'react'

export default function RenderInputTracking(props) {
    const { type = 'text', defaultValue, input, disable = false ,meta: { touched, error },} = props;
    return (
        <>
            <input type={type} placeholder={props.placeholder}  defaultValue={defaultValue} {...input} style={{ width: 340  }} />
        </>
    )
}
