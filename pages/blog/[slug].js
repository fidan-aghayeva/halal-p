import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import AppLayout from 'components/layouts/AppLayout';
import DetailPageLayout from 'components/layouts/DetailPageLayout';
import { getBlogsDataByTypeAndId } from 'utils/service';
import { PAGE_TYPES } from 'utils/constants';

const BlogDetailPage = () => {
    const router = useRouter();

    const {
        locale,
        query: { slug },
    } = router;

    const id = slug.split('-').at(-1);

    const [blog, setBlog] = useState(null);

    const getBlogData = async ({ lang }) => {
        const data = await getBlogsDataByTypeAndId({ lang, type: PAGE_TYPES.blog, id });

        setBlog(data);
    };

    useEffect(() => {
        getBlogData({ lang: locale });
    }, [locale]);

    return blog && <DetailPageLayout data={blog} />;
};

BlogDetailPage.getLayout = page => {
    return <AppLayout>{page}</AppLayout>;
};

export default BlogDetailPage;
