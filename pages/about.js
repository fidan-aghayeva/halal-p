import About from 'components/About';
import AppLayout from 'components/layouts/AppLayout';

const AboutPage = () => {
    return <About />;
};

AboutPage.getLayout = page => {
    return <AppLayout>{page}</AppLayout>;
};

export default AboutPage;
