import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { Pagination as MantinePagination } from '@mantine/core';

import styles from './Pagination.module.scss';

const Pagination = () => {
    const router = useRouter();
    const { asPath } = router;

    const paginationProps = useSelector(state => state.global.pagination);
    const { totalPage } = paginationProps;

    const onChange = value => {
        router.push(`page=${value}`, `page=${value}`, { scroll: false });
    };

    return (
        <MantinePagination
            className={styles.pagination}
            page={asPath[asPath.length]}
            defaultValue={1}
            noWrap
            onChange={onChange}
            total={totalPage}
            radius={0}
        />
    );
};

export default Pagination;
