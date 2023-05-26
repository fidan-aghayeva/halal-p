import Projects from 'components/Projects';
import AppLayout from 'components/layouts/AppLayout';

const ProjectsPage = () => {
    return <Projects />;
};

ProjectsPage.getLayout = page => {
    return <AppLayout>{page}</AppLayout>;
};

export default ProjectsPage;
