import React from 'react';
import IconCondition from './../../../../components/common/icon-condition';
import IconCorrect from '../../../../components/common/icon-correct';
import IconHeart from './../../../../components/common/icons/icon-heart';
import IconPercent from '../../../../components/common/icon-percent';
import IconMoney from './../../../../components/common/icon-money';
import IconClocks from '../../../../components/common/icon-clocks';
import IconPresentMin from './../../../../components/common/icon-present-min';
import IconShare from './../../../../components/common/icon-share';
import IconBag from '../../../../components/common/icon-bag';
import IconFMLive from '../../../../components/common/icon-fm-live';
import CountDownTime from '../count-down-time';

// start -- chinh update
const IconHeartCommon = <IconHeart widthLine={1} fontSize={52} />;
const IconShareCommon = <IconShare widthLine={0.5} fontSize={52} />;
const IconPercentCommon = <IconPercent />;
const IconBagCommon = <IconBag fontSize={52} />;
const IconFMliveCommon = <IconFMLive fontSize={52} />;
// end -- chinh update
function HappeningItem(props) {
    // start -- chinh update
    const { item, className } = props;
    // end -- chinh update
    const percent = item?.progress ? `${item.progress / item.max * 100  }%` : "50%";
    // start -- chinh update
    const renderIcon = (item) => {
        switch (item) {
            case 1:
                return IconHeartCommon;
            case 2:
                return IconPercentCommon;
            case 3:
                return IconShareCommon;
            case 4:
                return IconFMliveCommon;
            case 5:
                return IconBagCommon;
        }
    }
    // end -- chinh update
    return (
        <div className={`challenge-question-item ${className}`}>
            <div className="challenge-question-item-inner">
                <div className="infor">
                    <div className="infor-image">
                        {renderIcon(item.id)}
                    </div>
                    <div className="infor-description">
                        <div className="infor-description-item">
                            <div className="infor-description-item-icon">
                                <IconCondition />
                            </div>
                            <p>: {item?.challenge ?? "Mua 3 đơn hàng"}</p>
                        </div>
                        <div className="infor-description-item">
                            <div className="infor-description-item-icon">
                                <IconClocks />
                            </div>
                            <div className='d-flex px-1 align-items-center'>: <CountDownTime /></div>
                        </div>
                        <div className="infor-description-item">
                            <div className="infor-description-item-icon">
                                <IconPresentMin fontSize={20} />
                            </div>
                            <p> : {item?.point ?? "100 điểm bạc"}</p>
                        </div>
                    </div>
                </div>
                <div className="challenge-progress">
                    <div className="progress-range">
                        <p className="my-0">{item?.max && item?.progress ? `${item.progress}/${item.max}` : "5/10"} </p>
                        <div className="progress-ranger">
                            {item.status === 3 ?
                                <><span className="progress-ranger-done" style={{ width: percent, backgroundColor: "#535353" }}></span>
                                    <span className="progress-ranger-pointer" style={{ left: percent, backgroundColor: "#535353", border: "1px solid #707070" }}></span></>
                                :
                                <><span className="progress-ranger-done" style={{ width: percent, backgroundColor: "#FFD500" }}></span>
                                    <span className="progress-ranger-pointer" style={{ left: percent, backgroundColor: "#FFD500", border: "1px solid #707070" }}></span></>
                            }
                        </div>
                    </div>
                    <div className="status-button">
                        {item?.status && item?.status === 1 ?
                            <button className="challenge-button success-button" >
                                <IconCorrect />
                            </button> : item?.status === 2 ?
                                <button className="challenge-button progress-button" >
                                    Đang diễn ra
                                </button> : item?.status === 3 ?
                                    <button className="challenge-button notcompleted-button" >
                                    Không hoàn thành
                                    </button> : <button className="challenge-button progress-button" >
                                    Đang diễn ra
                                    </button>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HappeningItem;