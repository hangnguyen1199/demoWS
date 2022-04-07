import { PropTypes } from 'prop-types';
import React, { useRef, useState } from 'react';
import IconChevronDown from './icon-chevron-down';

function CustomCollapse(props) {
    const { header, body, defaultValue, fullHeight } = props;
    const [open, setOpen] = useState(defaultValue);
    const [maxHeight, setMaxHeight] = useState(
        defaultValue ? fullHeight ?? contentEle.current.offsetHeight : 0,
    );
    const contentEle = useRef(null);
    const onToggle = () => {
        if (!open) {
            if (fullHeight) {
                setMaxHeight(fullHeight);
            } else {
                setMaxHeight(contentEle.current.offsetHeight);
            }
        } else {
            setMaxHeight(0);
        }
        setOpen(!open);
    };

    return (
        <div className="custom-collapse">
            <div className={`_header  d-between ${open ? 'border_bttom' : ''}`}>
                <div className="  d-between">{header}</div>
                <div className="toggle-button link-hover" onClick={onToggle}>
                    <IconChevronDown
                        className={open ? 'rotate180' : 'rotate0'}
                    />
                </div>
            </div>
            <div
                className={`_body ${open ? 'open' : ''}`}
                style={{ maxHeight: maxHeight }}>
                <div className="_content" ref={contentEle}>
                    {body}
                </div>
            </div>
        </div>
    );
}
CustomCollapse.propTypes = {
    defaultValue: PropTypes.bool,
};
CustomCollapse.defaultProps = {
    defaultValue: false,
    header: <div>New CustomCollapse</div>,
    body: <div>New Body</div>,
    fullHeight: 0,
};
export default CustomCollapse;
