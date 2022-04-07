import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import {RiDeleteBin6Line} from 'react-icons/ri'

const Image = dynamic(() => import('@spo/components/common/image'), {
    ssr: false,
});



const KeywordHistoryResult = () => {
    const HistoryList = [
        { id: 1, name: 'Ao dai' },
        { id: 2, name: 'Ao khong dai' },
        { id: 3, name: 'Ao ngan' },
    ];
    const [historlyList, setHistoryList] = useState(HistoryList);
    
    
    const HistoryChip = ({ name, id, setHistoryList }) => {
        const ChipStyle = {
            backgroundColor: '#80808040',
            display: 'inline-block',
            padding: '2px 15px',
            borderRadius: '15px',
            marginLeft: '15px',
            alignSelf: 'start',
        };
        
    
        const handleRemoveHistory = (id) => {
            const newList = historlyList.filter((item) => item.id != id);
            setHistoryList(newList);
        };
    
        return (
            <li style={ChipStyle}>
                <span>{name} </span>
                <button
                    type="button"
                    className="ml-3 close"
                    aria-label="Close"
                    onClick={() => handleRemoveHistory(id)}>
                    <span aria-hidden="true">&times;</span>
                </button>
            </li>
        );
    };
    return (
        <div>
            <div className="d-flex justify-content-between align-items-baseline">
                <h3 className="font-weight-bold">Tìm kiếm gần đây</h3>
                <RiDeleteBin6Line />
            </div>
            <div className="pl-2">
                <ul className="d-flex flex-column" style={{ gap: '10px' }}>
                    {historlyList.map((item) => (
                        <HistoryChip name={item.name} id={item.id} setHistoryList={setHistoryList}/>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default KeywordHistoryResult;
