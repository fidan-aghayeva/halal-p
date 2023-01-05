import DeviceDetector from '@shared/DeviceDetector';
import Logo from 'components/Logo';
import { DEVICE_TYPES } from 'utils/device-detection';
import { InstagramIcon, FacebookIcon, LinkedinIcon } from 'assets/icons';

import styles from './Footer.module.scss';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <Logo whiteLogo={true} />
            <DeviceDetector hidden={[DEVICE_TYPES.mobile]}>
                <span>© 2022 All Rights Reserved</span>
            </DeviceDetector>
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
        </footer>
    );
};

export default Footer;
