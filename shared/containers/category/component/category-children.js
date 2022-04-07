import React from 'react';
import { GENDER } from '../../../config/constants';
import CommonHomeContent from '../../home/components/CommonHomeContent';

function CategoryChildrenContainer (props) {
    const { Gender } = props
    return (
        <CommonHomeContent GenderText={GENDER.Child.Tag} Gender={Gender} isShowCollection={true} isShowNews={false} isChild={true} />
    )
}
export default CategoryChildrenContainer;