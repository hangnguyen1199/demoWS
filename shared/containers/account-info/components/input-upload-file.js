import React ,{useState} from 'react';
import Utils from './../../../utils/utils';
import Display from './../../../components/common/display';
import AppConfig from './../../../config/AppConfig';
import { POPUP_ERROR_TYPE } from './../../../utils/EventRegister';
import Image from '../../../components/common/image';


const InputUpload=(props)=>{

    const [error, setError] = useState('');
    const onChangeFile=(event)=>{;
        const image = event.target.files[0];
        let fSize = 0;
        let fileSize =0;
        let errorMessage='';
        if (!image) {
            errorMessage="Ảnh không tồn tại";
        }else{
            errorMessage='';
        }
        if (image) {
            fSize = image.size;
            fileSize = Math.round(fSize / 1024);
            if (!image.name.toLowerCase().match(/\.(jpg|jpeg|png|gif)$/)) {
                errorMessage='Ảnh không đúng địng dạng';
            }else if (fileSize >= 8192) {
                errorMessage='Kích thước ảnh không được lớn hơn 8MB';
            }else{
                errorMessage="";
            }
        }
        if(errorMessage===''){
            props.onChange(image);
            setError('');
        }else{
            setError(errorMessage);
            Utils.alertPopup(errorMessage,POPUP_ERROR_TYPE);
        }
    }
    return (
        <>
            <Display>
                <div className="position-relative">
                    <Image
                        defaultImage="/images/icon/acccount_avatar.svg"
                        className="img-desktop-account"
                        style={{ width: 130, height: 130 }}
                        src={props.avatar}
                        lazyLoad={false}
                    ></Image>
                    {AppConfig.ACCESS_TOKEN ? (
                        <div className="position-absolute d-center account-avatar-small">
                            <input
                                onChange={onChangeFile}
                                hidden
                                type="file"
                                id="upload-avatar"
                            />
                            <label htmlFor="upload-avatar">
                                <img
                                    style={{ width: 17, height: 17, marginTop: 5 }}
                                    src="/images/icon/account_avatart_camera.svg"
                                />
                            </label>
                        </div>
                    ) : null}
                </div>
            </Display>
            <Display mobile={true}>
                <div className="d-flex flex-column align-items-center img-mobile-relative ">
                    <div className="container-img-avatar-mobile">
                        <Image
                            className="img-desktop-account"
                            src={props.avatar}
                            lazyLoad={false}
                            defaultImage="/images/icon/acccount_avatar.svg"
                        />
                        {AppConfig.ACCESS_TOKEN ? (
                            <div className="position-icon-upload-avatar">
                                <input
                                    onChange={onChangeFile}
                                    style={{ width: 80 }}
                                    hidden
                                    type="file"
                                    id="upload-avatar"
                                />
                                <label className="upload-avatar-mobi" htmlFor="upload-avatar">
                                    <img
                                        style={{ width: 17, height: 17 }}
                                        src="/images/icon/account_avatart_camera.svg"
                                    />
                                </label>
                            </div>
                        ) : null}
                    </div>
                </div>
            </Display>
        </>
    );
}

export default InputUpload;