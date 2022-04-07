import Link from "next/link";
import React from "react";
import { FormattedDate } from "react-intl";
import Slider from "react-slick";

let settings = {
    dots: true,
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
};

const NewsSlides = (props) => {
    const { slides } = props;

    return (
        <div className="news-slides common-slides">
            {slides.length > 0 && (
                <Slider {...settings} className="news-slides-inner common-slides-inner">
                    {slides&&slides?.map((item) => (
                        <Link key={item?.Id} href={`news/${item.Slug}`}>
                            <div className="news-slides-item common-slides-item">
                                <div className="news-slide-img common-slide-img">
                                    <div className="container-ratio">
                                        <div className="ratio">
                                            <img src={item?.Image} alt={item?.Title} />
                                        </div>
                                    </div>
                                </div>
                                <div className="common-slide-content">
                                    <p className="title">{item?.Title}</p>
                                    <p className="date">
                                        <FormattedDate value={item?.CreatedAt} day="2-digit" month="2-digit" year="numeric" />
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </Slider>
            )}
        </div>
    );
};

export default NewsSlides;