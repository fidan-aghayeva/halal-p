import { useSelector } from 'react-redux';
import AppLocale from '../lang';
import { DEFAULT_LANGUAGE } from 'utils/constants';

const useTranslations = () => {
    const { language = DEFAULT_LANGUAGE } = useSelector(state => state.global);

    return AppLocale[language];
};

export default useTranslations;
