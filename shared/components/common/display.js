import React from 'react';
import useWindowSize from '@spo/lib/use-window-size';
import constants from '@spo/config/constants';

function Display(props) {
    const { mobile, children, show } = props;
    const windowSize = useWindowSize();
    return show
        ? mobile
            ? windowSize?.width < constants.WINDOW_SIZE.MEDIUM && children
            : windowSize?.width >= constants.WINDOW_SIZE.MEDIUM && children
        : null;
}
Display.defaultProps = {
    mobile: false,
    show: true,
};
export default Display;
