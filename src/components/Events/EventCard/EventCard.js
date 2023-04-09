import Link from 'next/link';
import { ArrowRightLongIcon } from 'assets/icons';
import useTranslations from 'hooks/use-translations';

import styles from './EventCard.module.scss';

const EventCard = props => {
    const { event } = props;

    const T = useTranslations();

    return (
        <div className={styles.container}>
            <img src={'/images/events/event.png'} className={styles.image} />
            <div className={'flex flex-row align-center'}>
                <span className={styles.createDate}>{event.createDate}</span>
                <span className={styles.tag}>{event.tag}</span>
            </div>
            <h3 className={styles.title}>{event.title}</h3>
            <span className={styles.text}>{event.text}</span>
            <Link href={'/'} className={styles.readMore}>
                {T.read_more} <ArrowRightLongIcon />
            </Link>
        </div>
    );
};

export default EventCard;
