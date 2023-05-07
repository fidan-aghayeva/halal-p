import { useDispatch, useSelector } from 'react-redux';
import { Pagination as MantinePagination } from '@mantine/core';
import { globalActions } from 'redux/slices/global';

import styles from './Pagination.module.scss';

const Pagination = () => {
    const dispatch = useDispatch();

    const paginationProps = useSelector(state => state.global.pagination);
    const { page, totalPage } = paginationProps;

    const onChange = value => {
        dispatch(globalActions.setPagination({ page: value }));
    };

    return (
        <MantinePagination
            className={styles.pagination}
            page={page}
            defaultValue={1}
            noWrap
            onChange={onChange}
            total={totalPage}
            radius={0}
        />
    );
};

export default Pagination;
