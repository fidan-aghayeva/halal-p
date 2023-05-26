import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import AppLayout from 'components/layouts/AppLayout';
import DetailPageLayout from 'components/layouts/DetailPageLayout';
import { getBlogsDataByTypeAndId } from 'utils/service';
import { PAGE_TYPES } from 'utils/constants';

const ProjectDetailPage = () => {
    const router = useRouter();

    const {
        locale,
        query: { slug },
    } = router;

    const id = slug.split('-').at(-1);

    const [project, setProject] = useState(null);

    const getProjectData = async ({ lang }) => {
        const data = await getBlogsDataByTypeAndId({ lang, type: PAGE_TYPES.projects, id });

        setProject(data);
    };

    useEffect(() => {
        getProjectData({ lang: locale });
    }, [locale]);

    return project ? <DetailPageLayout data={project} /> : <div />;
};

ProjectDetailPage.getLayout = page => {
    return <AppLayout>{page}</AppLayout>;
};

export default ProjectDetailPage;
