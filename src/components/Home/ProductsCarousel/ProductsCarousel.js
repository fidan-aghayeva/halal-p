import { useSelector } from 'react-redux';
import { ReactSVG } from 'react-svg';
import Image from 'next/image';
import Link from 'next/link';
import classNames from 'classnames';
import { Carousel } from '@mantine/carousel';
import DeviceDetector from '@shared/DeviceDetector';
import { DEVICE_TYPES } from 'utils/device-detection';
import { SERVICE_URL } from 'utils/constants';

import styles from './ProductsCarousel.module.scss';

const ProductsCarousel = () => {
    const { currentDevice, sections: products } = useSelector(state => state.global);

    return products.length ? (
        <div className={classNames('flex justify-center', styles.container)}>
            <DeviceDetector hidden={[DEVICE_TYPES.mobile]}>
                <Carousel
                    withIndicators={currentDevice.type === DEVICE_TYPES.tablet}
                    withControls={false}
                    slideSize={'25%'}
                    align={'start'}
                    className={styles.carousel}
                >
                    {products.map(product => {
                        const imageUrl = SERVICE_URL + product.image;

                        return (
                            <Carousel.Slide key={product.id} className={styles.slide}>
                                <Link
                                    href={`/products/${product.slug}/${product.id}?page=1`}
                                    className={classNames(
                                        'flex align-center justify-center flex-column',
                                        styles.productCard
                                    )}
                                >
                                    <div className={styles.productImage}>
                                        <ReactSVG src={imageUrl} />
                                        {/*<Image src={imageUrl} alt={product.name} fill />*/}
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
                        href={`/products/${product.slug}/${product.id}?page=1`}
                        className={classNames('flex align-center justify-center flex-column', styles.productCard)}
                    >
                        <div className={styles.productImage}>
                            <ReactSVG src={SERVICE_URL + product.image} />
                        </div>
                        <span className={styles.productName}>{product.name}</span>
                    </Link>
                ))}
            </DeviceDetector>
        </div>
    ) : null;
};

export default ProductsCarousel;
