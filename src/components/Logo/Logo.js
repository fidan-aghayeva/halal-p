import Link from 'next/link';
import Image from 'next/image';
import { SERVICE_URL } from 'utils/constants';

import styles from './Logo.module.scss';

const Logo = props => {
    const { path } = props;

    return (
        <Link href={'/'} className={styles.logo}>
            <Image src={SERVICE_URL + path} alt={'logo'} fill />
        </Link>
    );
};

export default Logo;
