import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import style from './../css/my-rank.module.css'
import GiftItem from './gift-item';
import RankCard from './rank-card'

function MyRank(props) {
    // const dispatch = useDispatch();
    // const vouchers = useSelector((state) => state.Wallet.vouchers);
    // useEffect(() => {
    //     dispatch({ type: WalletActions.LOAD_VOUCHER, data: {Type: constants.VOUCHER_TYPE.MSMH} });
    //   }, []);
    const card = {
        rank:"customer",
        account:"1234567890",
        surplus:"800000",
        type:3,
        name:"Nguyen van b",
        expiration:"01/01",
        max:200,
        progress:100
    } 
    const giftList = [
        {
            id:2,
            title:"Quà TOP 100",
            offerList:["01 Mã Số Mua Hàng giảm 12%","500 Điểm Tích Lũy Bạc"]
        },
        {
            id:3,
            title:"Quà Sinh Nhật",
            offerList:["01 Mã Số Mua Hàng giảm 12%"]
        },
        {
            id:1,
            title:"Quà Thăng Hạng",
            offerList:["01 Mã Số Mua Hàng giảm 12%","500 Điểm Tích Lũy Bạc"]
        },
        {
            id:1,
            title:"Quà Thăng Hạng",
            offerList:["01 Mã Số Mua Hàng giảm 12%","500 Điểm Tích Lũy Bạc"]
        }
    ]

    const percent = card?.progress ? `${card.progress / card.max * 100  }%` : "50%";
    let backgroundCard
    switch(card?.rank){
        case "bronze":{
            backgroundCard ={
                color: "#AA9259"
            }
            break;
        }
        case "silver":{
            backgroundCard ={
                color: "#7F7F7F"
            }
            break;
        }
        case "gold":{
            backgroundCard ={
                color: "#DCB053"
            }
            break;
        }
        case "platinum":{
            backgroundCard ={
                color:"#000"
            }
            break;
        }
        default :{
            backgroundCard ={
                color: "#AA9259"
            }
            break;
        }
    }
    return (
        <div className={style.container}>
            <div className={style.cardContainer}>
                <RankCard data={card}/>
                <div className={style.progressContainer}>
                    <p className={style.m0}>{card?.rank ?? "Customer"}</p>
                    <div className={style.progressRanger}>
                        <span className={style.progressRangerDone} style={{ width: percent, backgroundColor: backgroundCard.color }}></span>
                        <span className={style.progressRangerPointer} style={{ left: percent, backgroundColor: backgroundCard.color, border: "1px solid #707070" }}></span>
                    </div>
                    <p className={style.textEnd}>{card?.max && card?.progress ? `${card.progress}/${card.max}` : "80,000/99,999"} </p>
                </div>      
            </div>
            <div className={style.gift}>
                <div className="_card">
                    <div className="_wrap_title">
                        <div className={` _title ${style.title}`}>Phần thưởng của bạn</div>
                    </div>
                    <div className="_content">
                        <div className={style.giftContainer}>
                            {giftList?.map((item,index)=>{
                                return <GiftItem key={index} gift={item}/>
                            })??<p>Bạ chưa có phần thưởng nào</p>}
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    );
}

export default MyRank;