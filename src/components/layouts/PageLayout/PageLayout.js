import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import dompurify from 'isomorphic-dompurify';
import Head from 'next/head';
import DeviceDetector from '@shared/DeviceDetector';
import { DEVICE_TYPES } from 'utils/device-detection';
import { getPageDescriptionByType } from 'utils/service';
import { PAGE_TYPES } from 'utils/constants';

import styles from './PageLayout.module.scss';

const PageLayout = props => {
    const { title, children } = props;

    const router = useRouter();
    const { locale, pathname } = router;
    const pageType = pathname.split('/')[1];

    const sanitizer = dompurify.sanitize;

    const [content, setContent] = useState('');

    const getPageContent = async ({ lang, type }) => {
        const data = await getPageDescriptionByType({ lang, type: PAGE_TYPES[type] });

        setContent(data.text);
    };

    useEffect(() => {
        getPageContent({ lang: locale, type: pageType });
    }, [locale, pageType]);

    return (
        <>
            <Head>
                <title>{title}</title>
                <meta property='og:title' content={title} />
            </Head>
            <div className={styles.container}>
                <div className={styles.header}>
                    <div className={styles.content}>
                        <h1 className={styles.title}>{title}</h1>
                        <div className={styles.text} dangerouslySetInnerHTML={{ __html: sanitizer(content) }} />
                    </div>
                    <DeviceDetector hidden={[DEVICE_TYPES.mobile]}>
                        <img src={`/images/pageImages/${pageType}.png`} alt={''} className={styles.image} />
                    </DeviceDetector>
                </div>
                <div className={styles.main}>{children}</div>
            </div>
        </>
    );
};

export default PageLayout;
