import React from 'react';
import IconChevronDown from './icon-chevron-down';
import IconChevronUp from './icon-chevron-up';

export default function LoadMoreLeftSide(props) {
    const active = props.active;
    return (
        <div className="w-100 text-center d-flex justify-content-md-start align-items-left">
            {active == true ? (
                <a
                    className="w-100 link-hover load-button d-flex justify-content-between align-items-center"
                    onClick={() => {
                        props.onLoadMore();
                    }}>
                    Xem thêm
                    <IconChevronDown />
                    {/* <span
                        className="fas fa-chevron-down"
                        style={{ fontSize: 12 }}></span> */}
                </a>
            ) : (
                <a
                    className="w-100 link-hover load-button d-flex justify-content-between align-items-center"
                    onClick={() => {
                        props.onLoadLimit();
                    }}>
                    Thu gọn
                    <IconChevronUp/>
                </a>
            )}
        </div>
    );
}
