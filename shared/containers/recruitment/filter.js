import React, { useEffect, useState } from 'react';
import CheckBox from '../../components/common/check-box';
import IconSearch from '../../components/common/icons/icon-search';

function FilterItem(props) {

    const { filterList, onSelect, onSearchChange , listActive, onCheckAll, onClearAll } = props
    const [total, setTotal] = useState(false)
    const isTotal = () =>{
        if(!total&& filterList?.length ==listActive?.length)
        {setTotal(true)}
        if(total && filterList?.length !=listActive?.length) 
        {setTotal(false)}
    }
    isTotal()
    const handleSearch = (value) => {
        onSearchChange(value)
    };
    const isCheckedItem = (e) => {
    };
    const onCheckedItem = (item) => {
        onSelect(item)
    }
    const onCheckedTotal = () => {
        const newList = filterList.map(item => item.Id)
        if(filterList[0]?.Level){
            !total?onCheckAll(newList, "ProviceId"):onClearAll("ProviceId")
        }else{
            !total?onCheckAll(newList, "Position"):onClearAll("Position")
        }
        setTotal(!total)
    }
    return (
        <div className="recruitment-filter-form">
            <div className="recruitment-filter-search">
                {/* <div className="title">{props?.title}</div> */}
                <div className="search">
                    <div className="recruitment-icon-search">
                        <IconSearch padding='10px' fontSize={25} />
                    </div>
                    <input
                        onChange={(e) => handleSearch(e.target.value)}
                        className="w-100"
                        placeholder={props.placeholder}
                    />
                </div>
            </div>
            <div className="recruitment-filter-checkbox">
                <div className="all-choice">
                    <CheckBox
                        className="cart-checkbox"
                        type="checkbox"
                        value="value"
                        onChange={onCheckedTotal}
                        checked={total}
                    />
                    <label className="filter-choice">Tất cả</label>
                </div>
                {filterList?.length > 0 && filterList?.map((item, index) => {
                    return (
                        <div key={index} className="recruitment-filter-checkbox-item">
                            <CheckBox
                                type="checkbox"
                                value="value"
                                onChange={() => onCheckedItem(item)}
                                checked={listActive?.findIndex((items) => items == item.Id) != -1
                  && listActive?.findIndex((items) => items == item.Id) != undefined
                                }
                            />
                            <label className="filter-choice">{item?.Name}</label>
                        </div>
                    )
                }
                )}
            </div>
        </div>
    );
}

export default FilterItem;