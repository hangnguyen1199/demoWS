import React from 'react';
import PropTypes from 'prop-types';
import Image from '@spo/components/common/image';
import UseWindowSize from './../../library/use-window-size';

BranchRowComponent.propTypes = {
    item: PropTypes.object,
};

BranchRowComponent.defaultProps = {
    item: {
        Address: '',
        CommuneName: '',
        DistrictName: '',
        ProvinceName: '',
        Phone: '',
        WorkingTime: '',
        IsOffline: false,
        IsHoliday: false,
    },
};

function BranchRowComponent(props) {
    const { item } = props;
    const { width } = UseWindowSize();
    return (
        <div className="d-flex justify-content-between branch-row-wrapper">
            <div className="info">
                {/* <div className="distance-from-user info-row">(~ 4.95 km)</div> */}
                <div className="d-flex info-row">
                    <img className="icon-style-normal" src={`/images/icon/marker.svg`} />
                    <p>
                        {': '}
                        {`${item?.Address}, ${item?.CommuneName}, ${item?.DistrictName}, ${item?.ProvinceName}`}
                    </p>
                </div>
                <div className="d-flex info-row">
                    <img className="icon-style-small" src={`/images/icon/ic_phone.svg`} />
                    <p>
                        {': '}
                        {item?.Phone || '0997.688.816'}
                    </p>
                </div>
                <div className="d-flex info-row">
                    <img
                        className="icon-style-small"
                        src={`/images/icon/time-delivery.svg`}
                    />
                    <p className="mb-0 mr-2">
                        {': '}
                        {item?.WorkingTime || '07h00 - 22h30'}
                    </p>
                    {item?.IsOffline && <div className="offline-status">Nghỉ dịch</div>}
                    {item?.IsHoliday && (
                        <div className="holiday-status">Nghỉ Lễ 30/4 - 1/5</div>
                    )}
                </div>
            </div>
      
            {width<1025?<div className="mobile-action-icon">
                <div className="mr-2">
                    <a href={`tel:${item?.Phone || '0997.688.816'}`}>
                        <img
                            className="icon-style-small"
                            src={`/images/icon/ic_phone_out.svg`}
                        />
                    </a>
                </div>
                <div>
                    <a href={`https://maps.google.com/?q=${item.LatOfMap},${item.LongOfMap}`}> <img className="icon-style-small" src={`/images/icon/ic_map.svg`} /></a>
                </div>
            </div>:<div className="d-flex action-icon">
                <div className="mr-2">
                    <a href={`tel:${item?.Phone || '0997.688.816'}`}>
                        <img
                            className="icon-style-small"
                            src={`/images/icon/ic_phone_out.svg`}
                        />
                    </a>
                </div>
                <div>
                    <a href={`https://maps.google.com/?q=${item.LatOfMap},${item.LongOfMap}`}> <img className="icon-style-small" src={`/images/icon/ic_map.svg`} /></a>
                </div>
            </div>}
      
        </div>
    );
}

export default BranchRowComponent;
