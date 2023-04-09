import Link from 'next/link';
import useTranslations from 'hooks/use-translations';

import styles from './AboutSubMenu.module.scss';

const AboutSubMenu = () => {
    const T = useTranslations();

    return (
        <div className={styles.container}>
            <Link href={'/about'} className={styles.category}>
                {T.sub_menu_item_1}
            </Link>
            <Link href={'/projects'} className={styles.category}>
                {T.sub_menu_item_2}
            </Link>
            <Link href={'/events'} className={styles.category}>
                {T.sub_menu_item_3}
            </Link>
            <Link href={'/vacancies'} className={styles.category}>
                {T.sub_menu_item_4}
            </Link>
        </div>
    );
};

export default AboutSubMenu;
