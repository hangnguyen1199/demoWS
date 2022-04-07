import { useEffect, useState } from 'react';
import Image from 'next/image';
import IconXCircle from '@spo/components/common/icon-x-circle';
import IconPlus from './../../common/icons/icon-plus';

const UploadMultipleImages = (props) => {
    const { defaultImages, index, input, maxFiles, maxFileSize, disable } =
        props;
    const [error, setError] = useState(undefined);
    useEffect(() => {
        input.onChange(defaultImages);
    }, []);
    const onChange = (e) => {
        let filesArr = Array.from(e.target.files);
        let checkMaxLength = filesArr.length + input?.value.length;
        if (checkMaxLength <= maxFiles) {
            let newArr = [];
            filesArr.map((item) => {
                if (item?.size > maxFileSize) {
                    setError('File ảnh vượt quá kích thước cho phép !');
                } else {
                    newArr = input?.value.concat(filesArr);
                    input?.onChange(newArr);
                }
            });
        } else {
            setError(`Đính kèm tối đa ${maxFiles} tệp`);
        }
    };
    const onDelete = (i) => {
        let newList = [...input?.value];
        newList.splice(i, 1);
        input?.onChange(newList);
    };
    return (
        <React.Fragment>
            <div className="upload-multiple-image-container">
                <div className="review__modal__upload__hidden">
                    {input?.value &&
                        input?.value.length > 0 &&
                        input?.value?.map((value, i) => (
                            <div className="img-wrap">
                                {!disable && (
                                    <button onClick={() => onDelete(i)}>
                                        <IconXCircle fontSize={15} />
                                    </button>
                                )}
                                <div key={i} className="img">
                                    <img
                                        src={
                                            value?.LinkFile
                                                ? value?.LinkFile
                                                : value &&
                                                  URL.createObjectURL(value)
                                        }
                                        width="100px"
                                        height="100px"
                                    />
                                </div>
                            </div>
                        ))}
                    {!disable && (
                        <div className="btn-upload">
                            <label
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    flexDirection: 'column',
                                    height: '100px',
                                    width: '100px',
                                    textAlign: 'center',
                                    padding: '5px',
                                }}
                                htmlFor={`upload_review-${index}`}>
                                <div style={{ color: 'rgb(255, 213, 0)' }}>
                                    <IconPlus fontSize={20} />
                                </div>

                                <span className={`${error && 'text-error'}`}>
                                    {error ? error : 'Đính kèm file'}
                                </span>
                            </label>
                        </div>
                    )}
                    <input
                        type="file"
                        accept="image/*"
                        id={`upload_review-${index}`}
                        multiple={true}
                        hidden={true}
                        onChange={onChange}
                    />
                </div>
            </div>

            <p className="modal-review-title text-bottom">
                Đính đèm tối đa {maxFiles} hình ảnh/video (
                {Math.round(maxFileSize / 1000000)} MB)
            </p>
        </React.Fragment>
    );
};

export default UploadMultipleImages;
