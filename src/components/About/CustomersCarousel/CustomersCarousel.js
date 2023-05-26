import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import Image from 'next/image';
import Autoplay from 'embla-carousel-autoplay';
import { Carousel } from '@mantine/carousel';
import { Loader } from '@mantine/core';
import { CUSTOMER_SLIDE_COUNT, SERVICE_URL } from 'utils/constants';
import { getCustomers } from 'utils/service';
import { renderedSlides } from 'utils/helpers';

import styles from './CustomersCarousel.module.scss';

const CustomersCarousel = props => {
    const { type } = props;

    const { currentDevice } = useSelector(state => state.global);

    const [customers, setCustomers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const autoplay = useRef(Autoplay({ delay: 5000 }));

    const getCustomersData = async type => {
        setIsLoading(true);
        const data = await getCustomers(type);

        setCustomers(data);
        setIsLoading(false);
    };

    useEffect(() => {
        getCustomersData(type);
    }, [type]);

    return (
        <div className={classNames('flex justify-center flex-column align-center', styles.container)}>
            {isLoading ? (
                <Loader variant={'bars'} color={'#1ca29b'} />
            ) : (
                <Carousel align={'start'} className={styles.carousel} withControls={false} plugins={[autoplay.current]}>
                    {renderedSlides(customers, CUSTOMER_SLIDE_COUNT[currentDevice.type]).map((customerArray, index) => {
                        return (
                            <Carousel.Slide className={styles.slide} key={index}>
                                {customerArray.map(customer => (
                                    <div className={styles.slideItem} key={customer.id}>
                                        <div className={styles.customer}>
                                            <Image src={SERVICE_URL + customer.imagePath} alt={type} fill />
                                        </div>
                                    </div>
                                ))}
                            </Carousel.Slide>
                        );
                    })}
                </Carousel>
            )}
        </div>
    );
};

export default CustomersCarousel;
