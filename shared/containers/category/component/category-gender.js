import React from 'react'
import Link from 'next/link';
import constants from '@spo/config/constants';
import { useCustomRoute } from '@spo/lib/use-custom-route';
import CustomFrame from '@spo/components/common/custom-frame';
import _ from 'lodash';
import PageList from '../../../config/PageList';

function Categorygender(props) {
    const { categories } = props;
    let categoriesImage = [
        { img: "boy-ao.png", key: "Nam-Áo" },
        { img: "boy-dobo.png", key: "Nam-đồ bộ" },
        { img: "boy-phukien.png", key: "Nam-Phụ kiện" },
        { img: "boy-quan.png", key: "Nam-Quần" },
        { img: "boy.png", key: "Nam" },
        { img: "child-boy-ao.png", key: "Bé trai-Áo" },
        { img: "child-boy-dobo.png", key: "Bé trai-đồ bộ" },
        { img: "child-boy-phukien.png", key: "Bé trai-Phụ kiện" },
        { img: "child-boy-quan.png", key: "Bé trai-Quần" },
        { img: "child-boy.png", key: "Bé trai" },
        { img: "child-girl-ao.png", key: "Bé gái-Áo" },
        { img: "child-girl-dobo.png", key: "Bé gái-đồ bộ" },
        { img: "child-girl-phukien.png", key: "Bé gái-Phụ kiện" },
        { img: "child-girl-vay.png", key: "Bé gái-váy" },
        { img: "child-girl-quan.png", key: "Bé gái-Quần" },
        { img: "child-girl.png", key: "Bé gái" },
        { img: "couple-ao.png", key: "Đồ cặp-Áo" },
        { img: "couple-phukien.png", key: "Đồ cặp-Phụ kiện" },
        { img: "couple-quan.png", key: "Đồ cặp-Quần" },
        { img: "couple.png", key: "Đồ cặp" },
        { img: "girl-ao.png", key: "Nữ-Áo" },
        { img: "girl-dobo.png", key: "Nữ-đồ bộ" },
        { img: "girl-jumpsuit.png", key: "Nữ-Jumpsuit" },
        { img: "girl-phukien.png", key: "Nữ-Phụ kiện" },
        { img: "girl-quan.png", key: "Nữ-Quần" },
        { img: "girl-vay.png", key: "Nữ-váy" },
        { img: "girl.png", key: "Nữ" },
        { img: "unisex-ao.png", key: "Unisex-Áo" },
        { img: "unisex-phukien.png", key: "Unisex-Phụ kiện" },
        { img: "unisex-quan.png", key: "Unisex-Quần" },
        { img: "unisex.png", key: "Unisex" },
    ]
    function getImage(key) {
        if (!key) {
            return "";
        }
        let imgFind = _.find(categoriesImage, function (ct) {
            return ct.key.toString().toLowerCase() == key.toLowerCase();
        })
        return `/images/category/${  imgFind?.img}`;
    }

    const handleOnClickLink = (url) => {
        useCustomRoute(dispatch, url);
    }
    return (
        <>
            <div className="" style={{ paddingBottom: 10 }}>
                <div className="row px-0 mx-0 d-flex">
                    <Link href={`${PageList.PRODUCT_LIST.SERVER}/?gt=${constants.GENDER_ID[categories[0]?.GenderId]}`}
                        onClick={
                            () => {
                                handleOnClickLink(`${PageList.PRODUCT_LIST.SERVER}/?gt=${constants.GENDER_ID[categories[0]?.GenderId]}`)
                            }}
                    >
                        <a className='w-100 h-100'>
                            <CustomFrame ratio={722 / 1920}>
                                <div className={`col-12 px-0 category-img`} style={{ backgroundImage: `url(${getImage(categories[0]?.GenderName)})` }}>
                                    <div className="d-center category-button-gender">
                                        <div className='pointer d-center see-more-gender'>
                      Xem thêm
                                        </div>
                                    </div>
                                </div>
                            </CustomFrame>
                        </a>
                    </Link>
                    {categories[0]?.ListCategory?.map((cate, index) => (
                        <Link key={index} href={`${PageList.PRODUCT_LIST.SERVER}/?gt=${constants.GENDER_ID[categories[0]?.GenderId]}&sp=${cate.Slug}`}
                            onClick={
                                () => {
                                    handleOnClickLink(`${PageList.PRODUCT_LIST.SERVER}/?gt=${constants.GENDER_ID[categories[0]?.GenderId]}&sp=${cate.Slug}`)
                                }}
                        >
                            <div className='col-lg-6 col-6 px-0 mx-0'>
                                <CustomFrame ratio={722 / 960}>
                                    <div className={` category-img category-sub`}
                                        style={{ backgroundImage: `url(${getImage(`${categories[0]?.GenderName  }-${  cate?.Name}`)})`, backgroundSize: 'cover' }}>
                                        <div className='w-100 h-100 background-hover'>

                                        </div>
                                        <div className="d-start" style={{ width: '100%', position: 'absolute', bottom: '6%' }}>
                                            <div className='pointer see-more-category' style={{ fontWeight: 300 }}>
                        Xem thêm &nbsp; <img height="12" src="/images/icon/icon-left-arrow-white.svg" />
                                            </div>
                                        </div>
                                    </div>
                                </CustomFrame>
                            </div>
                        </Link>
                    )
                    )}
                </div>
            </div>
        </>
    )
}
export default Categorygender;