import React from 'react';
import style from './../css/rank-card.module.css'
import Bronze from "../../../../public/images/rank/bronze.png"
import BronzeBackground from "../../../../public/images/rank/bronze_background.png"
import Silver from "../../../../public/images/rank/silver.png"
import SilverBackground from "../../../../public/images/rank/silver_background.png"
import Gold from "../../../../public/images/rank/gold.png"
import GoldBackground from "../../../../public/images/rank/gold_background.png"
import Vip from "../../../../public/images/rank/vip.png"
import VipBackground from "../../../../public/images/rank/vip_background.png"
import NormalBackground from "../../../../public/images/rank/nomal_background.png"
import CardLogo from "../../../components/common/card-logo"
import CardLogoBlack from "../../../components/common/card-logo-black"
import QrCodeWhite from "../../../components/common/qr-code"
import QrCodeBlack from "../../../components/common/qr-code-black"

function RankCard(props) {
    const {data} = props;
    let backgroundCard;
    let type;
    switch(data?.rank){
        case "bronze":{
            backgroundCard ={
                color: Bronze,
                backgroundColor:BronzeBackground
            }
            type="Broze card";
            break;
        }
        case "silver":{
            backgroundCard ={
                color: Silver,
                backgroundColor:SilverBackground
            }
            type="Silver card";
            break;
        }
        case "gold":{
            backgroundCard ={
                color: Gold,
                backgroundColor:GoldBackground
            }
            type="Gold card";
            break;
        }
        case "platinum":{
            backgroundCard ={
                color:Vip,
                backgroundColor:VipBackground
            }
            type="Black card";
            break;
        }
        default :{
            backgroundCard ={
                backgroundColor:NormalBackground
            }
            type="Curtomer card";
            break;
        }
    }
    
    return (
        <div className={style.cardContainer} >
            <div className={style.ratio}>
                <img className={style.cardBackground} src={backgroundCard?.backgroundColor} />
                {backgroundCard?.color && <img className={style.cardColor} src={backgroundCard?.color}/>}
            </div>
            <div className={ data?.rank=="platinum" ? `${style.card} ${style.cardBlack}` : style.card}>
                <div className={style.logo}>
                    <div className={style.qrcode}>
                        {data?.rank=="platinum"?
                            <QrCodeWhite />:
                            <QrCodeBlack />}
                    </div>
                    <div className={style.cardType}>
                        <div className={style.fmImg}>
                            {data?.rank=="platinum"?
                                <CardLogo />:
                                <CardLogoBlack />}
                            
                        </div>
                        <p className={style.uppercase}>{type}</p>
                    </div>
                </div>
                <div className={  style.infor}>
                    <p className={style.cardAccountNumber}>{data?.account ?? "2110500016"}</p>
                    <div className={style.cardNumber}>
                        <p className={ `${style.m0} ${style.cardNumberSurplus}`}>{data?.surplus ?? "800.000"}</p>
                        <p className={style.cardNumberType}>{`#${data?.type??"3"}`}</p>
                    </div>
                    <div className={style.cardUser}>
                        <p className={ `${style.m0} ${style.cardUserName}`}>{data?.name ?? "NGUYEN VAN A"}</p>
                        <div className={style.cardDate}>
                            <div className={style.isValid}>
                                <p className={`${style.m0} ${style.isValidItem}`}>VALID</p>
                                <p className={style.isValidItem}>THRU</p>
                            </div>
                            <div className={style.expiration}>
                                <p>{data?.expiration ?? "25/10"}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    );
}

export default RankCard;