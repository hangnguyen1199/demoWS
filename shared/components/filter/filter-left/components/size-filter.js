import React, { useState } from 'react';
import IconChevronDown from '../../../common/icon-chevron-down';
import IconChevronUp from '@spo/components/common/icon-chevron-up';
import IconRectangle from '../../../common/icon-rectangle';
import IconRectangleCheck from '../../../common/icon-rectangle-check';
import { useSelector } from 'react-redux';
import { checkExitsArray } from '../../component-header-bar/help';
import IconFeatherPlus from '../../../common/icon-feather-plus';
import IconFeatherPlusShow from '../../../common/icon-feather-plus-show';

function SizeFilter(props) {
    const [open, setOpen] = useState(true);
    const handleClickAccordion = () => {
        setOpen(!open);
    };
    const common = useSelector((state) => state.Common);
    return (
        <div className={`accordion-filter ${props.className}`}>
            <div
                onClick={handleClickAccordion}
                className="accordion-filter-title"
            >
                <p>Size</p>
                <span>{open ? <IconFeatherPlus /> : <IconFeatherPlusShow />}</span>
            </div>
            <div
                className={`accordion-filter-main accordion-filter-main-details ${
                    open ? 'active' : ''
                }`}
            >
                <div className="accordion-filter-main-up d-flex flex-row flex-wrap">
                    {common?.data?.listSize.map((size, index) => (
                        <div onClick={() => props.handleSizeId(size.Id)} key={index} className="accordion-filter-main-item-child">
                            {
                                checkExitsArray(props.sizeData,size?.Id) == -1 ? <IconRectangle /> : <IconRectangleCheck />
                            }
                            <p className='text-truncate' title={size?.Name}>{size.Name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
SizeFilter.propsType = {};
export default SizeFilter;
