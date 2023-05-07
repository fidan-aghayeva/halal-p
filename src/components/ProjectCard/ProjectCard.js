import Image from 'next/image';
import Link from 'next/link';
import classNames from 'classnames';
import moment from 'moment';
import { ArrowRightLongIcon } from 'assets/icons';
import { SERVICE_URL } from 'utils/constants';
import useTranslations from 'hooks/use-translations';

import styles from './ProjectCard.module.scss';

const ProjectCard = props => {
    const { className, project } = props;

    const T = useTranslations();

    const getDate = date => {
        return moment(date).format('DD.MM.YYYY');
    };

    return (
        <div className={classNames(className, styles.container)}>
            <span className={styles.createDate}>{getDate(project.publishedDate)}</span>
            <div className={styles.imageContainer}>
                <Image src={SERVICE_URL + project.mainImage} alt={project.title} fill />
            </div>
            <span className={styles.title}>{project.title}</span>
            <Link href={'/'} className={styles.readMore}>
                {T.read_more} <ArrowRightLongIcon />
            </Link>
        </div>
    );
};

export default ProjectCard;
