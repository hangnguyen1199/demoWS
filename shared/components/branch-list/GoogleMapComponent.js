import React, { useState } from 'react';
import {
    withGoogleMap,
    withScriptjs,
    GoogleMap,
    Marker,
    InfoWindow,
} from 'react-google-maps';
import MarkerShop from '../../../public/images/icon/ic_marker_shop.svg';
import InfoBox from 'react-google-maps/lib/components/addons/InfoBox';

const options = { closeBoxURL: '', enableEventPropagation: true };

const GoogleMapComponent = (props) => {
    const { listBranch, onMapMounted } = props;
    const [activeMarker, setActiveMarker] = useState({});
    const [showingInfoWindow, setShowingInfoWindow] = useState(false);

    const onMarkerClick = (props, item) => {
        setActiveMarker({
            lat: props?.latLng?.lat(),
            lng: props?.latLng?.lng(),
        });
        setShowingInfoWindow(true);
    };

    const onInfoWindowClose = () => {
        setActiveMarker(null);
        setShowingInfoWindow(false);
    };

    return (
        <div>
            <GoogleMap
                ref={onMapMounted}
                defaultZoom={12}
                defaultCenter={{ lat: 16.047079, lng: 108.20623 }}>
                {listBranch &&
          listBranch.map((item, index) => {
              return (
                  <Marker
                      position={{
                          lat: Number(item?.LatOfMap),
                          lng: Number(item?.LongOfMap),
                      }}
                      key={index}
                      onClick={(props) => {
                          onMarkerClick(props, item);
                      }}
                      icon={MarkerShop}>
                      {showingInfoWindow &&
                  Number(item?.LatOfMap) === Number(activeMarker?.lat) &&
                  Number(item?.LongOfMap) === Number(activeMarker?.lng) && (
                          <InfoWindow onClose={onInfoWindowClose}>
                              <>
                                  <div
                                      style={{
                                          backgroundColor: 'white',
                                          borderRadius: '0.5em',
                                          padding: '0.5em',
                                      }}>
                                      <p className="mb-0">
                                          {'FM '}
                                          {`${item?.Address}, ${item?.CommuneName}, ${item?.DistrictName}, ${item?.ProvinceName}`}
                                      </p>
                                      <p className="mb-0">{item?.Phone}</p>
                                  </div>
                              </>
                          </InfoWindow>
                      )}
                  </Marker>
              );
          })}
            </GoogleMap>
        </div>
    );
};

export default withScriptjs(withGoogleMap(GoogleMapComponent));
