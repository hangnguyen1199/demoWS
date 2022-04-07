import IconX from '@spo/components/common/icon-x';
// import IconSearch from '@spo/components/common/icon-search';
import IconArrowRight from '@spo/components/common/icon-chevron-right';
import { useEffect, useState } from 'react';
import IconSearch from './icons/icon-search';

const CustomModalFilter = (props) => {
    const {
        handleShowFilter,
        onSelect,
        title = '',
        fieldSearch = 'Name',
        fieldName = 'Name',
        showSearch = true,
        showArrow = false,
        showValueSelected = false,
        fontSizeTitle="20px"
    } = props;
    const [masterData, setMasterData] = useState(props.masterData);
    const handleSearch = (e) => {
        const _temp = props?.masterData.filter((item) =>
            item[fieldSearch]
                .toLowerCase()
                .includes(e.target.value.toLowerCase()),
        );
        setMasterData(_temp);
    };
    const handleSelect = (item) => {
        handleShowFilter(false);
        onSelect(item);
    };
    return (
        <div className={`custom-modal-filter`}>
            <div className="modal__inner">
                <div className="modal__header">
                    <button onClick={() => handleShowFilter()}>
                        <IconX fontSize={35} />
                    </button>
                    <span style={{fontSize:fontSizeTitle}} className="text-center">{title}</span>
                </div>
                <div className="modal__content">
                    {showSearch && (
                        <div className="modal__search--form">
                            <IconSearch padding='10px' fontSize={25} />
                            <input
                                onChange={handleSearch}
                                className="w-100"
                                placeholder="Tìm kiếm"
                            />
                        </div>
                    )}
                    <div className="modal__list">
                        {masterData?.length > 0 &&
                            masterData?.map((item, index) => (
                                <div className='item-master-data' key={index}>
                                    <button onClick={() => handleSelect(item)}>
                                        {item?.Name}
                                        {showArrow && <IconArrowRight />}
                                    </button>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default CustomModalFilter;
