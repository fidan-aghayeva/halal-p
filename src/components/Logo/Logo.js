import Link from 'next/link';
import Image from 'next/image';
import { SERVICE_URL } from 'utils/constants';

import styles from './Logo.module.scss';

const Logo = props => {
    const { path } = props;

    return (
        <Link href={'/'} className={styles.logo}>
            {path && <Image src={SERVICE_URL + path} alt={'logo'} fill sizes='(max-width: 1024px) 122px,  176px' />}
        </Link>
    );
};

export default Logo;
