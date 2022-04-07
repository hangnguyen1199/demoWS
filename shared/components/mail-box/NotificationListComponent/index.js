import React, { Fragment , useEffect } from 'react';
import { DateTime } from 'luxon';
import MailBoxActions from '../../../../redux/mail-box/action';
import { useDispatch } from 'react-redux';
import CustomPagination from '../../common/custom-pagination';
import { scrollTop } from './../../../library/helper';
import EmptyDataComponent from './../../common/empty-data';
import { useRouter } from 'next/router';
import PageList from '../../../config/PageList';

const NotificationItem = (props) => {
    const {
        CreatedAt,
        Title,
        Content,
    } = props.notification;

    const formatDate = (stringDate) => {
        return DateTime.fromISO(stringDate).toFormat(
            'dd.MM.yyyy - hh:mm',
        );
    };

    return (
        <div
            style={{
                padding: 30,
                boxShadow:
          '1px 1px 3px rgba(0, 0, 0, 0.2)',
            }}>
            <p style={{marginBottom: 20}}>{formatDate(CreatedAt)}</p>
            <h3 className='title-mail-box' style={{fontWeight: 500, marginBottom: 15, fontSize: 20}}>
                {Title}
            </h3>
            <div
                className="notification-content"
                dangerouslySetInnerHTML={{
                    __html: Content,
                }}></div>
        </div>
    );
};

const NotificationListComponent = (props) => {
    const {Total, Limit, notifications } = props.notificationList || {};
    const dispatch = useDispatch();
    const router = useRouter();
    const queryParam = { ...router.query };
    const handlePagination = (pageNo) => {
        // scrollTop();
        // let Offset = (pageNo - 1) * 10;
        // dispatch({
        //   type: MailBoxActions.FETCH_NOTIFICATION_LIST,
        //   data: {
        //     Offset: Offset,
        //     Limit: Limit,
        //     type: 1,
        //   },
        // });
        router.replace(
            { 
                query: { page: pageNo } },
            undefined,
            { shallow: true }
        );
    };

    useEffect(() => {
        scrollTop();
        dispatch({
            type: MailBoxActions.FETCH_NOTIFICATION_LIST,
            data: {
                type: 1,
                Offset: (queryParam.page - 1) * 10 || 0,
            },
        });
    }, [queryParam.page]);

    return (
        <div
            className="d-flex flex-column"
            style={{ gap: '30px' }}>
            {notifications?.Total==null||notifications?.length !== 0 ? (
                notifications.map((notification) => (
                    <NotificationItem
                        key={notification.Id}
                        notification={notification}
                    />
                ))
            ) : (
                <EmptyDataComponent  message='Không có thông báo.'  />
            )}
            <div style={{width:'100%',position:'relative'}}>
                {Total!==0  && Total!==null && (
                    <CustomPagination
                        limit={Limit}
                        total={Total}
                        pageRangeDisplayed={4}
                        onChange={handlePagination}
                    />
                )}
            </div>
        </div>
    );
};

export default NotificationListComponent;
