import { useSelector } from 'react-redux';
import Image from 'next/image';
import Link from 'next/link';
import classNames from 'classnames';
import { ArrowRightLongIcon } from 'assets/icons';
import { SERVICE_URL } from 'utils/constants';
import { getDate } from 'utils/helpers';
import useTranslations from 'hooks/use-translations';

import styles from './ProjectCard.module.scss';

const ProjectCard = props => {
    const { className, project } = props;

    const T = useTranslations();
    const { language } = useSelector(state => state.global);

    return (
        <div className={classNames(className, styles.container)}>
            <span className={styles.date}>{getDate(project.publishedDate, 'DD.MM.YYYY')}</span>
            <div className={styles.imageContainer}>
                <Image src={SERVICE_URL + project.mainImage} alt={project.title} fill />
            </div>
            <span className={styles.title}>{project.title}</span>
            <Link href={`/projects/${project.slug}-${project.id}`} className={styles.readMore} locale={language}>
                {T.read_more} <ArrowRightLongIcon />
            </Link>
        </div>
    );
};

export default ProjectCard;
