import Link from 'next/link';
import React, { useState } from 'react';
import PageList from '../../../config/PageList';
import IconFooter from '../../common/icon-footer-plus';
import IconFooterShow from '../../common/icon-footer-plus-show';

const IntroduceShow = () => {
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
                        className="center-help-mobile-title introduce-mobile-title"
                    >
                        <p>Về chúng tôi</p>
                        <span>
                            {open ? (
                                <IconFooter/>
                            ) : (
                                <IconFooterShow />
                            )}
                        </span>
                    </div>
                    <div
                        className={`show-list-introduce${open ? 'active' : ''}`}
                    >
                        <div className="introduce-mobile">
                            <ul className="introduce-mobile-list mb-0">
                                <li>
                                    <Link
                                        prefetch={false}
                                        href={{
                                            pathname: PageList.INTRODUCE.SERVER,
                                        }}
                                    >
                                        <a className="link-hover-red">
                                            Giới thiệu
                                        </a>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        prefetch={false}
                                        href={{
                                            pathname: PageList.CONTACT.SERVER,
                                        }}
                                    >
                                        <a className="link-hover-red">
                                            Liên hệ
                                        </a>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        prefetch={false}
                                        href={PageList.BRANCH_LIST.SERVER}
                                    >
                                        <a className="link-hover-red">
                                            Hệ thống cửa hàng
                                        </a>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href={{
                                            pathname:
                                                PageList.RECRUITMENT.SERVER,
                                        }}
                                    >
                                        <a className="link-hover-red">
                                            Tuyển dụng
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
export default IntroduceShow;
