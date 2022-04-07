import React from 'react';
import RowRank from './row-rank'
import style from '../css/rank-board.module.css'
import Top3 from './top3'

function RankBoard(props) {

    const account = {
        index:1,
        avatar:"/images/icon/acccount_avatar.svg",
        name:"Nguyen Van C",
        pointNumber:800000
    }
    const listAccount=[
        {
            index:1,
            avatar:"/images/icon/acccount_avatar.svg",
            name:"Nguyen Van 1",
            pointNumber:1000000
        },
        {
            index:2,
            avatar:"/images/icon/acccount_avatar.svg",
            name:"Nguyen Van 2",
            pointNumber:800000
        },
        {
            index:3,
            avatar:"/images/icon/acccount_avatar.svg",
            name:"Nguyen Van 3",
            pointNumber:700000
        },
        {
            index:4,
            avatar:"/images/icon/acccount_avatar.svg",
            name:"Nguyen Van 4",
            pointNumber:800000
        },
        {
            index:5,
            avatar:"/images/icon/acccount_avatar.svg",
            name:"Nguyen Van 5",
            pointNumber:800000
        },
        {
            index:6,
            avatar:"/images/icon/acccount_avatar.svg",
            name:"Nguyen Van 6",
            pointNumber:800000
        },
        {
            index:7,
            avatar:"/images/icon/acccount_avatar.svg",
            name:"Nguyen Van 7",
            pointNumber:800000
        },
        {
            index:8,
            avatar:"/images/icon/acccount_avatar.svg",
            name:"Nguyen Van 8",
            pointNumber:80000000
        }
    ]
    const top3 = listAccount.slice(0,3)
    const afterTop3 = listAccount.slice(3)

    return (

        <div>
            <div className={style.myRank}>
                <p className={style.title}>Thứ hạng của bạn</p>
                {<RowRank account={account}/>}
            </div>
            <div>
                <p className={style.title}>Top thứ hạng</p>
                {/* render top 3 desktop*/}
                <div className={style.top3Rank}>
                    {top3.map((item,index)=>(
                        <Top3 key={index} account={item}/>
                    ))}
                </div>
                {/* render top 3 mobile*/}
                <div className={style.top3RankMobi}>
                    {top3.map((item,index)=>(
                        <RowRank key={index} account={item}/>
                    ))}
                </div>
                {/* render top after 3 */}
                <div className={style.rankList}>
                    {afterTop3.map((item,index)=>(
                        <RowRank key={index} account={item}/>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default RankBoard;