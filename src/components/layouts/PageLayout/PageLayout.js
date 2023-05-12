import { useRouter } from 'next/router';
import DeviceDetector from '@shared/DeviceDetector';
import { DEVICE_TYPES } from 'utils/device-detection';

import styles from './PageLayout.module.scss';

const PageLayout = props => {
    const { title, content, children } = props;

    const router = useRouter();
    const { asPath } = router;

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.content}>
                    <h1 className={styles.title}>{title}</h1>
                    <p className={styles.text}>{content}</p>
                </div>
                <DeviceDetector hidden={[DEVICE_TYPES.mobile]}>
                    <img src={`/images/pageImages/${asPath.split('/')[1]}.png`} alt={''} className={styles.image} />
                </DeviceDetector>
            </div>
            <div className={styles.main}>{children}</div>
        </div>
    );
};

export default PageLayout;
