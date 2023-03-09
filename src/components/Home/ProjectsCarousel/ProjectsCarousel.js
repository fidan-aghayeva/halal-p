import { useSelector } from 'react-redux';
import classNames from 'classnames';
import { Carousel } from '@mantine/carousel';
import Link from 'next/link';
import DeviceDetector from '@shared/DeviceDetector';
import ProjectCard from 'Components/ProjectCard';
import { ArrowLeftIcon, ArrowRightIcon } from 'assets/icons';
import { DEVICE_TYPES } from 'utils/device-detection';
import { projects } from './data';

import styles from './ProjectsCarousel.module.scss';

const ProjectsCarousel = () => {
    const currentDevice = useSelector(state => state.global.currentDevice);

    return (
        <div className={classNames('flex justify-center flex-column', styles.container)}>
            <DeviceDetector visible={[DEVICE_TYPES.desktop]}>
                <Carousel
                    withIndicators={currentDevice.type === DEVICE_TYPES.tablet}
                    align={'start'}
                    slideGap={'20px'}
                    slideSize={'25%'}
                    nextControlIcon={<ArrowRightIcon />}
                    previousControlIcon={<ArrowLeftIcon />}
                    className={styles.carousel}
                >
                    {projects.map(project => (
                        <Carousel.Slide className={styles.slide} key={project.id}>
                            <ProjectCard project={project} />
                        </Carousel.Slide>
                    ))}
                </Carousel>
            </DeviceDetector>
            <DeviceDetector hidden={[DEVICE_TYPES.desktop]}>
                <div className={styles.projectCardsContainer}>
                    {currentDevice.type === DEVICE_TYPES.mobile
                        ? projects.slice(0, 2).map(project => <ProjectCard key={project.id} project={project} />)
                        : projects.slice(0, 3).map(project => <ProjectCard key={project.id} project={project} />)}
                </div>
            </DeviceDetector>
            <Link href={'/'} className={styles.showMore}>
                Hamısını göstərmək
            </Link>
        </div>
    );
};

export default ProjectsCarousel;
