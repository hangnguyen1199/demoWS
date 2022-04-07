// log the pageview with their URL
import constants from './../../config/constants';

export const pageview = (url) => {
    // window.gtag('config', constants.NEXT_PUBLIC_GOOGLE_ANALYTICS, {
    //     page_path: url,
    // });
};

// log specific events happening.
export const event = ({ action, params }) => {
    // window.gtag('event', action, params);
};
