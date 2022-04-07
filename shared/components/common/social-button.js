import React from 'react';

function SocialButton(props) {
    const { icon, link, title } = props;
    const onGoToLink = () => {
        props.onGoToLink();
    };
    return (
        <div className="social-button" onClick={onGoToLink}>
            <img src={icon} alt="" />
        </div>
    );
}
export default SocialButton;
