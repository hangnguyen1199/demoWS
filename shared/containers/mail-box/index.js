import dynamic from 'next/dynamic';
import React, {
    useState,
    useEffect,
} from 'react';
import styled from 'styled-components';
import BreadCrumb from '@spo/components/common/breadcrumb';
import CustomPagination from '@spo/components/common/custom-pagination';
import MailboxActions from '../../../redux/mail-box/action';
import ListNewsComponent from '../../components/about-us/ListNewsComponent';
import PromotionListComponent from '../../components/mail-box/PromotionListComponent'
import { useRouter } from 'next/router';
import MailBoxActions from './../../../redux/mail-box/action';
import { scrollTop } from './../../library/helper';
import {
    useDispatch,
    useSelector,
} from 'react-redux';
import MessageListComponent from '../../components/mail-box/MessageListComponent';
import NotificationListComponents from '../../components/mail-box/NotificationListComponent';
import PageList from '../../config/PageList';
import Display from '../../components/common/display';

const Header = dynamic(
    () =>
        import('@spo/components/spo-layout/header'),
    {

        ssr: true,
    },
);

const types = [
    'Thông báo',
    'Tin nhắn',
    'Tin tức',
    'Khuyến mãi',
];

const Tab = styled.button`
  background-color: #f2f2f2;
  border: none;
  text-align: left;
  padding: 20px;
  outline: 0;
  cursor: pointer;
  transition: none;
  text-align: center;
  border-left: 1.5px solid #F2F2F2;

  ${({ active }) =>
        active &&
    `
        border-left: 1.5px solid #FF2C00;
        background-color: white;
        font-weigh: semi-bold;
        color: #ff603f;
      `}
`;
const TabMobile = styled.button`
  background-color: #f2f2f2;
  border: none;
  text-align: left;
  padding: 5px;
  outline: 0;
  cursor: pointer;
  transition: none;
  text-align: center;
  border-left: 1.5px solid #F2F2F2;

  ${({ active }) =>
        active &&
    `
        background-color: white;
        font-weigh: semi-bold;
        color: #ff603f;
      `}
`;
const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const breadCrumb = [
    { name: 'Trang chủ', path_name: '/' },
    { name: 'Hộp thư', path_name: '/mail-box' },
];

const MailBoxContainer = (props) => {
    const [active, setActive] = useState(types[0]);
    const dispatch = useDispatch();
    const router = useRouter();
    let paginationParams = {limit: 10, offset: 0}

    const notificationList = useSelector(
        (state) => state.MailBox.notificationList,
    );

    const newsList = useSelector(
        (state) => state.MailBox.newsList,
    );

    const promotionList = useSelector(
        (state) => state.MailBox.promotionList,
    );
    
    useEffect(() => {
        if(router.query.type){
            setActive(router.query.type)
        }else{
            setActive(types[0])
        }
    }, [router.query.type])
    
    const handleOnClick = (type) => {
    // if click on same tab will not dispatch any action
        if (type !== active) {
            router.replace({
                pathname: PageList.MAIL_BOX.SERVER
            }, undefined, { shallow: true})
            switch (type) {
                case types[0]:
                    dispatch({
                        type:
              MailboxActions.FETCH_NOTIFICATION_LIST,
                        data: { type: 1 },
                    });
                    break;

                case types[2]:
                    dispatch({
                        type: MailboxActions.FETCH_NEWS_LIST,
                        data: { data: paginationParams },
                    });
                    break;

                case types[3]:
                    dispatch({
                        type:
              MailboxActions.FETCH_PROMOTION_LIST,
                        data: { data: paginationParams },
                    });
                    break;
            }
            router.replace({
                query:{
                    ...router.query,
                    type:type
                }
            })
        }
    };

    return (
        <>
            <div className="product-list-with-type">
                <BreadCrumb data={breadCrumb} />
                <div className="row px-0 mx-0 flex-column flex-md-row pd-lr-common">
                    <div className="col-12 col-md-3 px-0 mb-3">
                        <ButtonGroup className="flex-row flex-md-column ">
                            {types.map((type) => (
                                <>
                                    <Display>
                                        <Tab
                                            className="btn-mail-box"
                                            style={{flexBasis: '25%'}}
                                            key={type}
                                            active={active === type}
                                            onClick={() =>
                                                handleOnClick(type)
                                            }>
                                            {type}
                                        </Tab>
                                    </Display>

                                    <Display mobile={true}>
                                        <TabMobile
                                            className="btn-mail-box"
                                            style={{flexBasis: '25%'}}
                                            key={type}
                                            active={active === type}
                                            onClick={() =>
                                                handleOnClick(type)
                                            }>
                                            {type}
                                        </TabMobile>
                                    </Display>
                                </>                                
                            ))}
                        </ButtonGroup>
                    </div>
                    <div className="ml-md-5 flex-1">
                        {active === types[0] && (
                            <NotificationListComponents notificationList={notificationList}
                            />
                        )}

                        {active === types[1] && (
                            <MessageListComponent
                            />
                        )}

                        {active === types[2] && (
                            <ListNewsComponent
                                listNews={newsList}
                            />
                        )}

                        {active === types[3] && (
                            <PromotionListComponent
                                promotionList={promotionList}
                            />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default MailBoxContainer;
