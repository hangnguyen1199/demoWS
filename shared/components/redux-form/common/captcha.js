import constants from '@spo/config/constants';
import React, {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useRef,
    useState
} from 'react';
// import ReCAPTCHA from 'react-google-recaptcha';

const Captcha = forwardRef((props, ref) => {
    const captchaRef = useRef(null);
    const [loadScript, setLoadScript] = useState(false);
    useEffect(() => {
        setTimeout(() => {
            setLoadScript(true)
        }, constants.DELAY_LOAD_SCRIPT_TIME);
    }, []);
    useEffect(() => {
        captchaRef.current.execute();
    }, []);
    useImperativeHandle(ref, () => ({
        reset() {
            captchaRef.current.execute();
        },
    }));

    return (
        <div className="captcha">
            {/* {loadScript && (
                <ReCAPTCHA
                    ref={captchaRef}
                    size="invisible"
                    sitekey={constants.PLUGIN.RECAPTCHA.SITE_KEY}
                    onChange={(response) => props.input.onChange(response)}
                />
            )} */}
        </div>
    );
});
export default Captcha;
