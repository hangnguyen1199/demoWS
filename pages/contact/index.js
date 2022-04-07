const ContactContainer = dynamic(() => import('@spo/containers/contact'), {
    ssr: false,
});
import React from 'react'
import Head from 'next/head';
import dynamic from 'next/dynamic';
import SpoLayout from '@spo/containers/layout/spo-layout';
import constants from '@spo/config/constants';

function Contact() {
    return (
        <>
            <Head>
                <title>
                    {`${constants.TITLE_TAB  }Liên Hệ`}
                </title>
            </Head>
            <ContactContainer />
        </>
    )
}

Contact.Layout = SpoLayout;
export default Contact;