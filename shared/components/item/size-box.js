import PropTypes from 'prop-types';
import React from 'react';
import constants from './../../config/constants';
import SizeItem from './size-item';
import IconRuler from '@spo/components/common/icon-ruler';
import { useDispatch } from 'react-redux';
import ItemDetailActions from '@spo/redux/item-detail/action';

export default function SizeBox(props) {
    const { sizes, active } = props;
    const onChangeSize = (SizeId) => {
        props.onChangeSize(SizeId);
    };
    return (
        <>
            <div className="wrap">
                <span className="title" style={{paddingBottom: 20, fontWeight: 500, fontSize: 16}}>Kích thước </span>
                <div className="size-box-grid">
                    {sizes?.map((element, index) => {
                        return (
                            <SizeItem
                                key={index}
                                active={element.SizeId == active}
                                item={element}
                                onChange={() => onChangeSize(element.SizeId)}
                                name={element.Name}
                            />
                        );
                    })}
                </div>
            </div>
            
        </>
    );
}
SizeBox.propTypes = {
    sizes: PropTypes.array,
    active: PropTypes.number,
    onChangeSize: PropTypes.func,
};
SizeBox.defaultProps = {
    sizes: [],
    active: null,
};
