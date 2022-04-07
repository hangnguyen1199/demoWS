import React, { useEffect } from 'react';
import FormRecruitmentMobile from '@spo/components/recruitment/form-mobile';
import FormRecruitmentDesktop from '@spo/components/recruitment/form-desktop';
import UseWindowSize from '@spo/lib/use-window-size';
import { useDispatch } from 'react-redux';
import LocationActions from '@spo/redux/location/action';
import CommonActions from '@spo/redux/common/action';
import RecruitmentActions from '../../../redux/recruitment/action';
import AppActions from '../../../redux/app/action';
import {
    POPUP_SUCCESS_TYPE,
    POPUP_WARNING_TYPE,
} from '../../utils/EventRegister';
import Utils from '../../utils/utils';
import { reset } from 'redux-form';
import useCustomRoute from '../../library/use-custom-route';

const RecruitmentFormContainer = (props) => {
    const dispatch = useDispatch();
    const { width, height } = UseWindowSize();
    useEffect(() => {
        dispatch({
            type: LocationActions.GET_CITY,
        });
        dispatch({
            type: CommonActions.LOAD_BRANCH_MASTER,
            data: {
                type: 1,
            },
        });
    }, []);
    const handleFormSubmit = (data) => {
        data['IsOnBusinessTrip'] = !!Number(data['IsOnBusinessTrip']);
        data['Gender'] = Number(data['Gender']);
        data['Height'] = Number(data['Height']);
        data['Weight'] = Number(data['Weight']);
        data['PlaceOfIDCard'] = Number(data['PlaceOfIDCard']);
        data['PermanentCommuneId'] = Number(data['PermanentCommuneId']);
        data['PermanentDistrictId'] = Number(data['PermanentDistrictId']);
        data['PermanentProvinceId'] = Number(data['PermanentProvinceId']);
        data['TemporaryCommuneId'] = Number(data['TemporaryCommuneId']);
        data['TemporaryDistrictId'] = Number(data['TemporaryDistrictId']);
        data['TemporaryProvinceId'] = Number(data['TemporaryProvinceId']);
        data['RecruitmentId'] = Number(data['RecruitmentId']);
        data['SalaryFrom'] = Number(data['SalaryFrom']);
        data['SalaryTo'] = Number(data['SalaryTo']);

        dispatch({
            type: AppActions.SHOW_LOADING,
            data: true,
        });
        dispatch({
            type: RecruitmentActions.RECRUITMENT_APPLY,
            data: data,
            callback: (msg) => {
                Utils.alertPopup(
                    'Đã hoàn thành thông tin ứng tuyển',
                    POPUP_SUCCESS_TYPE,
                );
                dispatch({
                    type: AppActions.SHOW_LOADING,
                    data: false,
                });
                useCustomRoute(dispatch, '/recruitment');
            },
            fallback: (msg) => {
                Utils.alertPopup(msg, POPUP_WARNING_TYPE);
                dispatch({
                    type: AppActions.SHOW_LOADING,
                    data: false,
                });
            },
        });
    };

    return (
        <div className="recruitment-form-page">
            <div className="recruitment-form">
                {width < 767 ? (
                // <FormRecruitmentDesktop handleFormSubmit={handleFormSubmit} />
                    <FormRecruitmentMobile handleFormSubmit={handleFormSubmit} />
                ) : (
                    <FormRecruitmentDesktop handleFormSubmit={handleFormSubmit} />
                )}
            </div>
        </div>
    );
};
export default RecruitmentFormContainer;
