import { useSelector } from 'react-redux';
import AppLocale from '../lang';

const useTranslations = () => {
    const { language } = useSelector(state => state.global);

    return AppLocale[language];
};

export default useTranslations;
