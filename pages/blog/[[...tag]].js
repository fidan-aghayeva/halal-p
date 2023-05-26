import AppLayout from 'components/layouts/AppLayout';
import Blogs from 'components/Blogs';

const BlogsPage = () => {
    return <Blogs />;
};

BlogsPage.getLayout = page => {
    return <AppLayout>{page}</AppLayout>;
};

export default BlogsPage;
