import ButtonDark from '@spo/components/common/button-dark';
import Image from '@spo/components/common/image';
import SwitchButton from '@spo/components/common/switch-button';
import constants from '@spo/config/constants';
import { useCustomRoute } from '@spo/lib/use-custom-route';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Currency from 'react-currency-formatter';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import CheckBox from '../common/check-box';
import ButtonPrimary from './../common/button-primary';
import Link from 'next/link';
/**
 * ****************************************************************************
 * DUNGNT RowItem CODE
 * row-item.js
 *
 * description		:
 * created at		:	2020-12-17
 * created by		:	DungNT
 * package			:	spo\shared\components\analysis-management\row-item.js
 * copyright			:	Copyright (c) DungNT
 * version			:	1.0.0
 * ****************************************************************************
 */

export default function RowItem(props) {
    const { item, _index } = props;
    const router = useRouter();
    const dispatch = useDispatch();
    //----------------------------------------------
    // Effect
    //----------------------------------------------

    //----------------------------------------------
    // Function
    //----------------------------------------------
    // const onGoDetail = () => {
    //     window.open(
    //         `/item?slug=${item.slug}-${item.item_brand_code}`,
    //         '_blank',
    //     );
    //     // useCustomRoute(dispatch, 'item', {
    //     //     slug: `${item.slug}-${item.item_brand_code}`,
    //     // });
    // };
    const onUpdateStatus = (item_id, item_status) => {
        if (typeof props.onUpdateStatus == 'function') {
            props.onUpdateStatus(item_id, item_status);
        }
    };
    const onDelete = (item) => {
        if (typeof props.onDelete == 'function') {
            props.onDelete(item);
        }
    };
    const onEditItem = () => {
        useCustomRoute(dispatch, 'quan-ly-shop/item/edit', {
            id: item.item_id,
        });
    };
    const onChangeStatus = () => {
        onUpdateStatus(
            item.item_id,
            item.item_status == constants.I002.DISABLE.CODE
                ? constants.I002.AVAILABLE.CODE
                : constants.I002.DISABLE.CODE,
        );
    };
    return (
        <tr>
            <td>
                {Number.parseInt(_index + 1) +
                    Number.parseInt(
                        router.query[constants.PARAM_URL.OFFSET] ?? 0,
                    )}
            </td>
            <td>
                <div className="d-start product ">
                    <div className="image pointer position-relative">
                        <Link
                            prefetch={false}
                            href="/item/[slug]"
                            as={`/item/${item.slug}-${item.item_brand_code}`}>
                            <a
                                className="square-container "
                                style={{ width: 100 }}>
                                <Image
                                    className="square w-100 h-100"
                                    src={item.image}
                                />
                            </a>
                        </Link>

                        {item.outfiz_review_result != null &&
                            item.outfiz_review_result !=
                                constants.R010.OK.CODE && (
                            <div className="banned">
                                <Image
                                    className=""
                                    style={{ width: 100 }}
                                    src={'/images/config/banned.png'}
                                />
                            </div>
                        )}
                    </div>
                    <div className="d-flex flex-column px-2">
                        <Link
                            prefetch={false}
                            href="/item/[slug]"
                            as={`/item/${item.slug}-${item.item_brand_code}`}>
                            <a className="font-weight-bold link-hover">
                                {item.item_name}
                            </a>
                        </Link>

                        <div className="d-start">
                            <div className="sub-title">Slug:</div>
                            <div className="px-2">{item.slug}</div>
                        </div>
                        <div className="d-start">
                            <div className="sub-title">Brand code:</div>
                            <div className="px-2">{item.item_brand_code}</div>
                        </div>
                        <div className="d-start">
                            <div className="sub-title">Nhãn hiệu:</div>
                            <div className="px-2">{item.brand_name}</div>
                        </div>
                    </div>
                </div>
            </td>
            <td>
                <div>
                    <Currency
                        quantity={item.base_price}
                        currency="VND"
                        pattern="##,### !"
                    />
                </div>
            </td>
            <td>
                <div>{item.item_num}</div>
            </td>
            <td>{item.item_sale_num}</td>
            <td>
                <div className="product-labels">
                    {item.rate > 0 && (
                        <>
                            <span className="lbl on-sale">{item.rate}%</span>
                        </>
                    )}
                    {item.is_new && (
                        <span className="lbl pr-label1">
                            <FormattedMessage id="common.new" />
                        </span>
                    )}
                    {item.is_hot && (
                        <span className="lbl pr-label2">
                            <FormattedMessage id="common.hot" />
                        </span>
                    )}
                </div>
            </td>
            <td>
                {item.outfiz_review_result != null &&
                item.outfiz_review_result != constants.R010.OK.CODE ? (
                        <span className="lbl_notvalid">Vi phạm</span>
                    ) : (
                        <span className="lbl_valid">Đã duyệt</span>
                    )}
            </td>
        </tr>
    );
}
