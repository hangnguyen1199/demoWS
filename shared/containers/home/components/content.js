import dynamic from 'next/dynamic'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Display from '../../../components/common/display'
import CommonHomeContent from './CommonHomeContent'

const ListItems = dynamic(() => import('@spo/components/item/list-items'), {
    ssr: false,
})
const ListLive = dynamic(() => import('@spo/components/item/list-live'), {
    ssr: false,
})
const ListNews = dynamic(() => import('@spo/components/item/list-news-promo'), {
    ssr: false,
})
const BannerSilder = dynamic(
    () => import('@spo/components/home/banner-silder'),
    {
        ssr: false,
    }
)
const HotCategories = dynamic(() => import('./hot-categories'), { ssr: false })
const UpdatedHotCategories = dynamic(() => import('./updated-hot-categories'), {
    ssr: false,
})
import constants from '@spo/config/constants'
import useWindowSize from '@spo/lib/use-window-size'

/**
 * ****************************************************************************
 * HAIDT Content CODE
 * content.js
 *
 * description		:
 * updated at		:	2021-11-11
 * updated by		:	HAIDT
 * package			:	spo\shared\containers\home\components\content.js
 * copyright			:	Copyright (c) HAIDT
 * version			:	1.0.0
 * ****************************************************************************
 */
const Content = (props) => {
    const { Gender } = props
    const { loading, data } = useSelector((state) => state.Home)
    const { width } = useWindowSize()

    return (
        <CommonHomeContent
            CategoryNumOfRow={width < constants.WINDOW_SIZE.MEDIUM ? 3 : 2}
            GenderText="Fm"
            Gender={Gender}
            data={data}
            loading={loading}
            isShowPromotions={true}
            isShowBannerPromotion={false}
        />
    )
}

export default Content
