import { useSelector } from 'react-redux';
import classNames from 'classnames';
import { Carousel } from '@mantine/carousel';
import Link from 'next/link';
import { DEVICE_TYPES } from 'utils/device-detection';
import { products } from './data';

import styles from './ProductsCarousel.module.scss';

const ProductsCarousel = () => {
    const currentDevice = useSelector(state => state.global.currentDevice);

    return (
        <div className={classNames('flex justify-center', styles.container)}>
            <Carousel
                withIndicators={currentDevice.type === DEVICE_TYPES.tablet}
                withControls={false}
                slideSize={'25%'}
                align={'start'}
                slideGap={'20px'}
                orientation={currentDevice.type === DEVICE_TYPES.mobile ? 'vertical' : 'horizontal'}
                className={styles.carousel}
            >
                {products.map(product => (
                    <Carousel.Slide className={styles.slide}>
                        <Link
                            key={product.id}
                            href={'/'}
                            className={classNames('flex align-center justify-center flex-column', styles.productCard)}
                        >
                            {product.image}
                            <span className={styles.productName}>{product.title}</span>
                        </Link>
                    </Carousel.Slide>
                ))}
            </Carousel>
        </div>
    );
};

export default ProductsCarousel;
