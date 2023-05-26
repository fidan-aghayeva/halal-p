import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import classNames from 'classnames';
import Autoplay from 'embla-carousel-autoplay';
import { Carousel } from '@mantine/carousel';
import EmployeeCard from './EmployeeCard/EmployeeCard';
import { ArrowLeftIcon, ArrowRightIcon } from 'assets/icons';
import { DEVICE_TYPES } from 'utils/device-detection';
import { EMPLOYEE_SLIDE_COUNT } from 'utils/constants';
import { getEmployees } from 'utils/service';
import { renderedSlides } from 'utils/helpers';

import styles from './EmployeesCarousel.module.scss';

const EmployeesCarousel = () => {
    const router = useRouter();
    const { locale } = router;

    const { currentDevice } = useSelector(state => state.global);

    const [employees, setEmployees] = useState([]);

    const autoplay = useRef(Autoplay({ delay: 5000 }));

    const getEmployeesData = async lang => {
        const data = await getEmployees(lang);

        setEmployees(data);
    };

    useEffect(() => {
        getEmployeesData(locale);
    }, [locale]);

    return (
        <div className={classNames('flex justify-center flex-column', styles.container)}>
            <Carousel
                withIndicators={currentDevice.type !== DEVICE_TYPES.desktop}
                align={'start'}
                nextControlIcon={<ArrowRightIcon />}
                previousControlIcon={<ArrowLeftIcon />}
                className={styles.carousel}
                withControls={false}
                plugins={[autoplay.current]}
            >
                {renderedSlides(employees, EMPLOYEE_SLIDE_COUNT[currentDevice.type]).map((employeeArray, index) => {
                    return (
                        <Carousel.Slide className={styles.slide} key={index}>
                            {employeeArray.map(employee => (
                                <div className={styles.slideItem} key={employee.id}>
                                    <EmployeeCard employee={employee} />
                                </div>
                            ))}
                        </Carousel.Slide>
                    );
                })}
            </Carousel>
        </div>
    );
};

export default EmployeesCarousel;
