const FaqContainer = dynamic(() => import('@spo/containers/faq'), {
    ssr: false,
})
import React from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import SpoLayout from '@spo/containers/layout/spo-layout'
import constants from '@spo/config/constants'

function Faq() {
    return (
        <>
            <Head>
                <title>{`${constants.TITLE_TAB}Câu hỏi thường gặp`}</title>
            </Head>
            <FaqContainer />
        </>
    )
}

Faq.Layout = SpoLayout
export default Faq
