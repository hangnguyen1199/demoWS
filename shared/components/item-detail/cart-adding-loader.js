import React from 'react';
import ContentLoader from 'react-content-loader';

const CartAddingLoader = (props) => (
    <ContentLoader
        speed={2}
        width={400}
        height={300}
        viewBox="0 0 400 300"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        {...props}>
        <rect x="0" y="1" rx="0" ry="0" width="158" height="20" />
        <rect x="-1" y="36" rx="0" ry="0" width="218" height="20" />
        <rect x="0" y="73" rx="0" ry="0" width="120" height="20" />
        <rect x="-1" y="108" rx="0" ry="0" width="212" height="21" />
        <rect x="0" y="257" rx="0" ry="0" width="400" height="40" />
        <rect x="-2" y="206" rx="0" ry="0" width="400" height="40" />
        <rect x="-3" y="164" rx="0" ry="0" width="129" height="31" />
    </ContentLoader>
);

export default CartAddingLoader;
