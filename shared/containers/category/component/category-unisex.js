import React from 'react';
import { GENDER } from '../../../config/constants';
import CommonHomeContent from '../../home/components/CommonHomeContent';

function CategoryUnisexContainer (props) {
    const { Gender } = props
    return (
        <CommonHomeContent GenderText={GENDER.Unisex.Tag} Gender={Gender} isShowCollection={true} isShowNews={false} />
    )
}
export default CategoryUnisexContainer;