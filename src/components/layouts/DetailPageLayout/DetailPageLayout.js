import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import classNames from 'classnames';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import ImageGallery from '@shared/ImageGallery';
import dompurify from 'isomorphic-dompurify';
import { getDate } from 'utils/helpers';
import { SERVICE_URL } from 'utils/constants';
import { DEVICE_TYPES } from 'utils/device-detection';

import styles from './DetailPageLayout.module.scss';

const DetailPageLayout = props => {
    const { data } = props;
    const { section, title, content, mainImage, publishedDate, otherImages, seo } = data;

    const { pathname } = useRouter();
    const pageType = pathname.split('/')[1];

    const {
        currentDevice: { type },
    } = useSelector(state => state.global);

    const sanitizer = dompurify.sanitize;

    return (
        <>
            <Head>
                <title>{seo.title}</title>
                <meta name='description' content={seo.description} />
                <meta name='keywords' content={seo.keyword} />
                <meta property='og:title' content={seo.title} />
                <meta property='og:description' content={seo.description} />
                <meta property='og:image' content={mainImage} />
            </Head>
            <div className={styles.container}>
                <h1 className={styles.title}>{title}</h1>
                <div className={styles.dateAndTag}>
                    <span className={styles.date}>{getDate(publishedDate)}</span>
                    {pageType !== 'projects' && section && (
                        <Link href={`/${pageType}/tag/${section.slug}/${section.id}?page=1`} className={styles.tag}>
                            {section.name}
                        </Link>
                    )}
                </div>
                <div className={styles.mainImageContainer}>
                    <Image src={SERVICE_URL + mainImage} alt={title} fill />
                </div>
                <div
                    className={classNames(styles.content, { withoutImages: pageType !== 'blog' })}
                    dangerouslySetInnerHTML={{ __html: sanitizer(content) }}
                />
                {pageType !== 'blog' && otherImages.length > 0 && (
                    <ImageGallery
                        images={otherImages}
                        showFullscreenButton={type !== DEVICE_TYPES.mobile}
                        showThumbnails={type !== DEVICE_TYPES.mobile}
                    />
                )}
            </div>
        </>
    );
};

export default DetailPageLayout;
