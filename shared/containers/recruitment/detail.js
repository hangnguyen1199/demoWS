import Header from '@spo/components/spo-layout/header';
import BreadCrumb from '@spo/components/common/breadcrumb';
import { useSelector, useDispatch } from 'react-redux';
import { FormattedDate, FormattedNumber } from 'react-intl';
import RightIconUrl from '@spo/public/images/icon/icon-right-arrow.svg';
import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';
import useCustomRoute from '../../library/use-custom-route';
import IconChevronRight from '../../components/common/icon-chevron-right';
import PageList from '../../config/PageList';
import { useEffect, useState } from 'react';
import ButtonMain from '../../components/common/button-main';

const RightIcon = () => (
    <Image src={RightIconUrl} width={12} height={12} color="#000" />
);

const renderSectionContent = (data) => {
    return data?.map((item, index) => <li key={index}>. {item}</li>);
};
const RecruitmentDetailContainer = () => {
    const { detail, list } = useSelector((state) => state.Recruitment);

    const [disable, setDisable] = useState(false);
    const dispatch = useDispatch();
    const data_bread_crumb = [
        { name: 'Trang chủ', path_name: '/' },
        { name: 'Tuyển dụng', path_name: PageList.RECRUITMENT.SERVER },
        { name: 'Chi tiết tuyển dụng', path_name: '1' },
    ];
    
    const handleRoute = (slug) => {
        // useCustomRoute(dispatch, `${PageList.RECRUITMENT.SERVER}/form?slug=${slug}`);
        window.open('https://kimhoangvu.net/form/?tuyendung=CD-FM-0010');
    };
    useEffect(() => {
        const isDisable = (value) => {
            let today = new Date();
            if (new Date(value?.To) < today) {
                setDisable(true);
            } else {
                setDisable(false);
            }
        };
        isDisable(detail);
    }, [detail]);
    return (
        <>
            <Head>
                <title>{detail?.Title ? detail?.Title : 'FM Plus'}</title>
                <meta
                    property="og:title"
                    content={detail?.Title ? detail?.Title : 'FM Plus'}
                    key="title"
                />
            </Head>
            <div className="recruitment-detail-page">
                {/* <Header /> */}
                {/* DESKTOP */}
                <div className="d-none d-md-block">
                    <BreadCrumb data={data_bread_crumb} />
                    <div style={{ marginTop: 15 }} className="common-container">
                        <div className="row">
                            <div className="col-7 col-xl-8">
                                <div className="recruitment-detail__content">
                                    <div className="d-between title">
                                        <span>{detail?.PositionName}</span>
                                        <span>02 nam</span>
                                    </div>
                                    <div className="recruitment-detail__content__inner">
                                        <div className="section">
                                            <p className="section__title">
                                                • Mô tả công việc
                                            </p>
                                            <ul className="section__content">
                                                {renderSectionContent(
                                                    detail?.Descriptions
                                                )}
                                            </ul>
                                        </div>
                                        <div className="section">
                                            <p className="section__title">
                                                • Yêu cầu công việc
                                            </p>
                                            <ul className="section__content">
                                                {renderSectionContent(
                                                    detail?.Requirements
                                                )}
                                            </ul>
                                        </div>
                                        <div className="section">
                                            <p className="section__title">
                                                • Quyền lợi
                                            </p>
                                            <ul className="section__content">
                                                {renderSectionContent(
                                                    detail?.Benefit
                                                )}
                                            </ul>
                                        </div>
                                        <div className="section">
                                            <p className="section__title">
                                                • Hồ sơ yêu cầu
                                            </p>
                                            <ul className="section__content">
                                                {renderSectionContent(
                                                    detail?.Cv
                                                )}
                                            </ul>
                                        </div>
                                        <div className="section">
                                            <p className="section__title">
                                                • Thông tin liên hệ
                                            </p>
                                            <ul className="section__content">
                                                {renderSectionContent(
                                                    detail?.ContactInfo
                                                )}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-5 col-xl-4">
                                <div className="recruitment-detail__sidebar">
                                    <div className="recruitment-detail--img">
                                        <div className="container-ratio">
                                            <div className="ratio">
                                                <img src={detail?.Image} />
                                            </div>
                                        </div>
                                    </div>
                                    <ul className="recruitment-detail__sidebar__list">
                                        <li>
                                            <span className="label">
                                                Loại hình công việc
                                            </span>
                                            <span className="value">
                                                : {detail?.WorkTypeName}
                                            </span>
                                        </li>
                                        <li>
                                            <span className="label">
                                                Giờ làm việc
                                            </span>
                                            <span className="value">
                                                : {detail?.WorkTime}
                                            </span>
                                        </li>
                                        <li>
                                            <span className="label">
                                                Mức lương
                                            </span>
                                            <span className="value">
                                                : {detail?.Salary}
                                            </span>
                                        </li>
                                        <li>
                                            <span className="label">
                                                Thời hạn tuyển dụng
                                            </span>
                                            <span className="value">
                                                : Từ{' '}
                                                <FormattedDate
                                                    value={detail?.From}
                                                    day="2-digit"
                                                    month="2-digit"
                                                    year="numeric"
                                                />{' '}
                                                đến hết{' '}
                                                {detail?.To ? (
                                                    <FormattedDate
                                                        value={detail?.To}
                                                        day="2-digit"
                                                        month="2-digit"
                                                        year="numeric"
                                                    />
                                                ) : (
                                                    ''
                                                )}
                                            </span>
                                        </li>
                                        <button
                                            disabled={disable}
                                            style={{ marginBottom: '20px', marginTop: '15px' }}
                                            onClick={() =>
                                                handleRoute(detail?.Id)
                                            }
                                            className={`btn_ripple btn-main-fm btn-recruit w-100 ${
                                                disable ? 'btn-apply-gray' : ''
                                            }`}
                                        >
                                            <span>
                                                {disable
                                                    ? 'Hết hạn tuyển dụng'
                                                    : 'Ứng tuyển ngay'}
                                            </span>
                                        </button>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="recruitment__list">
                            <div className="recruitment__list__inner">
                                <div className="recruitment__list__header">
                                    <p>Tuyển dụng</p>
                                    <Link
                                        href={{
                                            pathname:
                                                PageList.RECRUITMENT.SERVER,
                                        }}
                                    >
                                        <span
                                            style={{ cursor: 'pointer' }}
                                            className="d-flex align-items-center"
                                        >
                                            Xem thêm{' '}
                                            <IconChevronRight fontSize={14} />
                                        </span>
                                    </Link>
                                </div>
                                <div className="row recruitment-list">
                                    {list?.Recruitments?.slice(0, 3).map(
                                        (item) => (
                                            <div
                                                key={item?.Id}
                                                className="col-12 col-md-6 col-lg-4 recruitment-item"
                                            >
                                                <div className="recruitment-item--inner">
                                                    <div className="recruitment-item--img">
                                                        <div className="container-ratio">
                                                            <div className="ratio">
                                                                <img
                                                                    src={
                                                                        item?.Image
                                                                    }
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="recruitment-item--content">
                                                        <p className="title">
                                                            {item?.PositionName}
                                                        </p>
                                                        <div className="recruitment-item--info">
                                                            <div className="w-100 recruitment-item--info--wrap">
                                                                <p className="row mx-0">
                                                                    <span
                                                                        style={{
                                                                            flex: 1,
                                                                        }}
                                                                    >
                                                                        Địa điểm
                                                                        làm việc
                                                                    </span>
                                                                    <span
                                                                        className="text-eclipse"
                                                                        style={{
                                                                            flex: 1.5,
                                                                        }}
                                                                    >
                                                                        :{' '}
                                                                        {
                                                                            item
                                                                                ?.Branches[0]
                                                                                ?.Name
                                                                        }
                                                                    </span>
                                                                </p>
                                                                <p className="row mx-0">
                                                                    <span
                                                                        style={{
                                                                            flex: 1,
                                                                        }}
                                                                    >
                                                                        Giờ làm
                                                                        việc
                                                                    </span>
                                                                    <span
                                                                        className="text-eclipse"
                                                                        style={{
                                                                            flex: 1.5,
                                                                        }}
                                                                    >
                                                                        :{' '}
                                                                        {
                                                                            item?.WorkTime
                                                                        }
                                                                    </span>
                                                                </p>
                                                                <p className="row mx-0">
                                                                    <span
                                                                        style={{
                                                                            flex: 1,
                                                                        }}
                                                                    >
                                                                        Lương
                                                                    </span>
                                                                    <span
                                                                        className="text-eclipse"
                                                                        style={{
                                                                            flex: 1.5,
                                                                        }}
                                                                    >
                                                                        :{' '}
                                                                        {
                                                                            item?.Salary
                                                                        }
                                                                    </span>
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <Link
                                                            href={{
                                                                pathname:
                                                                    PageList
                                                                        .RECRUITMENT_SLUG
                                                                        .CLIENT,
                                                                query: {
                                                                    slug: item?.Id
                                                                }
                                                            }}
                                                        >
                                                            <ButtonMain
                                                                title="Xem chi tiết"
                                                                className="btn-detail-recruitment"
                                                            />
                                                            {/* <div className="btn-detail">Xem chi tiết</div> */}
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* DESKTOP */}

                {/* MOBILE */}
                <div className="d-block d-md-none">
                    <div className="recruitment-detail__img">
                        <div className="container-ratio">
                            <div className="ratio">
                                <img src={detail?.Image} alt={detail?.Title} />
                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <div className="recruitment-detail__content">
                            <div className="d-between title">
                                <span>{detail?.PositionName}</span>
                                <span>02 nam</span>
                            </div>
                            <div className="recruitment-detail__content__inner">
                                <div className="section">
                                    <p className="section__title">
                                        • Loại công việc
                                    </p>
                                    <ul className="section__content">
                                        <li>. {detail?.WorkTypeName}</li>
                                    </ul>
                                </div>
                                <div className="section">
                                    <p className="section__title">
                                        • Thời gian làm việc
                                    </p>
                                    <ul className="section__content">
                                        . {detail?.WorkTime}
                                    </ul>
                                </div>
                                <div className="section">
                                    <p className="section__title">
                                        • Mức lương
                                    </p>
                                    <ul className="section__content">
                                        <li>. {detail?.Salary}</li>
                                    </ul>
                                </div>
                                <div className="section">
                                    <p className="section__title">
                                        • Mô tả công việc
                                    </p>
                                    <ul className="section__content">
                                        {renderSectionContent(
                                            detail?.Descriptions
                                        )}
                                    </ul>
                                </div>
                                <div className="section">
                                    <p className="section__title">
                                        • Yêu cầu công việc
                                    </p>
                                    <ul className="section__content">
                                        {renderSectionContent(
                                            detail?.Requirements
                                        )}
                                    </ul>
                                </div>
                                <div className="section">
                                    <p className="section__title">
                                        • Quyền lợi
                                    </p>
                                    <ul className="section__content">
                                        {renderSectionContent(detail?.Benefit)}
                                    </ul>
                                </div>
                                <div className="section">
                                    <p className="section__title">
                                        • Thời hạn tuyển dụng
                                    </p>
                                    <ul className="section__content">
                                        <li>
                                            .
                                            <span className="value">
                                                : Từ{' '}
                                                <FormattedDate
                                                    value={detail?.From}
                                                />{' '}
                                                đến hết{' '}
                                                {detail?.To ? (
                                                    <FormattedDate
                                                        value={detail?.To}
                                                    />
                                                ) : (
                                                    ''
                                                )}
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                                <button
                                    disabled={disable}
                                    style={{ marginBottom: '20px' }}
                                    onClick={() => handleRoute(detail?.Id)}
                                    className={`btn_ripple btn-main-fm btn-recruit w-100 ${
                                        disable ? 'btn-apply-gray' : ''
                                    }`}
                                >
                                    <span>
                                        {disable
                                            ? 'Hết hạn tuyển dụng'
                                            : 'Ứng tuyển ngay'}
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* MOBILE */}
            </div>
        </>
    );
};

export default RecruitmentDetailContainer;
