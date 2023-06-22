import useTranslations from 'hooks/use-translations';

import styles from './Service.module.scss';

const Service = () => {
    const T = useTranslations();

    return <div className={styles.container}>{T.soon}</div>;
};

export default Service;
