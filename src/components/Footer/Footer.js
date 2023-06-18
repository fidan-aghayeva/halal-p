import { useSelector } from 'react-redux';
import DeviceDetector from '@shared/DeviceDetector';
import Logo from 'components/Logo';
import { DEVICE_TYPES } from 'utils/device-detection';
import { InstagramIcon, FacebookIcon, LinkedinIcon } from 'assets/icons';
import useTranslations from 'hooks/use-translations';

import styles from './Footer.module.scss';

const Footer = () => {
    const T = useTranslations();

    const { siteData, contact } = useSelector(state => state.global);

    return (
        <footer className={styles.footer}>
            <Logo path={siteData?.logoDark?.path} />
            <DeviceDetector hidden={[DEVICE_TYPES.mobile]}>
                <span>{T.all_rights_reserved}</span>
            </DeviceDetector>
            <div className={styles.socialMediaLinks}>
                <a className={styles.icon} href={contact?.Facebook} target={'blank'} name={'Facebook link'}>
                    <FacebookIcon />
                </a>
                <a className={styles.icon} href={contact?.Instagram} target={'blank'} name={'Instagram Link'}>
                    <InstagramIcon />
                </a>
                <a className={styles.icon} href={contact?.Linkedin} target={'blank'} name={'Linkedin link'}>
                    <LinkedinIcon />
                </a>
            </div>
        </footer>
    );
};

export default Footer;
