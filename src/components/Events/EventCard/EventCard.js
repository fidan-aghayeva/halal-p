import moment from 'moment/moment';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRightLongIcon } from 'assets/icons';
import { SERVICE_URL } from 'utils/constants';
import useTranslations from 'hooks/use-translations';

import styles from './EventCard.module.scss';

const EventCard = props => {
    const { event } = props;

    const T = useTranslations();

    const getDate = date => {
        return moment(date).format('DD MMMM YYYY');
    };

    return (
        <div className={styles.container}>
            <div className={styles.imageContainer}>
                <Image src={SERVICE_URL + event.mainImage} alt={event.title} fill />
            </div>
            <div className={'flex flex-row align-center'}>
                <span className={styles.createDate}>{getDate(event.publishedDate)}</span>
                <span className={styles.tag}>{event.section}</span>
            </div>
            <h3 className={styles.title}>{event.title}</h3>
            {/*<span className={styles.text}>{event.text}</span>*/}
            <Link href={'/'} className={styles.readMore}>
                {T.read_more} <ArrowRightLongIcon />
            </Link>
        </div>
    );
};

export default EventCard;
