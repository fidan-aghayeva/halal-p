import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import DeviceDetector from '@shared/DeviceDetector';
import { SearchIcon } from 'assets/icons';
import { DEVICE_TYPES } from 'utils/device-detection';
import { globalActions } from 'redux/slices/global';
import useTranslations from 'hooks/use-translations';

import styles from './Search.module.scss';

const Search = () => {
    const router = useRouter();
    const T = useTranslations();
    const dispatch = useDispatch();

    const { mobileMenuVisibility } = useSelector(state => state.global);

    const ref = useRef();

    const onSearchClick = () => {
        const keyword = ref.current.value;

        if (keyword) {
            router.push(`/search?name=${keyword}&page=1`);

            if (mobileMenuVisibility) {
                dispatch(globalActions.changeMobileMenuVisibility(false));
            }
        }
    };

    const onKeyPress = event => {
        if (event.keyCode === 13) {
            onSearchClick();
        }
    };

    return (
        <div className={styles.container}>
            <DeviceDetector visible={[DEVICE_TYPES.mobile]}>
                <SearchIcon onClick={onSearchClick} className={styles.icon} />
            </DeviceDetector>
            <input ref={ref} className={styles.input} placeholder={T.search_by_product} onKeyDown={onKeyPress} />
            <DeviceDetector hidden={[DEVICE_TYPES.mobile]}>
                <SearchIcon onClick={onSearchClick} className={styles.icon} />
            </DeviceDetector>
        </div>
    );
};

export default Search;
