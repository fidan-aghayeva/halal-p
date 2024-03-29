import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { Loader } from '@mantine/core';
import Pagination from '@shared/Pagination';
import PageLayout from 'components/layouts/PageLayout';
import ProjectCard from 'components/ProjectCard';
import { getBlogsDataByType } from 'utils/service';
import { globalActions } from 'redux/slices/global';
import { PAGE_TYPES, PAGINATION_SIZES } from 'utils/constants';
import useTranslations from 'hooks/use-translations';

import styles from './Projects.module.scss';

const Projects = () => {
    const T = useTranslations();
    const dispatch = useDispatch();
    const router = useRouter();
    const {
        query: { page },
        locale,
    } = router;

    const paginationProps = useSelector(state => state.global.pagination);
    const { isFetching } = paginationProps;

    const [projects, setProjects] = useState([]);

    const getProjectsData = async params => {
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

        setProjects(data.blogs);

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
            type: PAGE_TYPES.projects,
            page,
            pageSize: PAGINATION_SIZES.projects,
        };

        getProjectsData(params);
    }, [locale, page]);

    return (
        <PageLayout title={T.projects}>
            {isFetching ? (
                <Loader variant={'bars'} color={'#1ca29b'} />
            ) : (
                <>
                    <div className={styles.container}>
                        {projects.map(project => (
                            <ProjectCard className={styles.projectCard} key={project.id} project={project} />
                        ))}
                    </div>
                    <Pagination />
                </>
            )}
        </PageLayout>
    );
};

export default Projects;
