import { useSelector } from 'react-redux';
import {
    AddressIcon,
    MailIcon,
    PhoneIcon,
    OfficePhoneIcon,
    FacebookIcon,
    InstagramIcon,
    LinkedinIcon,
} from 'assets/icons';
import useTranslations from 'hooks/use-translations';

import styles from './Map.module.scss';

const Map = () => {
    const T = useTranslations();

    const { contact } = useSelector(state => state.global);

    return (
        contact && (
            <div className={styles.container}>
                <div className={styles.contactInfo}>
                    <div className={styles.contactItem}>
                        <AddressIcon />
                        {T.address}
                    </div>
                    <div className={styles.contactItem}>
                        <PhoneIcon />
                        {contact.Mobile}
                    </div>
                    <div className={styles.contactItem}>
                        <OfficePhoneIcon />
                        {contact.Office}
                    </div>
                    <div className={styles.contactItem}>
                        <MailIcon />
                        {contact.Email}
                    </div>
                    <div className={styles.socialMediaLinks}>
                        <a className={styles.icon} href={contact.Facebook} target={'blank'}>
                            <FacebookIcon />
                        </a>
                        <a className={styles.icon} href={contact.Instagram} target={'blank'}>
                            <InstagramIcon />
                        </a>
                        <a className={styles.icon} href={contact.Linkedin} target={'blank'}>
                            <LinkedinIcon />
                        </a>
                    </div>
                </div>
                <iframe
                    src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d74524.66790469673!2d49.83329811130714!3d40.46403010602734!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4030897351b90e2b%3A0xc1add181667912aa!2sHalal-P%20MMC!5e0!3m2!1saz!2saz!4v1677755167278!5m2!1saz!2saz'
                    width='100%'
                    style={{ border: '0px' }}
                    allowFullScreen=''
                    loading='lazy'
                    referrerPolicy='no-referrer-when-downgrade'
                />
            </div>
        )
    );
};

export default Map;
