import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Pagination from '@shared/Pagination';
import EventCard from './EventCard';
import PageLayout from 'components/layouts/PageLayout';
import { getBlogsDataByType } from 'utils/service';
import { globalActions } from 'redux/slices/global';
import { PAGE_TYPES, PAGINATION_SIZE } from 'utils/constants';
import useTranslations from 'hooks/use-translations';

import styles from './Events.module.scss';

const Events = () => {
    const T = useTranslations();
    const dispatch = useDispatch();
    const router = useRouter();
    const { locale } = router;

    const paginationProps = useSelector(state => state.global.pagination);
    const { isFetching, page } = paginationProps;

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
        const params = {
            lang: locale,
            type: PAGE_TYPES.event,
            page,
            pageSize: PAGINATION_SIZE,
        };

        getEventsData(params);
    }, [locale, page]);

    return (
        <PageLayout
            title={T.events}
            content={
                '“HALAL-P” MMC olaraq Azərbaycan bazarında 1996-cı ildən etibarən fəaliyyət göstəririk və dünyaca məşhur ticarət markalarının Azərbaycanda rəsmi təmsilçisiyik. Mətbəə, bank, korporativ və arxiv həlləri üzrə böyük təcrübə və biliklərə, eləcə də böyük və professional servis mərkəzinə sahibik.'
            }
        >
            <div className={styles.container}>
                {events.map(event => (
                    <EventCard key={event.id} event={event} />
                ))}
            </div>
            <Pagination />
        </PageLayout>
    );
};

export default Events;
