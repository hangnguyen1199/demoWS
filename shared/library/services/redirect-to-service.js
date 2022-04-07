import { ServerResponse } from 'http';
// import { Router } from "next/router";
import { Router } from '@spo/routes';
import { useRouter } from 'next/router';
import PageList from '../../config/PageList';

// eslint-disable-next-line import/prefer-default-export
export const redirectToService = (server, path = PageList.SIGNIN.SERVER, query = {}) => {
    return {
        redirect: {
            permanent: false,
            destination: path,
        },
    };
    // if (typeof window != 'undefined') {
    //     Router.pushRoute(path, query);
    // } else if (server.res && typeof server.res.writeHead == 'function') {
    //     // console.log("SERVER SIDE", path, server.res);
    //     server.res.writeHead(302, {
    //         Location: path,
    //     });
    //     server.res.end();
    // }
};
