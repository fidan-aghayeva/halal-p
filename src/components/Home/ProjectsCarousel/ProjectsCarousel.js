import { useSelector } from 'react-redux';
import classNames from 'classnames';
import { Carousel } from '@mantine/carousel';
import Link from 'next/link';
import { DEVICE_TYPES } from 'utils/device-detection';
import { projects } from './data';

import styles from './ProjectsCarousel.module.scss';

const ProjectsCarousel = () => {
    const currentDevice = useSelector(state => state.global.currentDevice);

    return (
        <div className={'flex justify-center'}>
            <Carousel
                withIndicators={currentDevice.type === DEVICE_TYPES.tablet}
                withControls={false}
                slideSize={'25%'}
                align={'start'}
                slideGap={'20px'}
                slidesToScroll={currentDevice.type === DEVICE_TYPES.tablet ? 3 : projects.length}
                breakpoints={[
                    { minWidth: 'sm', maxWidth: 'xl', slideSize: '33.333333%' },
                    { maxWidth: 'sm', slideSize: '25%' },
                ]}
                orientation={currentDevice.type === DEVICE_TYPES.mobile ? 'vertical' : 'horizontal'}
            >
                {projects.map(project => (
                    <Carousel.Slide>
                        <div
                            key={project.id}
                            className={classNames('flex align-center justify-center flex-column', styles.card)}
                        >
                            <span className={styles.createDate}>{project.createDate}</span>
                            <img src={'/images/projects/project.png'} className={styles.image} />
                            <span className={styles.content}>{project.text}</span>
                            <Link href={'/'}>Ətraflı oxumaq</Link>
                        </div>
                    </Carousel.Slide>
                ))}
            </Carousel>
        </div>
    );
};

export default ProjectsCarousel;
