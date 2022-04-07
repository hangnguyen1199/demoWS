const PolicyContainer = dynamic(() => import('@spo/containers/policy'), {
    ssr: false,
});
import React from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import SpoLayout from '@spo/containers/layout/spo-layout';
import constants from '@spo/config/constants';
import axios from 'axios';

const Policy = (props) => {
    const { item } = props;
    return (
        <>
            <Head>
                <title>
                    {`${constants.TITLE_TAB  }Điều khoản và chính sách`}
                </title>
            </Head>
            <PolicyContainer
                dataTermsOfUse={item?.dataTermsOfUse?.TermsOfUse}
                dataMemberPolicy={item?.dataMember?.MemberPolicy}
                dataWarrantyPolicy={item?.dataWarrantyPolicy?.WarrantyPolicy}
                dataReturnPolicy={item?.dataReturnPolicy?.ReturnPolicy}
                dataPrivacyPolicy={item?.dataPrivatePolicy?.PrivacyPolicy}
                dataShippingPolicy={item?.dataShippingPolicy?.ShippingPolicy}
            />
        </>
    );
};

Policy.Layout = SpoLayout;
export async function getServerSideProps(ctx) {
    let item = {};
    let errorCode = false;
    try {
        let url = process.env.API_URL;
        let dataMember = await axios({
            method: 'GET',
            url: `${url}/master/settings/member-policy`,
        });
        let dataTermsOfUse = await axios({
            method: 'GET',
            url: `${url}/master/settings/terms-of-use`,
        });
        let dataWarrantyPolicy = await axios({
            method: 'GET',
            url: `${url}/master/settings/warranty-policy`,
        });
        let dataReturnPolicy = await axios({
            method: 'GET',
            url: `${url}/master/settings/return-policy`,
        });
        let dataPrivatePolicy = await axios({
            method: 'GET',
            url: `${url}/master/settings/private-policy`,
        });
        let dataShippingPolicy = await axios({
            method: 'GET',
            url: `${url}/master/settings/shipping-policy`,
        });
        item.dataMember = dataMember.data;
        item.dataTermsOfUse = dataTermsOfUse.data;
        item.dataReturnPolicy = dataReturnPolicy.data;
        item.dataWarrantyPolicy = dataWarrantyPolicy.data;
        item.dataPrivatePolicy = dataPrivatePolicy.data;
        item.dataShippingPolicy = dataShippingPolicy.data;

        
    } catch (error) {
        errorCode = 404;
    }
    return { props: { errorCode, item: item } };
}
export default Policy;
