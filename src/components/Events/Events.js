import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { Loader } from '@mantine/core';
import Pagination from '@shared/Pagination';
import EventCard from './EventCard';
import PageLayout from 'components/layouts/PageLayout';
import { getBlogsDataByType } from 'utils/service';
import { globalActions } from 'redux/slices/global';
import { PAGE_TYPES, PAGINATION_SIZES } from 'utils/constants';
import useTranslations from 'hooks/use-translations';

import styles from './Events.module.scss';

const Events = () => {
    const T = useTranslations();
    const dispatch = useDispatch();
    const router = useRouter();
    const {
        query: { page, tag },
        locale,
    } = router;

    const { pagination: paginationProps } = useSelector(state => state.global);
    const { isFetching } = paginationProps;

    const [events, setEvents] = useState([]);

    const getEventsData = async params => {
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

        setEvents(data.blogs);

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
                type: PAGE_TYPES.events,
                page,
                sectionId,
                pageSize: PAGINATION_SIZES.events,
            };
        } else {
            params = {
                lang: locale,
                type: PAGE_TYPES.events,
                page,
                pageSize: PAGINATION_SIZES.events,
            };
        }

        getEventsData(params);
    }, [locale, page, tag]);

    return (
        <PageLayout title={T.events}>
            {isFetching ? (
                <Loader variant={'bars'} color={'#1ca29b'} />
            ) : (
                <>
                    <div className={styles.container}>
                        {events.map(event => (
                            <EventCard key={event.id} event={event} />
                        ))}
                    </div>
                    <Pagination />
                </>
            )}
        </PageLayout>
    );
};

export default Events;
