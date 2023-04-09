import classNames from 'classnames';
import PageLayout from 'components/layouts/PageLayout';
import useTranslations from 'hooks/use-translations';

import styles from './Events.module.scss';
import { events } from '../../utils/mock';
import EventCard from './EventCard';
import Link from 'next/link';

const Events = () => {
    const T = useTranslations();

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
            <button className={styles.showMore}>{T.show_more}</button>
        </PageLayout>
    );
};

export default Events;
