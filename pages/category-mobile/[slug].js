import SpoLayout from "@spo/containers/layout/spo-layout";
import dynamic from "next/dynamic";
import { routeGuard } from "../../shared/library/helper";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import constants from "../../shared/config/constants";

const CategoryMobileContainer = dynamic(() =>
    import("@spo/containers/category-mobile")
);

function CategoryMobile (props) {
    const router = useRouter();
    const [genderId, setGenderId] = useState(1);
    const [tabIndex, setTabIndex] = useState(0);

    useEffect(() => {
        try {
            const gid = router?.query?.slug;
            if (gid) {
                setGenderId(parseInt(constants.GENDER_SLUG[gid], 10));
            }
            if (router.query.tab) {
                setTabIndex(parseInt(router.query.tab, 10));
            } else {
                setTabIndex(0);
            }
        } catch (e) {
            setGenderId(1);
            setTabIndex(0);
        }
    }, [router.query]);

    return (
        <>
            <Head>
                <title>Danh mục giới tính</title>
                <meta name="keywords" content={"Danh mục giới tính"}></meta>
                <meta property="og:title" content={`Danh mục giới tính`} />
                <meta property="og:type" content="product"></meta>
            </Head>
            <CategoryMobileContainer
                genderId={genderId}
                tabIndex={tabIndex}
            ></CategoryMobileContainer>
        </>
    );
}

CategoryMobile.Layout = SpoLayout;

export default CategoryMobile;
