import Link from 'next/link';
import React from 'react';
import PageList from '../../config/PageList';
import IconChevronRight from '../common/icon-chevron-right';

const CenterHelp = () => {
    return (
        <div className="py-3 center-help-mobile">
            <div className="col-12 px-0 ">
                <div className="center-help-mobile-box">
                    <div className="center-help-mobile-header">
                        <p>Trung tâm trợ giúp</p>
                    </div>
                    <ul className="footer-mobile-text">
                        <li>
                            <Link
                                prefetch={false}
                                href={PageList.SHOPPING_GUIDE.SERVER}
                            >
                                <a className="link-hover-red d-flex justify-content-between">
                                    <p className="mb-0">Hướng dẫn mua hàng</p>
                                    <IconChevronRight fontSize={14} />
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link
                                prefetch={false}
                                href={PageList.SIZE_GUIDE.SERVER}
                            >
                                <a className="link-hover-red d-flex justify-content-between">
                                    <p className="mb-0">Hướng dẫn chọn size</p>
                                    <IconChevronRight fontSize={14} />
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link
                                href={{
                                    pathname: PageList.POLICY.SERVER,
                                    query: {
                                        p: 'chinh-sach-bao-hanh-&-doi-tra',
                                    },
                                }}
                            >
                                <a className="link-hover-red d-flex justify-content-between">
                                    <p className="mb-0">
                                        Chính sách Bảo hành & Đổi trả
                                    </p>
                                    <IconChevronRight fontSize={14} />
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link
                                href={{
                                    pathname: PageList.POLICY.SERVER,
                                    query: {
                                        p: 'chinh-sach-khach-hang-thanh-vien',
                                    },
                                }}
                            >
                                <a className="link-hover-red d-flex justify-content-between">
                                    <p className="mb-0">
                                        Chính sách khách hàng thành viên
                                    </p>
                                    <IconChevronRight fontSize={14} />
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link
                                href={{
                                    pathname: PageList.POLICY.SERVER,
                                    query: {
                                        p: 'chinh-sach-van-chuyen',
                                    },
                                }}
                            >
                                <a className="link-hover-red d-flex justify-content-between">
                                    <p className="mb-0">
                                        Chính sách vận chuyển
                                    </p>
                                    <IconChevronRight fontSize={14} />
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link
                                href={{
                                    pathname: PageList.POLICY.SERVER,
                                    query: {
                                        p:
                                            'chinh-sach-bao-mat-&-chia-se-thong-tin',
                                    },
                                }}
                            >
                                <a className="link-hover-red d-flex justify-content-between">
                                    <p className="mb-0">
                                        Chính sách bảo mật & chia sẻ thông tin
                                    </p>
                                    <IconChevronRight fontSize={14} />
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link
                                href={{
                                    pathname: PageList.POLICY.SERVER,
                                    query: {
                                        p: 'dieu-khoan-su-dung',
                                    },
                                }}
                            >
                                <a className="link-hover-red d-flex justify-content-between">
                                    <p className="mb-0">Điều khoản sử dụng</p>
                                    <IconChevronRight fontSize={14} />
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link
                                href={{
                                    pathname: PageList.FAQ.SERVER,
                                    query: {
                                        p: 'cau-hoi-thuong-gap',
                                    },
                                }}
                            >
                                <a className="link-hover-red d-flex justify-content-between">
                                    <p className="mb-0">Câu hỏi thường gặp</p>
                                    <IconChevronRight fontSize={14} />
                                </a>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};
export default CenterHelp;
