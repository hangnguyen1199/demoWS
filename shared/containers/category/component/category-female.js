import constants from '@spo/config/constants';
import HomeActions from '@spo/redux/home/action';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GENDER } from '../../../config/constants';
import CommonHomeContent from '../../home/components/CommonHomeContent';

function CategoryFeMaleContainer (props) {
    const { Gender } = props

    return (
        <CommonHomeContent GenderText={GENDER.Female.Tag} Gender={Gender} isShowCollection={true} isShowNews={false} />
    )
}
export default CategoryFeMaleContainer;