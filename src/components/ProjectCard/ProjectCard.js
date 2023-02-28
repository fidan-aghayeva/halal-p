import Link from 'next/link';
import { ArrowRightLongIcon } from 'assets/icons';

import styles from './ProjectCard.module.scss';

const ProjectCard = props => {
    const { project } = props;

    return (
        <div className={styles.container}>
            <span className={styles.createDate}>{project.createDate}</span>
            <img src={'/images/projects/project.png'} className={styles.image} />
            <span className={styles.content}>{project.text}</span>
            <Link href={'/'} className={styles.readMore}>
                Ətraflı oxumaq <ArrowRightLongIcon />
            </Link>
        </div>
    );
};

export default ProjectCard;
