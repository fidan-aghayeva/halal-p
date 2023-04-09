import { useSelector } from 'react-redux';
import classNames from 'classnames';
import { Carousel } from '@mantine/carousel';
import Link from 'next/link';
import DeviceDetector from '@shared/DeviceDetector';
import ProjectCard from 'components/ProjectCard';
import { ArrowLeftIcon, ArrowRightIcon } from 'assets/icons';
import { DEVICE_TYPES } from 'utils/device-detection';
import { projects } from 'utils/mock';
import useTranslations from 'hooks/use-translations';

import styles from './ProjectsCarousel.module.scss';

const ProjectsCarousel = () => {
    const T = useTranslations();

    const { currentDevice, language } = useSelector(state => state.global);

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
            <Link href={'/projects'} locale={language} className={styles.showAll}>
                {T.show_all}
            </Link>
        </div>
    );
};

export default ProjectsCarousel;
