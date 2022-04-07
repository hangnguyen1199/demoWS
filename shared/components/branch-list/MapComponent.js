import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import GoogleMapComponent from './GoogleMapComponent';
import IconX from '@spo/components/common/icon-x';

MapComponent.propTypes = {
    listBranch: PropTypes.array,
    item: PropTypes.object,
};

MapComponent.defaultProps = {
    listBranch: [],
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

function MapComponent(props) {
    const { listBranch, item } = props;

    const [isShowDetail, setIsShowDetail] = useState(false);

    useEffect(() => {
        if (item?.Address) {
            setIsShowDetail(true);
            findBranchAddress(item);
        }
    }, [item]);

    // useEffect(() => {
    //   if (navigator.geolocation) {
    //     navigator.permissions
    //       .query({ name: 'geolocation' })
    //       .then(function (result) {
    //         if (result.state === 'granted') {
    //           console.log(result.state);
    //           navigator.geolocation.getCurrentPosition(function (position) {
    //             console.log('Latitude is :', position.coords.latitude);
    //             console.log('Longitude is :', position.coords.longitude);
    //           });
    //           //If granted then you can directly call your function here
    //         } else if (result.state === 'prompt') {
    //           navigator.geolocation.getCurrentPosition(function (position) {
    //             console.log('Latitude is :', position.coords.latitude);
    //             console.log('Longitude is :', position.coords.longitude);
    //           });
    //           console.log(result.state);
    //         } else if (result.state === 'denied') {
    //           //If denied then you have to show instructions to enable location
    //         }
    //         result.onchange = function () {
    //           console.log(result.state);
    //         };
    //       });
    //   } else {
    //     alert('Sorry Not available!');
    //   }
    // }, []);

    const _renderDetailBranch = (item) => {
        return (
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
        );
    };
    const refs = {};
    const onMapMounted = (ref) => {
        refs.map = ref;
    };

    const findBranchAddress = (item) => {
        if (refs?.map) {
            const bounds = new google.maps.LatLngBounds();

            const place = new google.maps.LatLng(
                Number(item?.LatOfMap),
                Number(item?.LongOfMap),
            );

            const placeMinus = new google.maps.LatLng(
                Number(item?.LatOfMap) - 0.001,
                Number(item?.LongOfMap) - 0.001,
            );

            const placePlus = new google.maps.LatLng(
                Number(item?.LatOfMap) + 0.001,
                Number(item?.LongOfMap) + 0.001,
            );
            //
            bounds.extend(place);
            bounds.extend(placePlus);
            bounds.extend(placeMinus);
            refs.map.fitBounds(bounds);
        }
    };

    return (
        <div className="map-component">
            <GoogleMapComponent
                googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyChKaBbsGxYejB3WPtF_pwQcyDXuyo4ME8&libraries=places&callback=`}
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div className="map-wrapper" />}
                mapElement={<div style={{ height: `100%` }} />}
                listBranch={listBranch}
                //
                onMapMounted={onMapMounted}
            />
            <div className={`branch-detail ${isShowDetail ? '' : 'd-none'}`}>
                <div className="branch-name d-flex justify-content-between">
                    <p className="mb-0">
                        {'FM '}
                        {`${item?.Address}, ${item?.CommuneName}, ${item?.DistrictName}, ${item?.ProvinceName}`}
                    </p>
                    <div
                        className="d-center link-hover"
                        onClick={() => setIsShowDetail(false)}>
                        <IconX />
                    </div>
                </div>
                <div className="branch-info pl-2">{_renderDetailBranch(item)}</div>
            </div>
        </div>
    );
}

export default MapComponent;
