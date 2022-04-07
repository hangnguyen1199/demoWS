import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import useOnClickOutside from '@spo/lib/use-onclick-outside';
import constants from '@spo/config/constants';
import { openNewTab } from '../../library/helper';
import NotificationActions from '@spo/redux/notification/action';
import Image from './../common/image';
import { formatDistanceToNow } from 'date-fns';
import vi from 'date-fns/locale/vi';
import { useCustomRoute } from '@spo/lib/use-custom-route';

function Notification(props) {
    const ref = useRef(null);
    const { _state, list } = props;
    const dispatch = useDispatch();
    useOnClickOutside(ref, () => {
        if (_state.clicking) {
            props.onClickShowNoti();
            // dispatch(AppActions.closeTopCart());
        }
    });
    const onGoToLink = (item) => {
        // Update read flag
        if (item.read_flag == constants.R005.UNREAD.CODE) {
            dispatch({
                type: NotificationActions.UPDATE_STATUS_NOTIFICATION,
                data: item.notification_id,
            });
        }
        // Open new tab
        if (item.reference_link) {
            openNewTab(item.reference_link);
        }
    };
    const onViewAll = (e) => {
        e.preventDefault()
        useCustomRoute(dispatch, '/user-profile?tab=4');
    };
    return (
        <span className="notification" ref={ref}>
            <div
                className={`header-cart block block-cart d-flex flex-wrap ${_state.className} `}>
                {list.length > 0 ? (
                    <>
                        {list.map((item, index) => {
                            return (
                                <div
                                    onClick={() => onGoToLink(item)}
                                    key={index}
                                    className={`item_noti ${
                                        item.read_flag ==
                                        constants.R005.UNREAD.CODE
                                            ? 'unread'
                                            : ''
                                    }`}>
                                    <div className="wrap_avatar">
                                        <div className="avatar">
                                            <Image
                                                seo="avatar-outifz"
                                                title="avatar Outfiz"
                                                className="w-100 h-100"
                                                defaultImage="/images/icon/logo_fm_2.svg"
                                                src=""
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <div
                                            className="content"
                                            dangerouslySetInnerHTML={{
                                                __html: item.contents,
                                            }}></div>
                                        <div className="d-start date">
                                            {formatDistanceToNow(
                                                new Date(item.published_date),
                                                { addSuffix: true, locale: vi },
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                        <div className="d-center w-100 font-weight-bold p-2 ">
                            <a
                                href=""
                                className="text-dark "
                                onClick={onViewAll}>
                                Xem tất cả
                            </a>
                        </div>
                    </>
                ) : (
                    <span className="p-3 text-center w-100 h-100">
                        Chưa có thông báo
                    </span>
                )}
            </div>
        </span>
    );
}
Notification.defaultProps = {
    list: [
    ],
};
export default Notification;
