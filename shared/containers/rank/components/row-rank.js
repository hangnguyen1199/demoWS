import React from 'react';
import style from '../css/row-style.module.css'
import IconStar from "../../../components/common/icon-star"
import FirstPlace from "../../../components/common/first-place"
import SecondPlace from "../../../components/common/second-place"
import ThirdPlace from "../../../components/common/third-place"
import BronzeBackground from "../../../../public/images/rank/bronze_background.png"
import SilverBackground from "../../../../public/images/rank/silver_background.png"
import GoldBackground from "../../../../public/images/rank/gold_background.png"

function RowRank(props) {
    const { account } = props
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
        <div className={`${style.rowContainer} ${place?.background && style.top}`} 
            style={place?.background && 
                {backgroundImage:`url(${place.background})`,
                    backgroundSize:'cover',
                    backgroundPosition:'center'}}
        >
            <div className={style.rowInfor}>
                {/* account?.index ?? 1 */}
                <div className={style.model}>{place?.rank ?? account?.index ?? 1  }</div>
                <div className={style.avatar}>
                    <img className={style.image} src={account?.avatar ?? "/images/icon/acccount_avatar.svg"} />
                </div>
                <div className={style.rowName}>{account?.name ?? "Nguyễn Văn A"}</div>
            </div>
            <div className={style.point}>
                <div className={style.pointIcon}>
                    <IconStar />
                </div>
                <div>{account?.pointNumber ?? 0}</div>
            </div>
        </div>
    );
}

export default RowRank;