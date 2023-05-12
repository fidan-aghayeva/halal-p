import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { Loader } from '@mantine/core';
import Pagination from '@shared/Pagination';
import BlogCard from './BlogCard';
import PageLayout from 'components/layouts/PageLayout';
import { getBlogsDataByType } from 'utils/service';
import { globalActions } from 'redux/slices/global';
import { PAGE_TYPES, PAGINATION_SIZE } from 'utils/constants';
import useTranslations from 'hooks/use-translations';

import styles from './Blogs.module.scss';

const Blogs = () => {
    const T = useTranslations();
    const dispatch = useDispatch();
    const router = useRouter();
    const {
        query: { blog },
        locale,
    } = router;
    const page = blog[0].split('=')[1];

    const paginationProps = useSelector(state => state.global.pagination);
    const { isFetching } = paginationProps;

    const [blogs, setBlogs] = useState([]);

    const getBlogsData = async params => {
        dispatch(
            globalActions.setPagination({
                isFetching: true,
            })
        );

        const data = await getBlogsDataByType(params);

        if (!data) {
            dispatch(
                globalActions.setPagination({
                    isFetching: false,
                })
            );
        }

        setBlogs(data.blogs);

        dispatch(
            globalActions.setPagination({
                totalPage: data.totalPage,
                isFetching: false,
            })
        );
    };

    useEffect(() => {
        const params = {
            lang: locale,
            type: PAGE_TYPES.blog,
            page,
            pageSize: PAGINATION_SIZE,
        };

        getBlogsData(params);
    }, [locale, page]);

    return (
        <PageLayout
            title={T.blog}
            content={
                '“HALAL-P” MMC olaraq Azərbaycan bazarında 1996-cı ildən etibarən fəaliyyət göstəririk və dünyaca məşhur ticarət markalarının Azərbaycanda rəsmi təmsilçisiyik. Mətbəə, bank, korporativ və arxiv həlləri üzrə böyük təcrübə və biliklərə, eləcə də böyük və professional servis mərkəzinə sahibik.'
            }
        >
            {isFetching ? (
                <Loader variant={'bars'} color={'#1ca29b'} />
            ) : (
                <div className={styles.container}>
                    {blogs.map(event => (
                        <BlogCard key={event.id} event={event} />
                    ))}
                </div>
            )}
            <Pagination />
        </PageLayout>
    );
};

export default Blogs;
