import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Display from '@spo/components/common/display';
import { useDispatch } from 'react-redux';
import { useCustomRoute } from '../../library/use-custom-route';
import CustomFrame from '../common/custom-frame';
import Image from '../common/image';
import Utils from '../../utils/utils';

const NewsMobile = (props) => {
    const { prefix = 'news' } = props;
    const dispatch = useDispatch();
    const gotoDetail = (slug, e) => {
        e.preventDefault();
        e.stopPropagation();
        useCustomRoute(dispatch, `/${prefix}/${slug}`);
    };
    return (
        <div className="news-info mobile" >
            <Link
                onClick={(e) => gotoDetail(props.item.Slug, e)}
                prefetch={false}
                href={`/${prefix}/[slug]`}
                as={`/${prefix}/${props.item.Slug}`}>
                <a>
                    {
                        prefix == 'news' ? <CustomFrame ratio={141 / 345}>
                            <Image
                                className="w-100 h-100"
                                src={props.item.Image}
                                seo={props.item?.Title}
                            />
                        </CustomFrame> : <Image
                            className="w-100 h-100"
                            src={props.item.Image}
                            seo={props.item?.Title}
                        />
                    }

                </a>
            </Link>
            {
                prefix == 'news' ? <>
                    <div className="news-content">
                        <Link
                            onClick={(e) => gotoDetail(props.item.Slug, e)}
                            prefetch={false}
                            href={`/${prefix}/[slug]`}
                            as={`/${prefix}/${props.item.Slug}`}>
                            <a className="d-start news-post-title fontsize16 ">
                                {props.item.Title}
                            </a>
                        </Link>
                        <div className="news-post-time d-start fontsize14">
                            {Utils._formatDate(new Date(props.item.CreatedAt))}
                        </div>
                    </div>
                </> : <></>
            }

        </div>
    );
};

NewsMobile.propTypes = {
    Id: PropTypes.number,
    Title: PropTypes.string,
    Slug: PropTypes.string,
    Image: PropTypes.string,
    Descriptions: PropTypes.string,
    ViewCount: PropTypes.string,
    CreatedAt: PropTypes.string,
    AuthorName: PropTypes.string,
};

NewsMobile.defaultProps = {
    Id: 0,
    Title: '',
    Slug: '',
    Image: '',
    Descriptions: '',
    ViewCount: '',
    CreatedAt: '',
    AuthorName: '',
};

export default NewsMobile;
