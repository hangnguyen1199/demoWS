import React from 'react';
import ContentLoader from 'react-content-loader';

const ImageLoader = (props) => (
    <ContentLoader
        className={`${props.className ?? ''}`}
        speed={2}
        width={props.width ?? 300}
        height={props.height ?? 400}
        viewBox="0 0 3 4"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        {...props}>
        <rect x="0" y="0" rx="0" ry="0" width="100%" height="100%" />
    </ContentLoader>
);

export default ImageLoader;
