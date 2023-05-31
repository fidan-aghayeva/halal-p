import { useSelector } from 'react-redux';
import dompurify from 'isomorphic-dompurify';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRightLongIcon } from 'assets/icons';
import { SERVICE_URL } from 'utils/constants';
import { getDate } from 'utils/helpers';
import useTranslations from 'hooks/use-translations';

import styles from './EventCard.module.scss';

const EventCard = props => {
    const { event } = props;

    const T = useTranslations();
    const { language } = useSelector(state => state.global);

    const sanitizer = dompurify.sanitize;

    return (
        <div className={styles.container}>
            <div className={styles.imageContainer}>
                <Image src={SERVICE_URL + event.mainImage} alt={event.title} fill />
            </div>
            <div className={'flex flex-row align-center'}>
                <span className={styles.date}>{getDate(event.publishedDate)}</span>
                <Link
                    scroll={false}
                    href={`/events/tag/${event.section.slug}/${event.section.id}?page=1`}
                    className={styles.tag}
                    locale={language}
                >
                    {event.section.name}
                </Link>
            </div>
            <h3 className={styles.title}>{event.title}</h3>
            <div className={styles.content} dangerouslySetInnerHTML={{ __html: sanitizer(event.content) }} />
            <Link href={`/events/${event.slug}-${event.id}`} className={styles.readMore} locale={language}>
                {T.read_more} <ArrowRightLongIcon />
            </Link>
        </div>
    );
};

export default EventCard;
