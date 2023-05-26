import Map from 'components/Map';
import useTranslations from 'hooks/use-translations';

import styles from './Contact.module.scss';

const Contact = () => {
    const T = useTranslations();

    return (
        <div className={styles.container}>
            <h2 className={'title'}>{T.contact}</h2>
            <Map />
        </div>
    );
};

export default Contact;
