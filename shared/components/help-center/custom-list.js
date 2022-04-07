import React from 'react';
import Link from 'next/link';

const ArrowRightIcon = () => {
    return <img src="./images/icon/icon-right-arrow.svg" />;
};
const renderItem = (item) => {
    return (
        <Link href={item?.Href ? item?.Href : ''}>
            <div className="custom-list--item">
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    {item?.Icon && (
                        <div style={{ width: 30, marginRight: 10 }}>
                            {item?.Icon}
                        </div>
                    )}
                    <span className="name">{item?.Name}</span>
                </div>
                {item?.Value ?? (
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        {item?.BadgeNumber > 0 && (
                            <span>{item?.BadgeNumber.toString()}</span>
                        )}
                        <div style={{ width: 8 }}>
                            <ArrowRightIcon />
                        </div>
                    </div>
                )}
            </div>
        </Link>
    );
};

const CustomList = (props) => {
    const { list, header } = props;
    return (
        <div>
            {header && (
                <div className="help-center--section-header">{header}</div>
            )}
            {list.map((item, index) => (
                <React.Fragment key={index}>{renderItem(item)}</React.Fragment>
            ))}
        </div>
    );
};
export default CustomList;
