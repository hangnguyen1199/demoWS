import React, { useEffect, useState } from 'react';
import Display from '../../components/common/display';
import VerticalTab from '../../components/spo-layout/vertical-tab';
import WalletPoint from './components/wallet-point';
import PurchaseCode from './components/purchase-code';
import FreeshipCode from './components/freeship-code';
import Breadcrumb from '@spo/components/common/breadcrumb';
import { useRouter } from 'next/router';

const Wallet = (props) => {
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
            case "2":
                setTabIndex(2);
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
                    { name: 'Ví FM', query: '', path_name: '/' },
                ]}
            />
            <div className="bg-white account-info">
                <div className='px-0'>
                    <div className="page-body">
                        <Display>
                            <div className="col-12 col-lg-3 px-0">
                                <VerticalTab index={5}></VerticalTab>
                            </div>
                        </Display>
                        <div className="col-lg-9 px-0 d-flex flex-column container-left-table">
                            <div className='row mx-0'>
                                <div className='col-12 px-0'>
                                    <div className='d-flex justify-content-around align-items-center wallet-header'>
                                        <div className={`h-100 pointer d-center ${tabIndex == 0 ? 'active' : ''}`} onClick={() => setTabIndex(0)}>Điểm tích lũy</div>
                                        <div className={`h-100 pointer d-center ${tabIndex == 1 ? 'active' : ''}`} onClick={() => setTabIndex(1)}>MSMH</div>
                                        <div className={`h-100 pointer d-center ${tabIndex == 2 ? 'active' : ''}`} onClick={() => setTabIndex(2)}>MPVC</div>
                                    </div>
                                </div>
                            </div>
                            {tabIndex == 0 && (<WalletPoint />)}
                            {tabIndex == 1 && (<PurchaseCode />)}
                            {tabIndex == 2 && (<FreeshipCode />)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

};

export default Wallet;
