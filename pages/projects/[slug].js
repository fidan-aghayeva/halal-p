import AppLayout from 'components/layouts/AppLayout';
import DetailPageLayout from 'components/layouts/DetailPageLayout';
import { PAGE_TYPES, SERVICE_URL } from 'utils/constants';

const ProjectDetailPage = props => {
    const { project } = props;

    return project ? <DetailPageLayout data={project} /> : <div />;
};

export const getServerSideProps = async context => {
    const {
        params: { slug },
        locale,
    } = context;

    const id = slug.split('-').at(-1);

    const res = await fetch(`${SERVICE_URL}/${locale}/blogs/${PAGE_TYPES.projects}/${id}`);
    const project = await res.json();

    if (project.Success === false) {
        return { props: { project: {} } };
    }

    return { props: { project } };
};

ProjectDetailPage.getLayout = page => {
    return <AppLayout>{page}</AppLayout>;
};

export default ProjectDetailPage;
