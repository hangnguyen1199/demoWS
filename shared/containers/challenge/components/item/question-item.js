import React from 'react';
import IconCondition from './../../../../components/common/icon-condition';
import IconFMLive from './../../../../components/common/icon-fm-live';
import IconClocks from './../../../../components/common/icon-clocks';
import IconPresentMin from './../../../../components/common/icon-present-min';
import IconHeart from './../../../../components/common/icon-heart';
import IconShare from '@spo/components/common/icon-share';
import IconPercent from './../../../../components/common/icon-percent';
import IconMoney from './../../../../components/common/icon-money';
import IconBag from './../../../../components/common/icon-bag';
import IconDice from './../../../../components/common/icon-dice';

// start -- chinh update
const IconHeartCommon = <IconHeart widthLine={1} fontSize={52} />;
const IconShareCommon = <IconShare widthLine={0.5} fontSize={52} />;
const IconPercentCommon = <IconPercent />;
const IconMoneyCommon = <IconMoney fontSize={52} />;
const IconBagCommon = <IconBag fontSize={52} />;
const IconFMliveCommon = <IconFMLive fontSize={52} />;
const IconDiceCommon = <IconDice fontSize={52} />;
// end -- chinh update
function QuestionItem(props) {
    const { item, onClick } = props
    const onButtonClick = () => {
        onClick(item.id);
    }
    // start -- chinh update
    const renderIcon=(item)=>{
        switch (item) {
            case 1:
                return IconBagCommon;
            case 2:
                return IconFMliveCommon;
            case 3  :
                return IconDiceCommon;
        }
    }
    // end -- chinh update
    return (
        <div className="challenge-question-item">
            <div className="challenge-question-item-inner">
                <div className="infor">
                    <div className="infor-image">
                        {renderIcon(props.item.id)}
                    </div>
                    <div className="infor-description">
                        <div className="infor-description-item">
                            <div className="infor-description-item-icon">
                                <IconCondition />
                            </div>
                            <p>: {item?.challenge ?? "Mua 3 đơn hàng"}</p>
                        </div>
                        <div className="infor-description-item">
                            <div className="infor-description-item-icon" style={{marginTop:"2px"}}>
                                <IconClocks />
                            </div>
                            <p>: {item?.time ?? "07 ngày"}</p>
                        </div>
                        <div className="infor-description-item">
                            <div className="infor-description-item-icon">
                                <IconPresentMin />
                            </div>
                            <p> : {item?.point ?? "100 điểm bạc"}</p>
                        </div>
                    </div>
                </div>
                <div className="join">
                    <button className="join-button challenge-button" onClick={onButtonClick}>
                        Tham gia
                    </button>
                </div>

            </div>
        </div>
    );
}

export default QuestionItem;