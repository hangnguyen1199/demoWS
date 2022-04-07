import React from 'react';
import constants from '../../config/constants';
import IconPercentTag from '../common/icons/icon-percent-tag';
import CountDownTime from '../spo-layout/count-down-time';
import CountDownTimeFlip from '../spo-layout/flip-clock';


function PromotionTimeTag (props) {
    const {To, Title} = props

    return (
        <div
            className="promotion-time-tag"
            style={{
                background:
                    props.type == constants.PRODUCT_TYPE.GOLDEN_HOUR
                        ? 'url(/images/icon/background-gold-time.svg)'
                        : 'url(/images/icon/background-sale-off.svg)',
                backgroundSize: 'cover',
            }}
        >
            <div className="left">
                <div className="icon">
                    <IconPercentTag fontSize={20} />
                </div>
                <div className="text">{Title}</div>
            </div>
            <div className="right">
                {props.isFromPopup ? <></> : <div className="text mr-1">Kết thúc sau:</div>}
                <CountDownTime 
                    type={props.type} 
                    endTime={To} 
                    fontSize={14} />
            </div>
        </div>
    );
}
export default PromotionTimeTag;