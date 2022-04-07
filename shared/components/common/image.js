import React from 'react';
import LazyLoad from 'react-lazyload';

/**
 * ****************************************************************************
 * DUNGNT Image CODE
 * image.js
 *
 * description		:
 * created at		:	2020-10-07
 * created by		:	DungNT
 * package			:	spo\shared\components\common\image.js
 * copyright			:	Copyright (c) DungNT
 * version			:	1.0.0
 * ****************************************************************************
 */
function Image(props) {
    const {
        width,
        height,
        className,
        src,
        defaultImage,
        style,
        seo = "fm.com.vn",
        srcset,
        sizes,
        lazyLoad,
        lazy_offset,
        lazy_height,
        lazy_placeholder,
    } = props;
    const onError = (e) => {
        e.target.onerror = null;
        e.target.src = defaultImage;
    };
    const onClick = () => {
        if (typeof props.onClick === 'function') {
            props.onClick();
        }
    };
    return lazyLoad ? (
        <LazyLoad
            height={lazy_height}
            offset={lazy_offset}
            placeholder={lazy_placeholder}>
            <img
                width={width}
                height={height}
                style={style}
                className={`object_fit_cover ${className ?? ''}`}
                src={src ?? defaultImage}
                onError={onError}
                onClick={onClick}
                alt={seo}
                title={seo}
                srcSet={srcset?.toString()}
                size={sizes}
            />
        </LazyLoad>
    ) : (
        <img
            width={width}
            height={height}
            style={style}
            className={`object_fit_cover ${className ?? ''}`}
            src={src?? defaultImage}
            onError={onError}
            onClick={onClick}
            alt={seo}
            title={seo}
            srcSet={srcset?.toString()}
            size={sizes}
        />
    );
}
Image.defaultProps = {
    defaultImage: '/images/icon/image_default.jpg',
    srcset: [],
    sizes: '',
    lazyLoad: true,
    lazy_offset: 400,
    lazy_height: 300,
    lazy_placeholder: <div>loading...</div>,
};
export default Image;
