import React, { Fragment } from 'react';
import styled from 'styled-components';

const messageList = [
    {
        isComplete: true,
        createdAt: '23.01.2021 - 23:14',
        id: 'GY01.01.21.0001',
        description:
      'Ứng dụng bị lỗi ở màn hình màn hình màn hình Ứng dụng bị lỗi ở màn hình màn hình màn hình Ứng dụng bị lỗi ở màn hình màn hình màn hình',
    },
    {
        isComplete: false,
        createdAt: '23.01.2021 - 23:14',
        id: 'GY01.01.21.0001',
        description:
      'Ứng dụng bị lỗi ở màn hình màn hình màn hình Ứng dụng bị lỗi ở màn hình màn hình màn hình Ứng dụng bị lỗi ở màn hình màn hình màn hình',
    },
];

const StatusText = styled.p`
  color: ${(props) =>
        props.isComplete ? '#0DBC00' : '#FF2C00'};
`;

const StatusButton = styled.button`
    float: right;
    width: 124px;
    padding: 7px 0;
    background-color: ${(props) => props.isComplete ? '#FF2C00' : '#000000'};
    color: white;
    cursor: pointer;
    &:hover {
      opacity: .7
    }
`;

const PromotionItem = (props) => {
    const {
        createdAt,
        id,
        description,
        isComplete,
    } = props.message;
    return (
        <div
            style={{
                padding: 30,
                boxShadow:
          '1px 1px 3px rgba(0, 0, 0, 0.2)',
            }}>
            <div className="d-flex justify-content-between">
                <p>{createdAt}</p>
                {!isComplete ? (
                    <StatusText isComplete>
            Đã xong
                    </StatusText>
                ) : (
                    <StatusText>Chưa xử lý</StatusText>
                )}
            </div>
            <p style={{ fontWeight: '500' }}>
        Số góp ý: {id}
            </p>
            <p>{description}</p>
            {/* {isComplete ? (
        <StatusButton isComplete className='btn-none-border'>
          Hủy góp ý
        </StatusButton>
      ) : (
        <StatusButton className='btn-none-border'>Xem chi tiết</StatusButton>
      )} */}
        </div>
    );
};

const MessageListComonent = (props) => {
    return (
        <div
            className="d-flex flex-column"
            style={{ gap: '30px' }}>
            {messageList?.length !== 0 ? (
                messageList.map((message,index) => (
                    <PromotionItem  key={index} message={message} />
                ))
            ) : (
                <div>Nothing to render</div>
            )}
        </div>
    );
};

export default MessageListComonent;
