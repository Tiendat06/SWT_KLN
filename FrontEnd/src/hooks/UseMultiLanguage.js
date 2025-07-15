import {useTranslation} from "react-i18next";

const useMultiLanguage = () => {
    const {t, i18n} = useTranslation();

    const changeLanguage = (language) => {
        i18n.changeLanguage(language);
    }

    return {localizer: t, i18n, changeLanguage};
}

export default useMultiLanguage;