import { useSelector } from 'react-redux';
import { Carousel } from '@mantine/carousel';
import Image from 'next/image';
import { ArrowLeftIcon, ArrowRightIcon } from 'assets/icons';
import slider from 'assets/slider/slider1.png';
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
                        <Image src={slider} alt={'Slider'} fill />
                    </Carousel.Slide>
                    <Carousel.Slide>
                        <Image src={slider} alt={'Slider'} fill />
                    </Carousel.Slide>
                </Carousel>
            </div>
            <div style={{ height: '300px' }}></div>
            <div style={{ height: '300px' }}></div>
            <div style={{ height: '300px' }}></div>
            <div style={{ height: '300px' }}></div>
        </div>
    );
};

export default Home;
