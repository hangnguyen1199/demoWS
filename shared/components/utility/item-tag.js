import React from 'react';
import PropTypes from 'prop-types';

const ItemTag = props => {
    return (
        props.name !== '' &&
        <div className="item-tag" style={{ left: `${props.x}%`, top: `${props.y}%` }}>
            <div className="tag-content">
                {
                    <span onClick={() => { }} >
                        {props.name}
                        {
                            props.icon !== '' &&
                            <i className={props.icon}></i>
                        }
                    </span>
                }
                <div className="circle"></div>
                <div className="triangle"></div>
            </div>
        </div>
    );
};

ItemTag.propTypes = {
    name: PropTypes.string,
    x: PropTypes.number,
    y: PropTypes.number,
    icon: PropTypes.string,
    link: PropTypes.string
}

ItemTag.defaultProps = {
    name: '',
    x: 0,
    y: 0,
    icon: '',
    link: ''
}

export default ItemTag;