import React from 'react';
import { GENDER } from '../../../config/constants';
import CommonHomeContent from '../../home/components/CommonHomeContent';

function CategoryCoupleContainer (props) {
    const { Gender } = props
    return (
        <CommonHomeContent GenderText={GENDER.Couple.Tag} Gender={Gender} isShowCollection={true} isShowNews={false} />
    )
}
export default CategoryCoupleContainer;