import Head from 'next/head';
import classNames from 'classnames';
import DeviceDetector from '@shared/DeviceDetector';
import ImageGallery from '@shared/ImageGallery';
import { PDFIcon } from 'assets/icons';
import { DEVICE_TYPES } from 'utils/device-detection';
import { SERVICE_URL } from 'utils/constants';
import useTranslations from 'hooks/use-translations';

import styles from './ProductDetail.module.scss';

const ProductDetail = props => {
    const { product } = props;

    const T = useTranslations();

    return (
        <>
            <Head>
                <title>{product.seo?.title}</title>
                <meta name='description' content={product.seo?.description} />
                <meta name='keywords' content={product.seo?.keyword} />
                <meta property='og:title' content={product.seo?.title} />
                <meta property='og:description' content={product.seo?.description} />
                <meta property='og:image' content={SERVICE_URL + product.mainImage} />
            </Head>
            <div className={styles.container}>
                <div className={styles.galleryAndFrame}>
                    {product.otherImages.length > 0 && (
                        <ImageGallery images={[{ path: product.mainImage }, ...product.otherImages]} />
                    )}
                    <DeviceDetector visible={[DEVICE_TYPES.desktop]}>
                        <div className={styles.frame}>
                            <iframe
                                title={'This youtube video is about the product'}
                                src={product.youtubeLink}
                            ></iframe>
                        </div>
                    </DeviceDetector>
                </div>
                <div className={styles.productDetails}>
                    <h2 className={classNames('title', styles.name)}>{product.name}</h2>
                    <p className={styles.description}>{product.description}</p>
                    <h3 className={styles.attributesTitle}>{T.attributes}</h3>
                    <div className={styles.attributesContainer}>
                        {product.attributes.map(attribute => (
                            <div className={styles.attribute} key={attribute.key}>
                                <span>{attribute.key}</span>
                                <span className={styles.attributeValue}>{attribute.value}</span>
                            </div>
                        ))}
                    </div>
                    <a
                        href={SERVICE_URL + product.extraFile}
                        download
                        className={styles.brochure}
                        target={'blank'}
                        aria-label={'Brochure for product'}
                    >
                        <PDFIcon /> {T.brochure}
                    </a>
                </div>
                <DeviceDetector hidden={[DEVICE_TYPES.desktop]}>
                    <div className={styles.frame}>
                        <iframe title={'This youtube video is about the product'} src={product.youtubeLink}></iframe>
                    </div>
                </DeviceDetector>
            </div>
        </>
    );
};

export default ProductDetail;
