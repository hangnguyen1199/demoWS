import React from 'react';
import Link from 'next/link';
import PageList from '../../config/PageList';

let arrSideBar = [
    { id: 0, title: 'Liên hệ', href: PageList.CONTACT.SERVER },
    { id: 1, title: 'Hướng dẫn mua hàng', href: PageList.SHOPPING_GUIDE.SERVER },
    { id: 2, title: 'Hướng dẫn chọn size', href: PageList.SIZE_GUIDE.SERVER },
    { id: 3, title: 'Điều khoản và chính sách', href: PageList.POLICY.SERVER },
    { id: 4, title: 'Câu hỏi thường gặp', href: PageList.FAQ.SERVER },
];

export default function ComponentSideBarPolicy(props) {
    const {
        active,
        fieldName = 'title',
        fieldValue = 'id',
        onPress,
        data,
    } = props;
    const handleClick = (item) => {
        onPress(item[fieldValue]);
    };
    return (
        <ul className="sidebar-policy">
            {arrSideBar &&
                arrSideBar.map((item, index) => {
                    return (
                        <Link key={index} href={`${item.href}`}>
                            <li
                                onClick={() => handleClick(item)}
                                key={index}
                                className={`sidebar-policy-item ${
                                    active === item[fieldValue] ? 'active' : ''
                                }`}>
                                <p>{item[fieldName]}</p>
                            </li>
                        </Link>
                    );
                })}
        </ul>
    );
}
