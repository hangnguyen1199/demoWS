import AppActions from '@spo/redux/app/action';
import { Router } from '@spo/routes';
import router from 'next/router';

export const useCustomRoute = (
    dispatch,
    pathname = '/',
    params = {},
    loading = true,
    callback = null,
    type = 1,
    isSavePathNameToLocal = false,
) => {
    if (isSavePathNameToLocal) {
        sessionStorage.setItem('originUrlBeforeRedirecting', pathname);
    }
    switch (type) {
        case 1:
            if (loading) {
                dispatch(AppActions.callLoading());
                Router.pushRoute(pathname, params).then(() => {
                    dispatch(AppActions.closeLoading());
                    setTimeout(() => {
                        window.scroll({
                            top: 0,
                            left: 0,
                        });
                    }, 0);
                    callback;
                });
            } else {
                Router.pushRoute(pathname, params).then(() => {
                    setTimeout(() => {
                        window.scroll({
                            top: 0,
                            left: 0,
                        });
                    }, 0);
                });
            }
            break;
        case 2:
            Router.pushRoute(pathname, params);
            break;
        case 3:
            router.push({
                pathname: pathname,
                query: params
            });
            break;
        default:
            Router.pushRoute(pathname, params);
            break;
    }
};

export default useCustomRoute;
