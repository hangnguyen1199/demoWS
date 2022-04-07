import React, { useEffect ,useState} from 'react'
import IconCancelOrder from '../../../components/common/icon-cancel-order';
import IconCheckOffTracking from '../../../components/common/icon-check-off-tracking';
import IconCheckTracking from '../../../components/common/icon-check-sracking';
import constants from './../../../config/constants';
import IconReturnOrder from './../../../components/common/icon-return-order';

export default function StepTracking(props) {

    let stepTracking = [
        {
            id: constants.ORDER_STATUS['NEW'],
            title: "Đang lấy hàng",
            title2: "Đã huỷ",
            iconCheck: <IconCheckTracking />,
            iconUnCheck: <IconCheckOffTracking />
        },
        {
            id: constants.ORDER_STATUS['DELIVERING'],
            title: "Đang vận chuyển",
            title2: "Đang vận chuyển",
            iconCheck: <IconCheckTracking />,
            iconUnCheck: <IconCheckOffTracking />
        },
        {
            id: constants.ORDER_STATUS['FINISHED'],
            title: "Đã nhận hàng",
            title2: "Đã nhận hàng",
            iconCheck: <IconCheckTracking />,
            iconUnCheck: <IconCheckOffTracking />
        },
    ]

    const [dataStepTracking, setDataStepTracking] = useState(stepTracking)

    useEffect(() => {
        if(props.orderStatus == constants.ORDER_STATUS['RETURNED'] && dataStepTracking.findIndex(v=>v.id == props.orderStatus) == -1){
            let data=[...dataStepTracking]
            data.push({
                id: constants.ORDER_STATUS['RETURNED'],
                title: "Trả hàng",
                iconCheck: <IconReturnOrder />,
                iconUnCheck: <IconReturnOrder />
            })
            setDataStepTracking([...data])
        }else{
            let data=[...dataStepTracking]
            let index=data.findIndex(v=>v.id == constants.ORDER_STATUS['RETURNED']);
            if(index != -1){
                data.splice(index,1)
            }
            setDataStepTracking(data)
        }
    }, [props.orderStatus])
    const showStepCheck=()=>{
        switch (props.orderStatus) {
            case constants.ORDER_STATUS['NEW'] :
                return 0;
            case constants.ORDER_STATUS['DELIVERING']:
                return 1;
            case constants.ORDER_STATUS['DELIVERED'] :
                return 1;
            case constants.ORDER_STATUS['FINISHED']:
                return 2;
            case constants.ORDER_STATUS['RETURNED']:
                return 3;
            default:
                return 0;
        }
    }

    const StepTrackingItem = ({ value, index }) => {
        return <>
            {
                props.orderStatus == constants.ORDER_STATUS['CANCEL'] ? <div className='step-tracking-item'>
                    <div className='step-tracking-item-icon '>
                        {
                            index <= showStepCheck() ? <IconCancelOrder /> : value.iconUnCheck
                        }
                        <span className={`border-dotted-tracking ${index < showStepCheck() ? `border-dotted-tracking-${index}` : ''}`}></span>
                    </div>
                    <p>{value.title2}</p>
                </div> : <div className='step-tracking-item'>
                    <div className='step-tracking-item-icon '>
                        {
                            index <= showStepCheck() ? value.iconCheck : value.iconUnCheck
                        }
                        <span className={`border-dotted-tracking ${index < showStepCheck() ? `border-dotted-tracking-${index}` : ''}`}></span>
                    </div>
                    <p>{value.title}</p>
                </div>
            }
        </>
    }
    return (
        <>
            <div className='tracking-step-header-container'>
                <div className='tracking-step-container'>
                    {
                        dataStepTracking.map((value, index) => {
                            return <StepTrackingItem index={index} value={value} key={index} />
                        })
                    }
                </div>
            </div>
        </>
    )
}
