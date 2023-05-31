import { useRouter } from 'next/router';
import AppLayout from 'components/layouts/AppLayout';
import DetailPageLayout from 'components/layouts/DetailPageLayout';
import { PAGE_TYPES, SERVICE_URL } from 'utils/constants';

const BlogDetailPage = props => {
    const { blog } = props;

    const router = useRouter();

    if (!blog) {
        router.push('/404');
    }

    return blog ? <DetailPageLayout data={blog} /> : <div />;
};

export const getServerSideProps = async context => {
    const {
        params: { slug },
        locale,
    } = context;

    const id = slug.split('-').at(-1);

    const res = await fetch(`${SERVICE_URL}/${locale}/blogs/${PAGE_TYPES.blog}/${id}`);
    const blog = await res.json();

    if (blog.Success === false) {
        return { props: { blog: null } };
    }

    return { props: { blog } };
};

BlogDetailPage.getLayout = page => {
    return <AppLayout>{page}</AppLayout>;
};

export default BlogDetailPage;
