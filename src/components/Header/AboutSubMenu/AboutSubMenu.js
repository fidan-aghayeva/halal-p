import Link from 'next/link';

import styles from './AboutSubMenu.module.scss';

const AboutSubMenu = () => {
    return (
        <div className={styles.container}>
            <Link href={'/category'} className={styles.category}>
                Şirkət haqqında
            </Link>
            <Link href={'/category'} className={styles.category}>
                Layihələrimiz
            </Link>
            <Link href={'/category'} className={styles.category}>
                Tədbirlərimiz
            </Link>
            <Link href={'/category'} className={styles.category}>
                Vakansiyalar
            </Link>
        </div>
    );
};

export default AboutSubMenu;
