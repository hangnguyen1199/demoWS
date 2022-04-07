import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MyReviewsActions from '@spo/redux/my-reviews/action';

import ChatReviewItem from './chat-review-item'

const ListReviewChat = (props) => {
    const { data, reloadReview } = props;
    return (
        <div className="list-reviews-chat">
            {data.Conventions && data.Conventions.map((item, index) => (
                <ChatReviewItem
                    key={index}
                    data={item}
                    reloadReview={reloadReview}
                />
            ))}
        </div>
    );
};

export default ListReviewChat;
