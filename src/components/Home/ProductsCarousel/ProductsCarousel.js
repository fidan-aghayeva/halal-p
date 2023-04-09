import { useSelector } from 'react-redux';
import Link from 'next/link';
import classNames from 'classnames';
import { Carousel } from '@mantine/carousel';
import DeviceDetector from '@shared/DeviceDetector';
import { DEVICE_TYPES } from 'utils/device-detection';
import { products } from 'utils/mock';

import styles from './ProductsCarousel.module.scss';

const ProductsCarousel = () => {
    const currentDevice = useSelector(state => state.global.currentDevice);

    return (
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
                    {products.map(product => (
                        <Carousel.Slide key={product.id} className={styles.slide}>
                            <Link
                                href={'/'}
                                className={classNames(
                                    'flex align-center justify-center flex-column',
                                    styles.productCard
                                )}
                            >
                                {product.image}
                                <span className={styles.productName}>{product.title}</span>
                            </Link>
                        </Carousel.Slide>
                    ))}
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
    );
};

export default ProductsCarousel;
