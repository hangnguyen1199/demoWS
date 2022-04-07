import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MyReviewsActions from '@spo/redux/my-reviews/action';

import ButtonDark from '@spo/components/common/button-dark';
import ButtonLight from '@spo/components/common/button-light';
import IconEmojiFrowning from '@spo/components/common/icon-emoji-frowning';
import IconEmojiNeutral from '@spo/components/common/icon-emoji-neutral';
import IconEmojiSmiling from '@spo/components/common/icon-emoji-smiling';
import ReviewChatModal from './review-chat-modal';
import ChatDetailModal from './chat-detail-modal';
import ButtonMain from '../common/button-main';

const ChatReviewItem = (props) => {
    const dispatch = useDispatch();
    const { data, reloadReview } = props;
    const { chatDetail } = useSelector((state) => state.MyReviews.data);
    const [showPopupReview, setShowPopupReview] = useState(false);
    const [showPopupDetail, setShowPopupDetail] = useState(false);
    const toDateString = (str) => {
        return `${str.substring(8,10)}.${str.substring(5,7)}.${str.substring(0,4)} - ${str.substring(11,16)}`;
    };
    const onReview = (rate) => {
        let formData = new FormData();
        if(data?.Review) {
            formData.append('ReviewId', data.Review.Id);
        }
        formData.append('ConventionId', data.Id);
        formData.append('Rate', rate);
        dispatch({
            type: MyReviewsActions.SAVE_CHAT_REVIEW,
            data: formData,
            callback: {
                success: (response) => {
                    setShowPopupReview(false);
                    if(response.data.Code == 200 && reloadReview) {
                        reloadReview();
                    }
                }
            }
        });
    };
    const showChatDetail = () => {
        dispatch({
            type: MyReviewsActions.GET_CHAT_DETAIL,
            queryParams: {
                Id: data.Id
            },
            callback: {
                success: (response) => {
                    setShowPopupDetail(true);
                }
            }
        });
    };
    return (
        <div className="chat-review-item">
            <div className="review-header" onClick={()=>{showChatDetail()}}>
                <p>{toDateString(data.CreatedAt)}</p>
                <p className="text-right status-name">{data.Status == 30 ? 'Đã xong' : data.Status == 20 ? 'Đang xử lý' : 'Mới'}</p>
            </div>
            <div className="review-content">
                <div className="chat-info" onClick={()=>{showChatDetail()}}>
                    <p><b>{data.Type == 10 ? 'Số góp ý' : data.Type == 20 ? 'Số khiếu nại' : 'Số giải đáp'}: {data.Name}</b></p>
                    <p>{data.Content}</p>
                    <p className={`rate rate-${data.Review}`}>
                        {data?.Review?.Rate == 3 && <IconEmojiSmiling fill="#0DBC00" width="40" height="40"/>}
                        {data?.Review?.Rate == 2 && <IconEmojiNeutral fill="#FFD500" width="40" height="40"/>}
                        {data?.Review?.Rate == 1 && <IconEmojiFrowning fill="#FF2C00" width="40" height="40"/>}
                    </p>
                </div>
                <div className="div-button">
                    {data?.Review == null ?
                        <ButtonLight
                            className="btn-order py-3"
                            title={'Đánh giá ngay'}
                            onClick={()=>{setShowPopupReview(true)}}
                            fontSize={14}
                        />:
                        <ButtonMain
                            className="btn-order"
                            title={'Đánh giá lại'}
                            onClick={()=>{setShowPopupReview(true)}}
                            fontSize={14}
                        />
                    }
                </div>
            </div>
            {showPopupReview &&
                <ReviewChatModal
                    review={data?.Review}
                    onReview={(rate) => {onReview(rate)}}
                    onHide={()=>{setShowPopupReview(false)}}
                />
            }
            {showPopupDetail && chatDetail && 
                <ChatDetailModal
                    convention={chatDetail}
                    onHide={()=>{setShowPopupDetail(false)}}
                />
            }
        </div>
    );
};

export default ChatReviewItem;
