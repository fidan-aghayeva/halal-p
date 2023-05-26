import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/link';
import classNames from 'classnames';
import { Select } from '@mantine/core';
import DeviceDetector from '@shared/DeviceDetector';
import { ArrowDownIcon } from 'assets/icons';
import { LANGUAGES } from 'utils/constants';
import { DEVICE_TYPES } from 'utils/device-detection';
import { globalActions } from 'redux/slices/global';
import Cookie, { COOKIE_KEYS } from 'utils/cookie';

import styles from './Language.module.scss';

const Language = props => {
    const { homePage } = props;

    const dispatch = useDispatch();
    const router = useRouter();
    const { asPath } = router;

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
                value: LANGUAGES.en,
                label: 'EN',
            },
        ].filter(lang => lang.value !== language);
    }, [language]);

    const onChange = lang => {
        dispatch(globalActions.changeLanguage(lang));

        router.push(asPath, router.asPath, { locale: lang, scroll: false });

        Cookie.setItem(COOKIE_KEYS.language, lang);
    };

    return (
        <>
            <DeviceDetector hidden={[DEVICE_TYPES.desktop]}>
                <div className={styles.languages}>
                    {languageOptions.map(language => (
                        <Link
                            href={asPath}
                            className={styles.language}
                            key={language.value}
                            onClick={() => onChange(language.value)}
                            locale={language.value}
                            scroll={false}
                        >
                            {language.label}
                        </Link>
                    ))}
                </div>
            </DeviceDetector>
            <DeviceDetector visible={[DEVICE_TYPES.desktop]}>
                <Select
                    className={classNames(styles.selectContainer, { homePage })}
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
