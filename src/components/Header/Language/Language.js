import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Select } from '@mantine/core';
import DeviceDetector from '@shared/DeviceDetector';
import { ArrowDownIcon } from 'assets/icons';
import { LANGUAGES } from 'utils/constants';
import Cookie, { COOKIE_KEYS } from 'utils/cookie';
import { DEVICE_TYPES } from 'utils/device-detection';
import { globalActions } from 'redux/slices/global';

import styles from './Language.module.scss';

const Language = () => {
    const dispatch = useDispatch();

    const { language } = useSelector(state => state.global);

    const languageOptions = useMemo(() => {
        return [
            {
                value: LANGUAGES.az,
                label: 'AZ',
            },
            {
                value: LANGUAGES.ru,
                label: 'RU',
            },
            {
                value: LANGUAGES.eng,
                label: 'ENG',
            },
        ].filter(lang => lang.value !== language);
    }, [language]);

    const onChange = lang => {
        dispatch(globalActions.changeLanguage(lang));

        Cookie.setItem(COOKIE_KEYS.language, lang);
    };

    return (
        <>
            <DeviceDetector hidden={[DEVICE_TYPES.desktop]}>
                <div className={styles.languages}>
                    {languageOptions.map(language => (
                        <span className={styles.language} key={language.value} onClick={() => onChange(language.value)}>
                            {language.label}
                        </span>
                    ))}
                </div>
            </DeviceDetector>
            <DeviceDetector visible={[DEVICE_TYPES.desktop]}>
                <Select
                    className={styles.selectContainer}
                    data={languageOptions}
                    rightSection={<ArrowDownIcon />}
                    searchable={false}
                    onChange={onChange}
                    placeholder={language}
                />
            </DeviceDetector>
        </>
    );
};

export default Language;
