import AppActions from '@spo/redux/app/action';
import { Router } from '@spo/routes';
import router from 'next/router';
import EventRegister, { SHOW_LOADING } from '../utils/EventRegister';
import PageList from '../config/PageList';

export const PUSH_ROUTE_WITH_LOADING = 1;
export const getUrlDynamic = (field, id) => {
    return {
        url: {
            pathname: PageList[field].ROUTE,
            query: {
                slug: id,
            },
        },
        as: {
            pathname: `${PageList[field].INDEX}${id}`,
        },
        showLoading: true,
    };
};
export const getHref = (field, id) => {
    return {
        href: {
            pathname: PageList[field].ROUTE,
            query: {
                slug: id,
            },
        },
        as: {
            pathname: `${PageList[field].INDEX}${id}`,
        },
    };
};
export const back = () => {
    const routeName = sessionStorage.getItem('RouteName');
    const routeData = sessionStorage.getItem('RouteData');
    if (routeName) {
        sessionStorage.removeItem('RouteName');
        sessionStorage.removeItem('RouteData');
        navigate({ ...getUrlDynamic(routeName, routeData ?? null) });
    } else {
        Router.back();
    }
};
export const navigate = ({
    url,
    as = {},
    option,
    callback = null,
    type = PUSH_ROUTE_WITH_LOADING,
    saveHistory = false,
    showLoading = false,
    pageName = '', // example : ITEM, CATEGORY
    pageData = '', // example: AO-HOA-REN
}) => {
    if (saveHistory) {
        sessionStorage.setItem('RouteName', pageName);
        if (pageName) {
            sessionStorage.setItem('RouteData', pageData ?? url?.query?.slug);
        }
    }
    if (showLoading) {
        EventRegister.emit(SHOW_LOADING, true);
    }
    switch (type) {
        case 1:
            router.push(url, as, option);
            break;
        default:
            router.push(url, as, option);
            break;
    }
};

export default navigate;
