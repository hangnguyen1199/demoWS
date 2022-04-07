import React from 'react';
import CustomFrame from "@spo/components/common/custom-frame";
import Image from "@spo/components/common/image";
import Link from 'next/link';
import constants from '../../config/constants';
import {Router} from '@spo/routes';
import { useRouter } from 'next/router';
import PageList from '../../config/PageList';

export default function ItemChild (props) {
    const router = useRouter();
    const handleClick = (e) => {
        e.preventDefault()
        e.stopPropagation()
        let param = router.query
        if (props?.value?.GenderId) {
            param['gt']= constants.GENDER_ID[props?.value?.GenderId]
        }
        if (props?.value?.CategorySlug) {
            param['sp']= props?.value?.CategorySlug;
        }
        if (props?.value?.SizeId) {
            param['SizeId']= props?.value?.SizeId;
        }

        router.push({
            pathname: PageList.PRODUCT_LIST.SERVER,
            query: param
        })
    }
    const generateLink = (value) => {
        let param = router.query
        if (props?.value?.GenderId) {
            param['gt']= constants.GENDER_ID[props?.value?.GenderId]
        }
        if (props?.value?.CategorySlug) {
            param['sp']= props?.value?.CategorySlug;
        }
        if (props?.value?.SizeId) {
            param['SizeId']= props?.value?.SizeId;
        }
        return {
            pathname: PageList.PRODUCT_LIST.SERVER,
            query: param
        }
    };
    return (
        <div className={`${props.className} container-child-item`}>
            <Link prefetch={false}
			 href={generateLink()}
			   >
                <a className="w-100" onClick={(e)=>handleClick(e)}>
                    <Image className="w-100 h-100" lazyLoad={false} src={props.value.WebImage}  />
                </a>
            </Link>
            {/* <CustomFrame ratio={376 / 356}>
				<Image className="w-100 h-100" lazyLoad={false} src={props.value.images} />
			</CustomFrame>
			<div className='detail'>
				<p>{props.value.title}</p>
				<span>({props.value.detail} tháng)</span>
			</div> */}


        </div>
    )
}
