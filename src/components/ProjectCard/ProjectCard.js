import Link from 'next/link';
import classNames from 'classnames';
import { ArrowRightLongIcon } from 'assets/icons';
import useTranslations from 'hooks/use-translations';

import styles from './ProjectCard.module.scss';

const ProjectCard = props => {
    const { className, project } = props;

    const T = useTranslations();

    return (
        <div className={classNames(className, styles.container)}>
            <span className={styles.createDate}>{project.createDate}</span>
            <img src={'/images/projects/project.png'} className={styles.image} />
            <span className={styles.content}>{project.text}</span>
            <Link href={'/'} className={styles.readMore}>
                {T.read_more} <ArrowRightLongIcon />
            </Link>
        </div>
    );
};

export default ProjectCard;
