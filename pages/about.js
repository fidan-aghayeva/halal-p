import About from 'components/About';
import AppLayout from 'components/layouts/AppLayout';
import { SERVICE_URL } from 'utils/constants';

const AboutPage = props => {
    const { data } = props;

    return <About data={data} />;
};

export const getServerSideProps = async context => {
    const { locale } = context;

    const res = await fetch(`${SERVICE_URL}/${locale}/companies`);
    const data = await res.json();

    if (data.Success === false) {
        return { props: { data: {} } };
    }

    return { props: { data } };
};

AboutPage.getLayout = page => {
    return <AppLayout>{page}</AppLayout>;
};

export default AboutPage;
