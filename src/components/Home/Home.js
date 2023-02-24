import { useRef } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import Image from 'next/image';
import Autoplay from 'embla-carousel-autoplay';
import { Carousel } from '@mantine/carousel';
import ProductsCarousel from './ProductsCarousel';
import { ArrowLeftIcon, ArrowRightIcon } from 'assets/icons';
import { DEVICE_TYPES } from 'utils/device-detection';

import styles from './Home.module.scss';
import ProjectsCarousel from './ProjectsCarousel';

const Home = () => {
    const currentDevice = useSelector(state => state.global.currentDevice);

    const autoplay = useRef(Autoplay({ delay: 10000 }));

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
                    plugins={[autoplay.current]}
                >
                    <Carousel.Slide>
                        <Image src={'/images/slider/slider1.png'} alt={'Slider'} fill />
                    </Carousel.Slide>
                    <Carousel.Slide>
                        <Image src={'/images/slider/slider1.png'} alt={'Slider'} fill />
                    </Carousel.Slide>
                </Carousel>
            </div>
            <div className={classNames('flex align-center justify-center flex-column', styles.products)}>
                <h2 className={'title'}>Məhsullar</h2>
                <ProductsCarousel />
            </div>
            <div className={classNames('flex align-center justify-center flex-column', styles.projects)}>
                <h2 className={'title'}>Layihələrimiz</h2>
                <ProjectsCarousel />
            </div>
        </div>
    );
};

export default Home;
