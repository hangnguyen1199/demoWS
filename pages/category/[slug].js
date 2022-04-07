const CategoryContainer = dynamic(
    () => import('@spo/containers/category'),
    { ssr: true },
);
import SpoLayout from '@spo/containers/layout/spo-layout';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import React from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import constants from '@spo/config/constants';

const Category = (props) => {
    const router = useRouter();
    const pid = router?.query?.slug;
    const common = useSelector((state) => state.Common);
    let categories = common.data.listCategory.filter(c => c.GenderId == constants.GENDER_SLUG[pid]);
    return (
        <>
            <Head>
                <title>Danh mục giới tính {categories[0]?.GenderName} </title>
                <meta name="keywords" content={'Danh mục giới tính'}></meta>
                <meta property="og:title" content={`Danh mục giới tính`} />
                <meta property="og:type" content="product"></meta>
            </Head>
            <CategoryContainer type={constants.GENDER_SLUG[pid]} />
        </>
    );
};

Category.Layout = SpoLayout;
export default Category;
