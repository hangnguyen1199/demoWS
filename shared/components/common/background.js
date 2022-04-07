import React from 'react';

/**
 * ****************************************************************************
 * DUNGNT Background CODE
 * background.js
 *
 * description		:
 * created at		:	2020-10-07
 * created by		:	DungNT
 * package			:	spo\shared\components\common\background.js
 * copyright			:	Copyright (c) DungNT
 * version			:	1.0.0
 * ****************************************************************************
 */
function Background(props) {
    const { className, src, defaultImage } = props;
    return (
        <div
            className={`background ${className}`}
            style={{ background: `url(${src}),url(${defaultImage})` }}>
            {props.children}
        </div>
    );
}
Background.defaultProps = {
    defaultImage: '/images/config/shop_default.jpg',
};
export default Background;
