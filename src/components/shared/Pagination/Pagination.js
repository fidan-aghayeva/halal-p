import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { Pagination as MantinePagination } from '@mantine/core';

import styles from './Pagination.module.scss';

const Pagination = () => {
    const router = useRouter();
    const { query } = router;
    const { page = 1 } = query;

    const paginationProps = useSelector(state => state.global.pagination);
    const { totalPage } = paginationProps;

    const onChange = value => {
        router.push({ href: router.pathname, query: { ...query, page: value } }, undefined, { scroll: false });
    };

    return (
        <MantinePagination
            className={styles.pagination}
            page={Number(page)}
            defaultValue={1}
            noWrap
            onChange={onChange}
            total={totalPage}
            radius={0}
        />
    );
};

export default Pagination;
