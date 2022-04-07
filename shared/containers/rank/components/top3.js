import React from 'react';
import style from '../css/top3.module.css'
import IconStar from "../../../components/common/icon-star"
import FirstPlace from "../../../components/common/first-place"
import SecondPlace from "../../../components/common/second-place"
import ThirdPlace from "../../../components/common/third-place"
import BronzeBackground from "../../../../public/images/rank/bronze_background.png"
import SilverBackground from "../../../../public/images/rank/silver_background.png"
import GoldBackground from "../../../../public/images/rank/gold_background.png"

function Top3(props) {
    const {account } = props
    let place
    switch(account?.index){
        case 1:{
            place = {
                rank:<FirstPlace />,
                background:GoldBackground
            }
            break;
        }
        case 2:{
            place = {
                rank:<SecondPlace />,
                background:SilverBackground
            }
            break;
        }
        case 3:{
            place = {
                rank:<ThirdPlace />,
                background:BronzeBackground
            }
            break;
        }
    }

    return (
        <div className={style.container}>
            <div className={style.account}>
                <img className={style.background} src={place?.background ?? BronzeBackground} />    
                <div className={style.avatar}>
                    <div className={style.avatarRatioContainer}>
                        <div className={style.avatarRatio}>
                            <img className={style.image} src={account?.avatar ?? "/images/icon/acccount_avatar.svg"} />
                        </div>
                    </div>
                    <div className={style.name}> {account?.name?? "Nguyễn Văn A"}</div>
                </div>
            </div>
            <div className={style.point}>
                <div className={style.medal}>
                    {place?.rank ?? <ThirdPlace />}
                </div>
                <div className={style.pointItem}>
                    <div className={style.pointIcon}>
                        <IconStar />
                    </div>
                    <div>{account?.pointNumber ?? 1000000}</div>
                </div>
            </div>
        </div>
    );
}

export default Top3;