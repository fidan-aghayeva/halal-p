import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import classNames from 'classnames';
import { Carousel } from '@mantine/carousel';
import Link from 'next/link';
import DeviceDetector from '@shared/DeviceDetector';
import ProjectCard from 'components/ProjectCard';
import { ArrowLeftIcon, ArrowRightIcon } from 'assets/icons';
import { DEVICE_TYPES } from 'utils/device-detection';
import { getHomeBlogsByType } from 'utils/service';
import { PAGE_TYPES } from 'utils/constants';
import useTranslations from 'hooks/use-translations';

import styles from './ProjectsCarousel.module.scss';

const ProjectsCarousel = () => {
    const T = useTranslations();
    const router = useRouter();
    const { locale } = router;

    const { currentDevice, language } = useSelector(state => state.global);

    const [projects, setProjects] = useState([]);

    const getProjectsData = async lang => {
        const data = await getHomeBlogsByType({ lang, type: PAGE_TYPES.projects });

        setProjects(data);
    };

    useEffect(() => {
        getProjectsData(locale);
    }, [locale]);

    return (
        projects.length > 0 && (
            <div className={classNames('flex align-center justify-center flex-column', styles.projects)}>
                <h2 className={'title'}>{T.projects}</h2>
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
                                ? projects
                                      .slice(0, 2)
                                      .map(project => <ProjectCard key={project.id} project={project} />)
                                : projects
                                      .slice(0, 3)
                                      .map(project => <ProjectCard key={project.id} project={project} />)}
                        </div>
                    </DeviceDetector>
                    <Link href={'/projects?page=1'} locale={language} className={styles.showAll}>
                        {T.show_all}
                    </Link>
                </div>
            </div>
        )
    );
};

export default ProjectsCarousel;
