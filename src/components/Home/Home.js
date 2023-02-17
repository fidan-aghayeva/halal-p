import { useSelector } from 'react-redux';
import classNames from 'classnames';
import Image from 'next/image';
import { Carousel } from '@mantine/carousel';
import ProductsCarousel from './ProductsCarousel';
import { ArrowLeftIcon, ArrowRightIcon } from 'assets/icons';
import { DEVICE_TYPES } from 'utils/device-detection';

import styles from './Home.module.scss';

const Home = () => {
    const currentDevice = useSelector(state => state.global.currentDevice);

    return (
        <div className={styles.container}>
            <div className={styles.carouselContainer}>
                <Carousel
                    className={styles.carousel}
                    height='100%'
                    controlsOffset='xl'
                    nextControlIcon={<ArrowRightIcon />}
                    previousControlIcon={<ArrowLeftIcon />}
                    withIndicators={currentDevice.type !== DEVICE_TYPES.desktop}
                    withControls={currentDevice.type !== DEVICE_TYPES.mobile}
                >
                    <Carousel.Slide>
                        <Image src={'/images/slider/slider1.png'} alt={'Slider'} fill />
                    </Carousel.Slide>
                    <Carousel.Slide>
                        <Image src={'/images/slider/slider1.png'} alt={'Slider'} fill />
                    </Carousel.Slide>
                </Carousel>
            </div>
            <div className={classNames('flex align-center justify-center flex-column', styles.productsContainer)}>
                <h2 className={'title'}>Məhsullar</h2>
                <ProductsCarousel />
            </div>
        </div>
    );
};

export default Home;
