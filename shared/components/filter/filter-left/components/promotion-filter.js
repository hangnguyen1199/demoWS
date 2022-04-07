import React, { useState } from 'react';
import IconChevronDown from '../../../common/icon-chevron-down';
import IconChevronUp from '@spo/components/common/icon-chevron-up';
import IconRectangle from '../../../common/icon-rectangle';
import IconRectangleCheck from '../../../common/icon-rectangle-check';
import constants from './../../../../config/constants';
import checkExits from '../../component-header-bar/help';
import IconFeatherPlus from '../../../common/icon-feather-plus';
import IconFeatherPlusShow from '../../../common/icon-feather-plus-show';

function PromotionFilter(props) {
    const [open, setOpen] = useState(true);
    const handleClickAccordion = () => {
        setOpen(!open);
    };
    return (
        <div className={`accordion-filter ${props.className}`}>
            <div
                onClick={handleClickAccordion}
                className="accordion-filter-title"
            >
                <p>Khuyến mãi</p>
                <span>{open ? <IconFeatherPlus /> : <IconFeatherPlusShow />}</span>
            </div>
            <div
                className={`accordion-filter-main accordion-filter-main-details ${
                    open ? 'active' : ''
                }`}
            >
                <div
                    style={{ borderBottom: 'unset' }}
                    className="accordion-filter-main-up d-flex flex-row flex-wrap"
                >
                    <div
                        onClick={() =>
                            props.handlePromotion(
                                constants.TYPE_SEARCH.PROMOTION
                                    .PROMOTION_SUPPER_SALE
                            )
                        }
                        className="accordion-filter-main-item-child"
                    >
                        {checkExits(
                            props.dataPromotion,
                            constants.TYPE_SEARCH.PROMOTION
                                .PROMOTION_SUPPER_SALE
                        ) > -1  ? <IconRectangleCheck /> : <IconRectangle /> }
                        <p>Siêu sale</p>
                    </div>
                    <div
                        onClick={() =>
                            props.handlePromotion(
                                constants.TYPE_SEARCH.PROMOTION
                                    .PROMOTION_GOLDEN_HOUR
                            )
                        }
                        className="accordion-filter-main-item-child"
                    >
                        {checkExits(
                            props.dataPromotion,
                            constants.TYPE_SEARCH.PROMOTION
                                .PROMOTION_GOLDEN_HOUR
                        ) > -1  ? <IconRectangleCheck /> : <IconRectangle /> }
                        <p>Giờ vàng</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
PromotionFilter.propsType = {};
export default PromotionFilter;
