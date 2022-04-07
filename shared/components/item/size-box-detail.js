import PropTypes from 'prop-types';
import React, { useState , useEffect } from 'react';
import constants from '../../config/constants';
import SizeItem from './size-item';
import IconRuler from '@spo/components/common/icon-ruler';
import { useDispatch } from 'react-redux';
import ItemDetailActions from '@spo/redux/item-detail/action';
import SizeItemDetail from './size-item-detail';

export default function SizeBoxDetail(props) {
    const { sizes, active } = props;
    const [nameSize, setNameSize] = useState('');

    const onChangeSize = (SizeId) => {
        props.onChangeSize(SizeId);
    };
    useEffect(() => {
        let index = sizes.findIndex((x) => x.SizeId == active);
        setNameSize(index != -1 ? sizes[index].Name : '');
    }, [active, sizes]);
    return (
        <>
            <div className="wrap">
                <div style={{ paddingBottom: 10}}>
                    <span
                        className="title"
                        style={{
                           
                            fontWeight: 500,
                            fontSize: 16,
                        }}>
                        Kích thước:{' '}
                    </span>
                    <span>{nameSize}</span>
                </div>
                <div className="size-box-grid _custom">
                    {sizes?.map((element, index) => {
                        return (
                            <SizeItemDetail
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
SizeBoxDetail.propTypes = {
    sizes: PropTypes.array,
    active: PropTypes.number,
    onChangeSize: PropTypes.func,
};
SizeBoxDetail.defaultProps = {
    sizes: [],
    active: null,
};
