import Breadcrumb from '@spo/components/common/breadcrumb';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Display from '../../components/common/display';
import VerticalTab from '../../components/spo-layout/vertical-tab';
import MyRank from './components/my-rank';
import RankBoard from './components/rank-board';
import style from './css/index-style.module.css'

function RankContainer(props) {
    const [tabIndex, setTabIndex] = useState(0);
    const router = useRouter();
    useEffect(() => {
        const tmpTab = router?.query?.tab;
        if (tmpTab == tabIndex) {return;}
        switch (tmpTab) {
            case "0":
                setTabIndex(0);
                break;
            case "1":
                setTabIndex(1);
                break;
            default:
                setTabIndex(0);
                break;
        }
    }, [router?.query]);

    return (
        <div>
            <Breadcrumb
                data={[
                    { name: 'Trang chủ', query: '', path_name: '/' },
                    { name: 'Thứ hạng', query: '', path_name: '/' },
                ]}
            />
            <div className='row mx-0 pd-lr-common'>
                <Display>
                    <div className='col-lg-3 px-0'>
                        <VerticalTab index={6}></VerticalTab>
                    </div>
                </Display>
                <div className="col-lg-9 px-0 d-flex flex-column">
                    <div className='row mx-0'>
                        <div className='col-12 px-0'>
                            <div className={`${style.rankHeader} d-flex justify-content-center align-items-center wallet-header`}>
                                <div className={`h-100 pointer d-center ${style.headerItem} ${tabIndex == 0 ? style.active : ''}`} onClick={() => setTabIndex(0)}>Thứ hạng của tôi</div>
                                <div className={`h-100 pointer d-center ${style.headerItem} ${tabIndex == 1 ? style.active : ''}`} onClick={() => setTabIndex(1)}>Bảng thứ hạng</div>
                            </div>
                        </div>
                    </div>
                    {tabIndex == 0 && (<MyRank/>)}
                    {tabIndex == 1 && (<RankBoard />)}
                    {/* {tabIndex == 0 && (<RankCard data={{rank:"gold"}}/>)} */}
                    
                </div>
            </div>
        </div>
    );
}

export default RankContainer;