import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import Link from 'next/link';
import classNames from 'classnames';
import { Carousel } from '@mantine/carousel';
import DeviceDetector from '@shared/DeviceDetector';
import { DEVICE_TYPES } from 'utils/device-detection';
import { getSections } from 'utils/service';
import { SERVICE_URL } from 'utils/constants';

import styles from './ProductsCarousel.module.scss';

const ProductsCarousel = () => {
    const currentDevice = useSelector(state => state.global.currentDevice);
    const router = useRouter();
    const { locale } = router;

    const [products, setProducts] = useState([]);

    const getSectionsData = async lang => {
        const data = await getSections(lang);

        setProducts(data);
    };

    useEffect(() => {
        getSectionsData(locale);
    }, [locale]);

    return products.length ? (
        <div className={classNames('flex justify-center', styles.container)}>
            <DeviceDetector hidden={[DEVICE_TYPES.mobile]}>
                <Carousel
                    withIndicators={currentDevice.type === DEVICE_TYPES.tablet}
                    withControls={false}
                    slideSize={'25%'}
                    align={'start'}
                    slideGap={'20px'}
                    className={styles.carousel}
                >
                    {products.map(product => {
                        const imageUrl = SERVICE_URL + product.image;

                        return (
                            <Carousel.Slide key={product.id} className={styles.slide}>
                                <Link
                                    href={'/'}
                                    className={classNames(
                                        'flex align-center justify-center flex-column',
                                        styles.productCard
                                    )}
                                >
                                    <div className={styles.productImage}>
                                        <Image src={imageUrl} alt={product.name} fill />
                                    </div>
                                    <span className={styles.productName}>{product.name}</span>
                                </Link>
                            </Carousel.Slide>
                        );
                    })}
                </Carousel>
            </DeviceDetector>
            <DeviceDetector visible={[DEVICE_TYPES.mobile]}>
                {products.map(product => (
                    <Link
                        key={product.id}
                        href={'/'}
                        className={classNames('flex align-center justify-center flex-column', styles.productCard)}
                    >
                        {product.image}
                        <span className={styles.productName}>{product.title}</span>
                    </Link>
                ))}
            </DeviceDetector>
        </div>
    ) : null;
};

export default ProductsCarousel;
