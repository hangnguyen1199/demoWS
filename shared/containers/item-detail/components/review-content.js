import constants from '@spo/config/constants';
import moment from 'moment';
import React from 'react';
import ReactPlayer from 'react-player/lazy';
import Display from '../../../components/common/display';
import EventRegister, { EVENT_SHOW_POPUP, SHOW_IMAGE_POPUP } from '../../../utils/EventRegister';
import Image from './../../../components/common/image';

function ReviewContent (props) {
    const { data } = props;
    const handleShowImage = (i) => {
        EventRegister.emit(EVENT_SHOW_POPUP, {
            type: SHOW_IMAGE_POPUP,
            open: true,
            payload: {
                className: "show_image_popup_container",
                images: data?.ReviewImages,
            },
        });
    }
    return (
        <div className="review-content">
            <Display>
                <div className="d-row d-start pt-4">
                    <div className="review-content-header">
                        <div className=" _table_col">
                            <div className="d-flex">
                                <div className="review-account-img rounded-circle">
                                    <div className='d-center'>
                                        <Image
                                            lazyLoad={false}
                                            className="w-100 h-100"
                                            defaultImage="/images/icon/Person.svg"
                                            src={data.UserThumb}
                                        />
                                    </div>
                                </div>
                                <div
                                    className="d-flex flex-column review-header-account-info"
                                    style={{ paddingLeft: 15 }}>
                                    <span>{data.DisplayName}</span>
                                </div>
                            </div>
                            <div className="other_info">
                                <span>Màu: {data?.ColorName}</span>
                                <span>Kích thước: {data?.SizeName}</span>
                            </div>
                        </div>
                        <div className="product-review-content _table_col">
                            {data.Content}
                        </div>
                        <div className="_table_col">
                            <div className="product-review-attach-file">
                                {[...data.ReviewImages].slice(0, 4)?.map((element, index) => (
                                    <div key={index} className="mr-2 mb-2 position-relative" onClick={() => handleShowImage(index)}>
                                        {element?.AttachmentType == 1 ? (
                                            <img className="_image" src={element?.LinkFile} />
                                        ) : (
                                            <ReactPlayer className="_video" url={element?.LinkFile} />
                                        )}
                                        {
                                            index == 3 && data.ReviewImages.length > 4 && <div className="float_load_more">
												+ {data.ReviewImages.length - 4}
                                            </div>
                                        }
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="_table_col">
                            {data.Rate == constants.REVIEW.GOOD && (
                                <span className="">
                                    <img
                                        style={{ width: 30, height: 31 }}
                                        src="/images/icon/review-happy.svg"
                                    />
                                </span>
                            )}
                            {data.Rate == constants.REVIEW.NORMAL && (
                                <span className="">
                                    <img
                                        style={{ width: 30, height: 35 }}
                                        src="/images/icon/review-normal.svg"
                                    />
                                </span>
                            )}
                            {data.Rate == constants.REVIEW.BAD && (
                                <span className="">
                                    <img
                                        style={{ width: 30, height: 35 }}
                                        src="/images/icon/review-bad.svg"
                                    />
                                </span>

                            )}
                            <span className="review-header-post-date">
                                {moment(data.ReviewDate).format(
                                    'DD.MM.YYYY - HH:mm'
                                )}
                            </span>
                        </div>
                    </div>
                </div>
            </Display>
            <Display mobile={true}>
                <div className="_mobile d-row d-start mt-4">
                    <div className="review-content-header">
                        <div className="d-flex">
                            <div className="review-account-img rounded-circle">
                                <div className='d-center'>
                                    <Image
                                        lazyLoad={false}
                                        className="w-100 h-100"
                                        defaultImage="/images/icon/Person.svg"
                                        src={data.UserThumb}
                                    />
                                </div>
                            </div>
                            <div className='d-flex flex-column ' style={{ paddingLeft: 15 }}>
                                <div
                                    className="review-header-account-info"
                                >
                                    <span>{data.DisplayName}</span>
                                </div>
                                <span className="review-header-post-date">
                                    {moment(data.ReviewDate).format(
                                        'DD.MM.YYYY - HH:mm'
                                    )}
                                </span>
                                <div className="product-review-content">
                                    {data.Content}
                                </div>
                                <div className="product-review-attach-file">
                                    {[...data.ReviewImages].slice(0, 4)?.map((element, index) => (
                                        <div key={index} className="mr-2 mb-2 position-relative" onClick={() => handleShowImage(index)}>
                                            {element?.AttachmentType == 1 ? (
                                                <img className="_image" src={element?.LinkFile} />
                                            ) : (
                                                <ReactPlayer className="_video" url={element?.LinkFile} />
                                            )}
                                            {
                                                index == 3 && data.ReviewImages.length > 4 && <div className="float_load_more">
													+ {data.ReviewImages.length - 4}
                                                </div>
                                            }
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="review_point">
                            {data.Rate == constants.REVIEW.GOOD && (
                                <span className="">
                                    <img
                                        style={{ width: 30, height: 31 }}
                                        src="/images/icon/review-happy.svg"
                                    />
                                </span>
                            )}
                            {data.Rate == constants.REVIEW.NORMAL && (
                                <span className="">
                                    <img
                                        style={{ width: 30, height: 35 }}
                                        src="/images/icon/review-normal.svg"
                                    />
                                </span>
                            )}
                            {data.Rate == constants.REVIEW.BAD && (
                                <span className="">
                                    <img
                                        style={{ width: 30, height: 35 }}
                                        src="/images/icon/review-bad.svg"
                                    />
                                </span>

                            )}
                        </div>
                    </div>
                </div>
            </Display>

            {/* {data.ReplyContent && (
				<div
					className="review-content-feedback"
					style={{ paddingTop: 20 }}>
					<div className="w-50 float-right feedback-block">
						<div className="d-flex flex-column w-100">
							<div className="review-content-feedback-header px-1">
								<div className="float-left d-flex">
									<div className="d-center fontsize16">
										Phản hồi của&nbsp;
										<span className="text-red"> FM</span>
									</div>
								</div>
								<div className="float-right">
									{data.ReplyDate && (
										<span className="fontsize16">
											{moment(data.ReplyDate).format(
												'DD.MM.YYYY - HH:mm'
											)}
										</span>
									)}
								</div>
							</div>
							<div className="review-content-feedback-content fontsize16">
								<div>{data.ReplyContent}</div>
							</div>
						</div>
					</div>
				</div>
			)} */}
        </div>
    );
}
ReviewContent.propTypes = {};
ReviewContent.defaultProps = {};
export default ReviewContent;
