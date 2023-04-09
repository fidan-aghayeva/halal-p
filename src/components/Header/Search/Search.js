import { useDispatch, useSelector } from 'react-redux';
import { SearchIcon } from 'assets/icons';
import { globalActions } from 'redux/slices/global';
import useTranslations from 'hooks/use-translations';

import styles from './Search.module.scss';

const Search = () => {
    const dispatch = useDispatch();
    const T = useTranslations();

    const { keyword } = useSelector(state => state.global.headerSearchProps);

    const onSearchClick = () => {
        if (!keyword) {
            dispatch(globalActions.changeHeaderSearchProps({ isVisible: false }));
        } else {
            console.log('route search page');
        }
    };

    const onSearchChange = e => {
        const { value } = e.target;

        dispatch(globalActions.changeHeaderSearchProps({ keyword: value }));
    };

    const onKeyPress = () => {
        console.log('route search page');
    };

    return (
        <div className={styles.container}>
            <input
                onChange={onSearchChange}
                onKeyPress={onKeyPress}
                className={styles.input}
                placeholder={T.search_by_product}
            />
            <SearchIcon onClick={onSearchClick} className={styles.icon} />
        </div>
    );
};

export default Search;
