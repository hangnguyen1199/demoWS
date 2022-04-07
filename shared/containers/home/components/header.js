import React from 'react';

export default function Header(props) {
    
    return (
        <div className="announcement-bar">
            {props.data.map((notification) => (
                <p>{notification.title}</p>
            ))}
            
        </div>
    )
}
