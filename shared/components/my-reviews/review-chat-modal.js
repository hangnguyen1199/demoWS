import React, { useState } from 'react';

import ButtonDark from '@spo/components/common/button-dark';
import IconEmojiFrowning from '@spo/components/common/icon-emoji-frowning';
import IconEmojiNeutral from '@spo/components/common/icon-emoji-neutral';
import IconEmojiSmiling from '@spo/components/common/icon-emoji-smiling';

const ReviewChatModal = (props) => {
    const { review, onReview, onHide } = props;
    const [rate, setRate] = useState(review ? review.Rate : 3);
    return (
        <>
            <div className="chat-review-modal-bg"></div>
            <div className="chat-review-modal">
                <div className="review-content">
                    <div className="rate-content">
                        <button className='close' onClick={()=>{onHide()}}>x</button>
                        <p>Bạn có hài lòng về dịch vụ CSKH<br/>của <span className='red'>FM Plus</span> không?</p>
                        <p className={`rate rate-${rate}`}>
                            <IconEmojiFrowning fill={rate == 1 ? '#FF2C00' : '#d8d7d7'} width="40" height="40" attr={{onClick: ()=>{setRate(1)}}}/>
                            <IconEmojiNeutral fill={rate == 2 ? '#FFD500' : '#d8d7d7'} width="40" height="40" attr={{onClick: ()=>{setRate(2)}}}/>
                            <IconEmojiSmiling fill={rate == 3 ? '#0DBC00' : '#d8d7d7'} width="40" height="40" attr={{onClick: ()=>{setRate(3)}}}/>
                        </p>
                    </div>
                    <div className="div-button-review">
                        <ButtonDark
                            className="btn-review py-3"
                            title={'Xác nhận'}
                            onClick={()=>{onReview(rate)}}
                            fontSize={14}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default ReviewChatModal;
