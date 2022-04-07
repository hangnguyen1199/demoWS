import React from 'react'
import constants from '@spo/config/constants';
import checkExits from './help';
import IconCheck from '../../common/icon-check';

export default function PromotionFilter(props) {
    const { handlePromotion, dataFilter } = props;
    return (
        <>
            <div className='column-menu-modal'>
                <div className='menu-modal-column'>
                    <p className='menu-name'>KHUYẾN MÃI</p>
                    <div onClick={() => handlePromotion(constants.TYPE_SEARCH
                        .PROMOTION
                        .PROMOTION_SUPPER_SALE)} className='d-flex flex-row align-items-center menu-modal-column-item'>
                        <span className="icon-check-left">
                            {checkExits(dataFilter, constants.TYPE_SEARCH
                                .PROMOTION
                                .PROMOTION_SUPPER_SALE) > -1 && <IconCheck />}
                        </span>
                        <p className={`fontsize16 menu-name-item ${checkExits(dataFilter, constants.TYPE_SEARCH
                            .PROMOTION
                            .PROMOTION_SUPPER_SALE) > -1 && 'active'}`}>Siêu sale</p>
                    </div>
                    <div onClick={() => handlePromotion(constants.TYPE_SEARCH
                        .PROMOTION
                        .PROMOTION_GOLDEN_HOUR)} className='d-flex flex-row align-items-center menu-modal-column-item'>
                        <span className="icon-check-left">
                            {checkExits(dataFilter, constants.TYPE_SEARCH
                                .PROMOTION
                                .PROMOTION_GOLDEN_HOUR) > -1 && <IconCheck />}
                        </span>
                        <p className={`fontsize16 menu-name-item ${checkExits(dataFilter, constants.TYPE_SEARCH
                            .PROMOTION
                            .PROMOTION_GOLDEN_HOUR) > -1 && 'active'}`}>Giờ vàng</p>
                    </div>
                </div>
            </div>
        </>
    )
}
