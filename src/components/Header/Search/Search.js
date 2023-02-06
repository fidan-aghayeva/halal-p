import { useDispatch, useSelector } from 'react-redux';
import { SearchIcon } from 'assets/icons';
import { globalActions } from 'redux/slices/global';

import styles from './Search.module.scss';

const Search = () => {
    const dispatch = useDispatch();

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
                placeholder={'Məhsul üzrə axtarış...'}
            />
            <SearchIcon onClick={onSearchClick} className={styles.icon} />
        </div>
    );
};

export default Search;
