const Image = dynamic(() => import('@spo/components/common/image'), {
    ssr: false,
});

// import Image from '@spo/components/common/image';
import useCustomRoute from '@spo/lib/use-custom-route';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch } from 'react-redux';
import { openNewTab } from '../../library/helper';
import dynamic from 'next/dynamic';

const Advertising = (props) => {
    const dispatch = useDispatch();
    const {
        item: { image_o, href, new_tab = true },
    } = props;
    const onGoto = () => {
        if (new_tab) {
            openNewTab(href);
        } else {
            useCustomRoute(dispatch, href);
        }
    };
    return (
        image_o !== '' && (
            <div className="col-12 item grid-view-item style2 mb-10">
                <a
                    onClick={onGoto}
                    className={`grid-view_image grid-view-item__link advertising ${
                        href && 'pointer'
                    }`}>
                    <Image
                        lazy_offset={0}
                        title="Banner Outfiz"
                        className="grid-view-item__image blur-up ls-is-cached lazyloaded w-100 h-100"
                        src={image_o}
                        seo="outfiz"
                    />
                </a>
            </div>
        )
    );
};

Advertising.propTypes = {
    id: PropTypes.number,
    name: PropTypes.string,
    image: PropTypes.string,
};

Advertising.defaultProps = {
    id: 0,
    image: '',
    name: '',
};

export default Advertising;
