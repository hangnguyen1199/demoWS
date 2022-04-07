import Link from 'next/link';
import React, { useState } from 'react';
import PageList from '../../../config/PageList';
import IconFooter from '../../common/icon-footer-plus';
import IconFooterShow from '../../common/icon-footer-plus-show';

const CenterHelp = () => {
    const [open, setOpen] = useState(false);
    const handleClickAccordion = () => {
        setOpen(!open);
    };
    return (
        <>
            <div className="center-help-mobile">
                <div className="center-help-mobile">
                    <div
                        onClick={handleClickAccordion}
                        className="center-help-mobile-title"
                    >
                        <p>Trung tâm trợ giúp</p>
                        <span>
                            {open ? (
                                <IconFooter/>
                            ) : (
                                <IconFooterShow />
                            )}
                        </span>
                    </div>
                    <div className={`show-list-help ${open ? 'active' : ''}`}>
                        <div className="col-12 px-0 ">
                            <ul className="footer-mobile-text mb-0">
                                <li>
                                    <Link
                                        prefetch={false}
                                        href={PageList.SHOPPING_GUIDE.SERVER}
                                    >
                                        <a className="link-hover-red">
                                        Hướng dẫn mua hàng
                                        </a>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        prefetch={false}
                                        href={PageList.SIZE_GUIDE.SERVER}
                                    >
                                        <a className="link-hover-red">
                                        Hướng dẫn chọn size
                                        </a>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href={{
                                            pathname: PageList.POLICY.SERVER,
                                            query: {
                                                p:
                                                    'chinh-sach-bao-hanh-&-doi-tra',
                                            },
                                        }}
                                    >
                                        <a className="link-hover-red">
                                        Chính sách Bảo hành & Đổi trả
                                        </a>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href={{
                                            pathname: PageList.POLICY.SERVER,
                                            query: {
                                                p:
                                                    'chinh-sach-khach-hang-thanh-vien',
                                            },
                                        }}
                                    >
                                        <a className="link-hover-red">
                                        Chính sách khách hàng thành viên
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
                                        <a className="link-hover-red">
                                        Chính sách vận chuyển
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
                                        <a className="link-hover-red">
                                        Chính sách bảo mật & chia sẻ
                                                thông tin
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
                                        <a className="link-hover-red">
                                        Điều khoản sử dụng
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
                                        <a className="link-hover-red">
                                        Câu hỏi thường gặp
                                        </a>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default CenterHelp;
