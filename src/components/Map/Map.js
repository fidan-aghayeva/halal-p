import {
    AddressIcon,
    MailIcon,
    PhoneIcon,
    OfficePhoneIcon,
    FacebookIcon,
    InstagramIcon,
    LinkedinIcon,
} from 'assets/icons';

import styles from './Map.module.scss';

const Map = () => {
    return (
        <div className={styles.container}>
            <div className={styles.contactInfo}>
                <div className={styles.contactItem}>
                    <AddressIcon />
                    S.S.Axundov 5f küç., 2-ci mərtəbə
                </div>
                <div className={styles.contactItem}>
                    <PhoneIcon />
                    +994 12 436 26 21
                </div>
                <div className={styles.contactItem}>
                    <OfficePhoneIcon />
                    +994 12 436 26 21
                </div>
                <div className={styles.contactItem}>
                    <MailIcon />
                    info@halal.az
                </div>
                <div className={styles.socialMediaLinks}>
                    <a className={styles.icon} href={''} target={'_blank'}>
                        <FacebookIcon />
                    </a>
                    <a className={styles.icon} href={''} target={'_blank'}>
                        <InstagramIcon />
                    </a>
                    <a className={styles.icon} href={''} target={'_blank'}>
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
    );
};

export default Map;
