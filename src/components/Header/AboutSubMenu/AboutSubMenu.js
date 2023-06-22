import { useSelector } from 'react-redux';
import Link from 'next/link';
import useTranslations from 'hooks/use-translations';

import styles from './AboutSubMenu.module.scss';

const AboutSubMenu = () => {
    const T = useTranslations();

    const { language } = useSelector(state => state.global);

    return (
        <div className={styles.container}>
            <Link href={'/about'} className={styles.category} locale={language}>
                {T.sub_menu_item_1}
            </Link>
            <Link href={'/projects?page=1'} className={styles.category} locale={language}>
                {T.sub_menu_item_2}
            </Link>
            <Link href={'/events?page=1'} className={styles.category} locale={language}>
                {T.sub_menu_item_3}
            </Link>
            {/*<Link href={'/vacancies'} className={styles.category} locale={language}>*/}
            {/*    {T.sub_menu_item_4}*/}
            {/*</Link>*/}
        </div>
    );
};

export default AboutSubMenu;
