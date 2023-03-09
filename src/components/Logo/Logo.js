import Link from 'next/link';
import { LogoIcon, WhiteLogoIcon } from 'assets/icons';

import styles from './Logo.module.scss';

const Logo = props => {
    const { whiteLogo } = props;

    return (
        <Link href={'/'}>
            {whiteLogo ? <WhiteLogoIcon className={styles.logo} /> : <LogoIcon className={styles.logo} />}
        </Link>
    );
};

export default Logo;
