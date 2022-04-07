import React, { useEffect, useState } from 'react';
import ContentLoader from 'react-content-loader';

function CustomLoader (props) {
    const [width, setWidth] = useState(0)
    useEffect(() => {
        if (typeof window !== 'undefined') {
            setWidth(window.innerWidth)
        }

    }, [])
    return (
        <div className="CustomLoader d-center w-100">
            {/* <ContentLoader
                speed={2}
                width={300}
                height={400}
                viewBox="0 0 300 400"
                backgroundColor="#f3f3f3"
                foregroundColor="#ecebeb"
                {...props}
            >
                <circle cx="150" cy="174" r="31" />
                <rect x="0" y="0" rx="0" ry="0" width="50" height="400" />
                <rect x="250" y="0" rx="0" ry="0" width="50" height="400" />
                <rect x="0" y="0" rx="0" ry="0" width="300" height="80" />
                <rect x="0" y="270" rx="0" ry="0" width="300" height="200" />
                <rect x="90" y="130" rx="0" ry="0" width="10" height="95" />
                <rect x="200" y="130" rx="0" ry="0" width="10" height="95" />
                <rect x="90" y="120" rx="0" ry="0" width="120" height="10" />
                <rect x="90" y="216" rx="0" ry="0" width="120" height="10" />
            </ContentLoader> */}
            <ContentLoader
                speed={2}
                width={width}
                height={width * 4/3}
                viewBox={`0 0 ${width} ${width * 4/3}`}
                backgroundColor="#f3f3f3"
                foregroundColor="#ecebeb"
                {...props}
            >
                <rect x="0" y="0" rx="0" ry="0" width={width} height={width * 4/3} />
            </ContentLoader>
        </div>
    )
}
export default CustomLoader;