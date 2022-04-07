const actions = {
    SWITCH_LANGUAGE: 'SWITCH_LANGUAGE',
    switchLanguage: (locale) => ({
        type: actions.SWITCH_LANGUAGE,
        locale,
    }),
};

export default actions;
