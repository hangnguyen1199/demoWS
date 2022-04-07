import React from 'react';
import { useDispatch } from 'react-redux';
import { openNewTab } from '../../library/helper';
import SocialButton from './social-button';

function SocialLinking(props) {
    const { list } = props;
    const onGoToLink = (link) => {
        openNewTab(link);
    };
    return (
        <div className="social-linking">
            {list.map((item,index) => {
                return (
                    <div key={index} className="p-1">
                        <SocialButton
                            icon={item.icon}
                            link={item.link}
                            onGoToLink={onGoToLink}
                        />
                    </div>
                );
            })}
        </div>
    );
}
SocialLinking.defaultProps = {
    list: [
        { icon: '/images/config/icon_facebook.png', link: '', title: '' },
        { icon: '/images/config/icon_zalo.png', link: '', title: '' },
    ],
};
export default SocialLinking;
