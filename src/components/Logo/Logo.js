import { LogoIcon, WhiteLogoIcon } from 'assets/icons';

import styles from './Logo.module.scss';

const Logo = props => {
    const { whiteLogo } = props;

    return whiteLogo ? <WhiteLogoIcon className={styles.logo} /> : <LogoIcon className={styles.logo} />;
};

export default Logo;
