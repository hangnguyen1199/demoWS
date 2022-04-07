import React from 'react';
import PropTypes from 'prop-types';
import ItemTag from '@spo/components/utility/item-tag';

const ItemLager = (props) => {
    return (
        <div className="col-12 item grid-view-item style2">
            <div className="grid-view_image">
                <div className="d-between">
                    <h3>{props.name}</h3>
                    <span>{props.moreInfor}</span>
                </div>
                <a onClick={() => {}} className="grid-view-item__link">
                    <img
                        className="grid-view-item__image blur-up ls-is-cached lazyloaded"
                        src={props.image}
                        alt={props.name}
                        title={props.name}
                    />
                    {props.tags.map((tag, index) => (
                        <ItemTag {...tag} key={index} />
                    ))}
                </a>
            </div>
        </div>
    );
};

ItemLager.propTypes = {
    id: PropTypes.number,
    name: PropTypes.string,
    moreInfor: PropTypes.string,
    image: PropTypes.string,
    tags: PropTypes.array,
};

ItemLager.defaultProps = {
    id: 0,
    name: '',
    moreInfor: '',
    image: '',
    tags: [],
};

export default ItemLager;
