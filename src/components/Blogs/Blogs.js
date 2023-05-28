import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { Loader } from '@mantine/core';
import Pagination from '@shared/Pagination';
import BlogCard from './BlogCard';
import PageLayout from 'components/layouts/PageLayout';
import { getBlogsDataByType } from 'utils/service';
import { globalActions } from 'redux/slices/global';
import { PAGE_TYPES, PAGINATION_SIZES } from 'utils/constants';
import useTranslations from 'hooks/use-translations';

import styles from './Blogs.module.scss';

const Blogs = () => {
    const T = useTranslations();
    const dispatch = useDispatch();
    const router = useRouter();
    const {
        query: { page, tag },
        locale,
    } = router;

    const { pagination: paginationProps } = useSelector(state => state.global);
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
        let params;

        if (tag) {
            const sectionId = tag.at(-1);

            params = {
                lang: locale,
                type: PAGE_TYPES.blog,
                page,
                sectionId,
                pageSize: PAGINATION_SIZES.blog,
            };
        } else {
            params = {
                lang: locale,
                type: PAGE_TYPES.blog,
                page,
                pageSize: PAGINATION_SIZES.blog,
            };
        }

        getBlogsData(params);
    }, [locale, page, tag]);

    return (
        <PageLayout title={T.blog}>
            {isFetching ? (
                <Loader variant={'bars'} color={'#1ca29b'} />
            ) : (
                <>
                    <div className={styles.container}>
                        {blogs.map(blog => (
                            <BlogCard key={blog.id} blog={blog} />
                        ))}
                    </div>
                    <Pagination />
                </>
            )}
        </PageLayout>
    );
};

export default Blogs;
