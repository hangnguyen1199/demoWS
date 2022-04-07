import React from 'react';
import ContentLoader from 'react-content-loader';

const InformationLoader = (props) => (
    <ContentLoader
        speed={2}
        width={400}
        height={270}
        viewBox="0 0 400 270"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        {...props}>
        <rect x="-1" y="1" rx="0" ry="0" width="250" height="30" />
        <rect x="0" y="48" rx="0" ry="0" width="142" height="20" />
        <rect x="0" y="82" rx="0" ry="0" width="120" height="20" />
        <rect x="0" y="112" rx="0" ry="0" width="400" height="90" />
        <rect x="0" y="222" rx="0" ry="0" width="400" height="40" />
    </ContentLoader>
);

export default InformationLoader;
