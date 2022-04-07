import React from 'react';
import Image from '@spo/components/common/image';

const QAComponent = (props) => {
    return (
        <div className="d-flex" style={{ color: 'black' }}>
            <div className="p-4 border flex-1">
                <h2>Mã số mua hàng có mấy loại</h2>
                <p>Có 2 loại:</p>
                <p>Có giá trị cụ thể.</p>
                <p>Giảm giá</p>
            </div>
        </div>
    );
};

export default QAComponent;
