import React from 'react';
import style from './../css/rank-gift.module.css'
import IconTarget from '../../../components/common/icon-target';
import IconMedal from '../../../components/common/icon-medal';
import IconCake from '../../../components/common/icon-cake';
import IconShakeHand from '../../../components/common/icon-shake-hand';

const IconTargetCommon = <IconTarget />
const IconMedalCommon = <IconMedal />
const IconCakeCommon = <IconCake />
const IconShakeHandCommon = <IconShakeHand />
function GiftItem(props) {

    const {gift} = props

    const randerIcon = (item)=>{
        switch(item){
            case 1:
                return IconTargetCommon;
            case 2:
                return IconMedalCommon;
            case 3:
                return IconCakeCommon;
            case 4:
                return IconShakeHandCommon;
        }
    }

    return (
        <div className={style.giftContainer}>
            <div className={style.giftImage}>
                {randerIcon(gift?.id ?? 1)}
            </div>
            <h5 className={style.title}>{gift?.title ?? "Quà Thăng Hạng"}</h5>
            {gift?.offerList.map((item,index)=>{
                return <p key={index} className={style.offer}>Tặng<span className={style.description}>{item}</span></p>
            })??<p>Tặng <span className={style.description}>01 Mã Số Mua Hàng giảm 12%</span></p>}
        </div>
    );
}

export default GiftItem;