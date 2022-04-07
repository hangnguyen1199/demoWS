import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MyReviewsActions from '@spo/redux/my-reviews/action';

import OrderReviewItem from './order-review-item'

const ListReviewOrder = (props) => {
    const { data } = props;
    return (
        <div className="list-reviews-order">
            {data.Reviews && data.Reviews.map((item, index) => (
                <OrderReviewItem
                    key={index}
                    data={item}
                />
            ))}
        </div>
    );
};

export default ListReviewOrder;
