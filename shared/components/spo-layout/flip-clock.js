
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import moment from 'moment';
import { FlipClock } from "reactflipclock-js";
import { TimeClockFlip } from './../../library/helper';

const CountDownTimeFlip = props => {
    const { endTime, fontSize, background } = props;
    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    useEffect(() => {
        if (endTime) {
            let duration = moment.duration(moment(endTime).diff(moment()));
            let totalSec = duration.asSeconds();
            let d = Math.floor(totalSec / (3600 * 24)); // get day
            let h = Math.floor(totalSec % (3600 * 24) / 3600); // get hours
            let m = Math.floor(totalSec % 3600 / 60) // get minutes
            let s = Math.floor(totalSec % 60); //  get seconds

            setDays(d);
            setHours(h);
            setMinutes(m);
            setSeconds(s);
        }
    }, [endTime]);
    useEffect(() => {
        let myInterval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    if (hours === 0) {
                        if (days === 0) {
                            clearInterval(myInterval);
                        }
                        if (days > 0) {
                            setDays(days - 1);
                            setHours(23);
                            setMinutes(59);
                            setSeconds(59);
                        }
                    } else {
                        setHours(hours - 1);
                        setMinutes(59);
                        setSeconds(59);
                    }
                } else {
                    setMinutes(minutes - 1);
                    setSeconds(59);
                }
            }
        }, 1000)
        return () => {
            clearInterval(myInterval);
        };
    });
    return (
        <div className={`d-flex ${props.className}`}>
            {endTime != '0001-01-01T00:00:00+00:00' && <FlipClock time={TimeClockFlip(endTime)} clockFace={`${Math.floor(moment.duration(moment(endTime).diff(moment())).asSeconds() / (3600 * 24)) > 0 ? "DailyCounter" : "HourlyCounter"}`} />}
        </div>
    );
};

CountDownTimeFlip.propTypes = {
}

CountDownTimeFlip.defaultProps = {
    fontSize: 24,
    background: ''
}

export default React.memo(CountDownTimeFlip)