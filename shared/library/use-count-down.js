import { useEffect, useState } from 'react';

export const useCountDown = (initTimer) => {
    const [time, _setTime] = useState(initTimer);
    const [reset, setReset] = useState(initTimer);
    useEffect(() => {
        let timer = initTimer;
        let minutes;
        let seconds;
        let myInterval = setInterval(function () {
            // minutes = parseInt(timer / 60, 10);
            // seconds = parseInt(timer % 60, 10);

            // minutes = minutes < 10 ? '0' + minutes : minutes;
            // seconds = seconds < 10 ? '0' + seconds : seconds;
            if(timer > 0){
                timer--;
                _setTime(timer)
            }
        }, 1000);
        return () => {
            clearInterval(myInterval);
        };
    }, [reset]);

    const setTime = (number) => {
        _setTime(number);
        setReset(!reset)
    };
    return [time, setTime];
};

export default useCountDown;
