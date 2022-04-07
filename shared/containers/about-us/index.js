import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import styled from 'styled-components';
import CustomPagination from '@spo/components/common/custom-pagination';
import ListNewsComponent from '../../components/about-us/ListNewsComponent';
import QAComponent from '../../components/about-us/QAComponent';
import { useDispatch, useSelector } from 'react-redux';

const Header = dynamic(() => import('@spo/components/spo-layout/header'), {
    ssr: false,
});

const Tab = styled.button`
  background-color: #f2f2f2;
  border: none;
  text-align: left;
  padding: 15px;
  outline: 0;
  cursor: pointer;
  transition: none;

  ${({ active }) =>
        active &&
    `
      border-left: 2px solid #ff6969;
      background-color: white;
      font-weigh: semi-bold;
      color: #ff603f;
    `}
`;
const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const types = ['Tin tức', 'Khuyến mãi', 'Câu hỏi thường gặp'];

const AboutUsContainer = (props) => {
    const [active, setActive] = useState(types[0]);
    const dispatch = useDispatch();
    const listNews = []

    return (
        <>
            <div className="product-list-with-type">
                {/* <Header /> */}
                <div className="d-flex menu col-12 px-0 header-wrap-menu pd-lr-common pt-3 pb-3 mb-4">
                    <span>Tìm kiếm: Áo thun</span>
                    <span className="ml-auto">390 kết quả: 300 sản phẩm | 90 khác</span>
                </div>
                <div className="row px-0 mx-0 pd-lr-common">
                    <div className="col-3 px-0">
                        <ButtonGroup>
                            {types.map((type) => (
                                <Tab
                                    key={type}
                                    active={active === type}
                                    onClick={() => setActive(type)}>
                                    {type}
                                </Tab>
                            ))}
                        </ButtonGroup>
                    </div>
                    <div className="ml-5 flex-1">
                        {active === types[0] && <ListNewsComponent listNews={listNews}/>}
                        {active === types[2] && <QAComponent />}
                    </div>
                    <div className="col-12 px-0">
                        <div className="col-12 col-sm-12 col-md-12 col-lg-12 px-0">
                            {/* <CustomPagination /> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AboutUsContainer;
