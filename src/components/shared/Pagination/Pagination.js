import { Pagination as MantinePagination } from '@mantine/core';
import { ArrowLeftIcon, ArrowRightIcon } from 'assets/icons';

import styles from './Pagination.module.scss';

const Pagination = props => {
    const { defaultValue, onChange, total, page } = props;

    return (
        <MantinePagination
            className={styles.pagination}
            page={page}
            defaultValue={defaultValue}
            noWrap
            onChange={onChange}
            total={total}
            radius={0}
        />
    );
};

export default Pagination;
