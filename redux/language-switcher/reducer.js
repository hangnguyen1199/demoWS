import actions from '@spo/redux/language-switcher/action';
import AppLocale from '@spo/config/translation';

const initState = {
    lang: AppLocale.vi
}

const setLang = (state, action) => {
    for (let key in AppLocale) {
        if (!AppLocale.hasOwnProperty(key)) {continue;}
        let language = AppLocale[key];
        if (language.locale === action.locale) {
            if (language.locale !== state.lang.locale) {
                return {
                    ...state,
                    lang: language
                };
            }
            else {
                return {
                    ...state
                };
            }
        }
    }
};

const LanguageSwitcherReducer = (state = initState, action) => {
    switch (action.type) {
        case actions.SWITCH_LANGUAGE:
            return setLang(state, action);
        default:
            return {
                ...state
            };
    }
};

export default LanguageSwitcherReducer;