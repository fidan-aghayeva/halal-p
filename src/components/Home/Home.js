import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import classNames from 'classnames';
import Image from 'next/image';
import Head from 'next/head';
import Autoplay from 'embla-carousel-autoplay';
import { Carousel } from '@mantine/carousel';
import Map from 'components/Map';
import BlogCarousel from './BlogCarousel';
import ProductsCarousel from './ProductsCarousel';
import ProjectsCarousel from './ProjectsCarousel';
import { ArrowLeftIcon, ArrowRightIcon } from 'assets/icons';
import { DEVICE_TYPES } from 'utils/device-detection';
import { getHomeSliders } from 'utils/service';
import { SERVICE_URL } from 'utils/constants';
import useTranslations from 'hooks/use-translations';

import styles from './Home.module.scss';

const Home = props => {
    const { data = {} } = props;

    const { seo = {} } = data;

    const T = useTranslations();
    const router = useRouter();
    const { locale } = router;

    const currentDevice = useSelector(state => state.global.currentDevice);

    const autoplay = useRef(Autoplay({ delay: 5000 }));

    const [sliderData, setSliderData] = useState([]);

    const getSliderData = async lang => {
        const data = await getHomeSliders(lang);

        setSliderData(data);
    };

    useEffect(() => {
        getSliderData(locale);
    }, [locale]);

    return (
        <>
            <Head>
                <title>{seo.title}</title>
                <meta name='description' content={seo.description} />
                <meta name='keywords' content={seo.keyword} />
            </Head>
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
                        {sliderData.length
                            ? sliderData.map(slider => (
                                  <Carousel.Slide key={slider.id}>
                                      <a
                                          href={slider.redirectUrl}
                                          target={'blank'}
                                          className={styles.slider}
                                          aria-label={'Product shopping link'}
                                      >
                                          <Image
                                              src={SERVICE_URL + slider.imagePath}
                                              alt={'Slider'}
                                              fill
                                              sizes='100%'
                                              placeholder={'blur'}
                                              blurDataURL={'/images/slider/slider1.png'}
                                          />
                                      </a>
                                  </Carousel.Slide>
                              ))
                            : null}
                    </Carousel>
                </div>
                <ProductsCarousel />
                <ProjectsCarousel />
                <BlogCarousel />
                <div className={classNames('flex align-center justify-center flex-column')}>
                    <h2 className={'title'}>{T.contact}</h2>
                    <Map />
                </div>
            </div>
        </>
    );
};

export default Home;
