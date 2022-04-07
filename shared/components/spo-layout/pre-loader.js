const Image = dynamic(
    () => import('@spo/components/common/image'),
    { ssr: false },
);
import usePrevious from '@spo/lib/use-previous';
// import Image from '@spo/components/common/image';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const PreLoader = props => {
    const [_state, setNewState] = useState({
        opacity: 1,
        display: 'block',
        updating: false
    });
    const prevProps = usePrevious(props);
    useEffect(() => {
        if (!prevProps || prevProps.loading !== props.loading) {
            setNewState({
                opacity: 1,
                display: 'block'
            });
            if (!props.loading && !_state.updating) {
                let { opacity } = _state;
                setNewState({
                    updating: true,
                });
                var loop = setInterval(() => {
                    if (opacity <= 0.1) {
                        setNewState({
                            opacity: 0,
                            display: 'none',
                            updating: false,
                        });
                        clearInterval(loop);
                    } else {
                        opacity -= opacity * 0.1;
                        setNewState({ opacity });
                    }
                }, 10);
            }
        }
    }, [props.loading]);

    return (
        <div id="pre-loader" style={{ opacity: _state.opacity, display: _state.display }}>
            <Image src={`/images/config/loader.gif`} alt="Loading..." />
        </div>
    );
};

PreLoader.propTypes = {
    loading: PropTypes.bool
}

PreLoader.defaultProps = {
    loading: true
}

export default React.memo(PreLoader)