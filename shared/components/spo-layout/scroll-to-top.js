import useWindowScroll from '@spo/lib/use-window-scroll';
import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';

const ScrollToTop = (props) => {
    const intl = useIntl()
    const { scrollY } = useWindowScroll();
    const [_state, setNewState] = useState({
        isShow: false,
    });
    useEffect(() => {
        if (scrollY > 38) {
            setNewState({
                isShow: true,
            });
        } else {
            setNewState({
                isShow: false,
            });
        }
    }, [scrollY]);
    const goToTop = () => {
        let valueScroll = scrollY;
        var loop = setInterval(() => {
            if (valueScroll <= 0.1) {
                window.scrollTo(0, 0);
                setNewState({
                    isShow: false,
                });
                clearInterval(loop);
            } else {
                valueScroll -= valueScroll * 0.1;
                window.scrollTo(0, valueScroll);
            }
        }, 1);
    };
    return (
        <span
            id="site-scroll"
            title={intl.formatMessage({
                id: 'common.scroll_top',
            })}
            style={{ display: _state.isShow ? 'flex' : 'none' }}
            onClick={goToTop}>
            <i className="icon anm anm-angle-up-r"></i>
        </span>
    );
};

export default React.memo(ScrollToTop);
