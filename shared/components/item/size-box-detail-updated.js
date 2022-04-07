import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import SizeItemDetail from './size-item-detail';
import SelectBox from '../common/select-box';

export default function SizeBoxDetailUpdated (props) {
    const { sizes, active ,className} = props;
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
            <div className={`size-box-detail-updated wrap ${className}`}>
                <div className=" _custom">
                    {/* {sizes?.map((element, index) => {
						return (
							<SizeItemDetail
								key={index}
								active={element.SizeId == active}
								item={element}
								onChange={() => onChangeSize(element.SizeId)}
								name={element.Name}
							/>
						);
					})} */}
                    <SelectBox
                        value={active}
                        onChange={(val) => props.onChangeSize(val)}
                        placeholder="Kích thước"
                        list={sizes}
                        defaultValue={0}
                        isShowSelectAll={false}
                        field={["Name", "SizeId"]}
                        showArrow={true}
                        showEmpty={false}
                    />
                </div>
            </div>
        </>
    );
}
SizeBoxDetailUpdated.propTypes = {
    sizes: PropTypes.array,
    active: PropTypes.number,
    onChangeSize: PropTypes.func,
};
SizeBoxDetailUpdated.defaultProps = {
    sizes: [],
    active: null,
};
