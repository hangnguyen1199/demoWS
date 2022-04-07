import React, { useState } from 'react';
import TabFaq from './tab-faq';
import TabNews from './tab-news';
import TabPromotion from './tab-promotion';
import { useRouter } from 'next/router';
import constants from '@spo/config/constants';

function TabOther(props) {
    const { Keyword } = props;
    const router = useRouter();
    const _queryParam = router.query;3;
    const Tabs = [
        {
            Id: constants.SEARCH_NEWS_TAB,
            Name: 'Tin tức',
        },
        {
            Id: constants.SEARCH_PROMO_TAB,
            Name: 'Khuyến mãi',
        },
        // {
        //     Id: constants.SEARCH_FAQ_TAB,
        //     Name: 'Câu hỏi thường gặp',
        // },
    ];
    const [tabActive, setTabActive] = useState(_queryParam?.tab == constants.SEARCH_PRODUCT_TAB ? constants.SEARCH_NEWS_TAB : _queryParam?.tab);
    const handleChangeTab = (val) => {
        let newQuery = {..._queryParam}
        newQuery["tab"] = val
        router.replace({
            query: newQuery
        })
        setTabActive(val);
    };
    const _renderTab = () => {
        switch (tabActive) {
            case constants.SEARCH_NEWS_TAB:
                return <TabNews Keyword={_queryParam[constants.ROUTER_NAME.KEYWORD]} />;
            case constants.SEARCH_PROMO_TAB:
                return <TabPromotion Keyword={_queryParam[constants.ROUTER_NAME.KEYWORD]} />;
            case constants.SEARCH_FAQ_TAB:
                return <TabFaq Keyword={Keyword} />;
            default:
                return <TabNews Keyword={Keyword} />;
        }
        
    };
    console.log(Keyword);
    return (
        <div className="tab-other">
            <div className="col-12 col-md _leftside">
                {Tabs.map((e, i) => {
                    return (
                        <div
                            key={i}
                            onClick={() => handleChangeTab(e.Id)}
                            className={`other_sub_tab text-truncate ${
                                tabActive == e.Id ? 'active' : ''
                            }`}>
                            {e.Name}
                        </div>
                    );
                })}
            </div>
            <div className="col-12 col-md _rightside">{_renderTab()}</div>
        </div>
    );
}
export default TabOther;
