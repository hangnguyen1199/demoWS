// const SpoLayout = dynamic(() => import('@spo/containers/layout/spo-layout'), {
//     ssr: false,
// });
import constants from '@spo/config/constants';
import SpoLayout from '@spo/containers/layout/spo-layout';
import Head from 'next/head';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import WishlistContainer from '../../shared/containers/wishlist';
import WishlistActions from '@spo/redux/wishlist/action';
import { routeGuard } from '../../shared/library/helper';
import { useRouter } from 'next/router';

const Wishlist = (props) => {
    const dispatch = useDispatch();
    const router=useRouter();
    useEffect(() => {
        let param = {};
        param['Type'] = constants.TYPE_SEARCH.PRODUCT_TYPE.PRODUCT_WHISHLIST;
        param['Limit'] = constants.PAGINATION_PRODUCT_LIST.LIMIT;
        param['Offset'] = router.query[constants.ROUTER_NAME.PAGE] ? ((router.query[constants.ROUTER_NAME.PAGE])-1)*constants.PAGINATION_PRODUCT_LIST.LIMIT : constants.PAGINATION_PRODUCT_LIST.OFFSET;
        dispatch({ type: WishlistActions.LOAD_WISHLIST, data: param });
    }, [router.query]);
    return (
        <>
            <Head>
                <title>{`${constants.TITLE_TAB  } Danh sách yêu thích`}</title>
            </Head>
            <WishlistContainer />
        </>
    );
};

Wishlist.Layout = SpoLayout;
export async function getServerSideProps(ctx) {
    return await routeGuard(ctx, 'user');
}
export default Wishlist;
