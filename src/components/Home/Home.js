import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import classNames from 'classnames';
import Image from 'next/image';
import Autoplay from 'embla-carousel-autoplay';
import { Carousel } from '@mantine/carousel';
import Map from 'components/Map';
import ProductsCarousel from './ProductsCarousel';
import ProjectsCarousel from './ProjectsCarousel';
import { ArrowLeftIcon, ArrowRightIcon } from 'assets/icons';
import { DEVICE_TYPES } from 'utils/device-detection';
import { getHomeSliders } from 'utils/service';
import { SERVICE_URL } from 'utils/constants';
import useTranslations from 'hooks/use-translations';

import styles from './Home.module.scss';

const Home = () => {
    const T = useTranslations();
    const router = useRouter();
    const { locale } = router;

    const currentDevice = useSelector(state => state.global.currentDevice);

    const autoplay = useRef(Autoplay({ delay: 10000 }));

    const [sliderData, setSliderData] = useState([]);

    const getSliderData = async lang => {
        const data = await getHomeSliders(lang);

        setSliderData(data);
    };

    useEffect(() => {
        getSliderData(locale);
    }, [locale]);

    return (
        <div className={styles.container}>
            {sliderData.length ? (
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
                        {sliderData.map(slider => (
                            <Carousel.Slide key={slider.id}>
                                <Image src={SERVICE_URL + slider.imagePath} alt={'Slider'} fill />
                            </Carousel.Slide>
                        ))}
                    </Carousel>
                </div>
            ) : null}

            <div className={classNames('flex align-center justify-center flex-column', styles.products)}>
                <h2 className={'title'}>{T.products}</h2>
                <ProductsCarousel />
            </div>
            <div className={classNames('flex align-center justify-center flex-column', styles.projects)}>
                <h2 className={'title'}>{T.projects}</h2>
                <ProjectsCarousel />
            </div>
            <div className={classNames('flex align-center justify-center flex-column')}>
                <h2 className={'title'}>{T.contact}</h2>
                <Map />
            </div>
        </div>
    );
};

export default Home;
