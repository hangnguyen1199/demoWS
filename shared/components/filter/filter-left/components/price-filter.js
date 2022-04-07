import React, { useState } from 'react';
import IconChevronDown from '../../../common/icon-chevron-down';
import IconChevronUp from '@spo/components/common/icon-chevron-up';
import PriceFilter from '@spo/components/filter/price-filter';
import IconFeatherPlus from '../../../common/icon-feather-plus';
import IconFeatherPlusShow from '../../../common/icon-feather-plus-show';

function PriceFilterCommon(props) {
    const [open, setOpen] = useState(true);
    const handleClickAccordion = () => {
        setOpen(!open);
    };
    const onChangePrice=(e)=>{
        props.onChange(e)
    }
    return (
        <div className={`accordion-filter ${props.className}`}>
            <div
                onClick={handleClickAccordion}
                className="accordion-filter-title"
            >
                <p>Giá</p>
                <span>{open ? <IconFeatherPlus /> : <IconFeatherPlusShow />}</span>
            </div>
            <div
                className={`accordion-filter-main accordion-filter-main-details ${
                    open ? 'active' : ''
                }`}
            >
                <div className="accordion-filter-main-up d-flex flex-row flex-wrap">
                    <div className="d-flex flex-row align-items-center w-100">
                        <PriceFilter
                            min={0}
                            max={1000000}
                            className="w-100 ml-4 mr-4"
                            onChange={(e) => onChangePrice(e)}
                            defaultValueStart={Number(props.priceData.startPrice)}
                            defaultValueEnd={Number(props.priceData.endPrice)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
PriceFilterCommon.propsType = {};
export default PriceFilterCommon;
