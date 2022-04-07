import React from 'react';
import constants from '@spo/config/constants';
import { useIntl } from 'react-intl';

function CallButton(props) {
    const intl = useIntl()
    return (
        <div
            className="float-button call-button"
            title={intl.formatMessage({
                id: 'common.call_now',
            })}>
            <a href={`tel:${constants.phone}`}>
                <div className="circle">
                    <i className="fa fa-phone"></i>
                </div>
            </a>
        </div>
    );
}
export default CallButton;
