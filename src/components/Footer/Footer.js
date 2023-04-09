import DeviceDetector from '@shared/DeviceDetector';
import Logo from 'components/Logo';
import { DEVICE_TYPES } from 'utils/device-detection';
import { InstagramIcon, FacebookIcon, LinkedinIcon } from 'assets/icons';
import useTranslations from 'hooks/use-translations';

import styles from './Footer.module.scss';

const Footer = () => {
    const T = useTranslations();

    return (
        <footer className={styles.footer}>
            <Logo whiteLogo={true} />
            <DeviceDetector hidden={[DEVICE_TYPES.mobile]}>
                <span>{T.all_rights_reserved}</span>
            </DeviceDetector>
            <div className={styles.socialMediaLinks}>
                <a className={styles.icon} href={''} target={'blank'}>
                    <FacebookIcon />
                </a>
                <a className={styles.icon} href={''} target={'blank'}>
                    <InstagramIcon />
                </a>
                <a className={styles.icon} href={''} target={'blank'}>
                    <LinkedinIcon />
                </a>
            </div>
        </footer>
    );
};

export default Footer;
