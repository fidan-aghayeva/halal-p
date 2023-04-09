import Pagination from '@shared/Pagination';
import PageLayout from 'components/layouts/PageLayout';
import ProjectCard from 'components/ProjectCard';
import { projects } from 'utils/mock';
import useTranslations from 'hooks/use-translations';

import styles from './Projects.module.scss';

const Projects = () => {
    const T = useTranslations();

    return (
        <PageLayout
            title={T.projects}
            content={
                '“HALAL-P” MMC olaraq Azərbaycan bazarında 1996-cı ildən etibarən fəaliyyət göstəririk və dünyaca məşhur ticarət markalarının Azərbaycanda rəsmi təmsilçisiyik. Mətbəə, bank, korporativ və arxiv həlləri üzrə böyük təcrübə və biliklərə, eləcə də böyük və professional servis mərkəzinə sahibik.'
            }
        >
            <div className={styles.container}>
                {projects.map(project => (
                    <ProjectCard className={styles.projectCard} key={project.id} project={project} />
                ))}
            </div>
            <Pagination total={10} />
        </PageLayout>
    );
};

export default Projects;
