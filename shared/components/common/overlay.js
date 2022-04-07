import React from 'react';
import { useDispatch } from 'react-redux';
import AppActions from '@spo/redux/app/action';
import PropTypes from 'prop-types';

function Overlay (props) {
    const dispatch = useDispatch();
    return (
        props.overlay && (
            <div
                onClick={() => dispatch(AppActions.closeOverlay())}
                className="overlay"
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    // backgroundColor: '#ffffff24',
                    zIndex: 9999999999,
                }}></div>
        )
    );
};
Overlay.propTypes = {
    overlay: PropTypes.bool,
};
Overlay.defaultProps = {
    overlay: false
}
export default React.memo(Overlay)