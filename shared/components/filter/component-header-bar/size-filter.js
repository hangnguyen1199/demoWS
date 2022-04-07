import React from 'react'
import IconCheck from '../../common/icon-check';
import { checkExitsArray } from './help';

export default function SizeFilter(props) {
    const { common, handleSizeId, dataFilter } = props;

    const getWith = () => {
        if (common?.data?.listSize.length > 35) {
            return 750
        }
        if (common?.data?.listSize.length > 27) {
            return 600
        }
        if (common?.data?.listSize.length > 18) {
            return 450
        }
        if (common?.data?.listSize.length > 9) {
            return 300
        }
        return 170
    }
    return (
        <>
            {/*  */}
            <div className='column-menu-modal'>
                <p className='menu-name'>SIZE</p>
                <div style={{ width: getWith() }} className='flex-column-warp'>
                    {common?.data?.listSize.map((size, index) => (
                        <div key={index} onClick={() => handleSizeId(size.Id)} className='d-flex flex-row align-items-center menu-modal-column-item '>
                            <span className="icon-check-left">
                                {checkExitsArray(
                                    dataFilter,
                                    size.Id
                                ) >
                                    -1
                                    ? <>
                                        <IconCheck />
                                    </>
                                    : null
                                }
                            </span>
                            <p className={`fontsize16 menu-name-item ${checkExitsArray(
                                dataFilter,
                                size.Id
                            ) >
                                -1
                                ? 'active'
                                : ''
                            }`}>{size.Name}</p>
                        </div>
                    ))}

                </div>
            </div>
        </>
    )
}
