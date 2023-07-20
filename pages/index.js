import AppLayout from 'components/layouts/AppLayout';
import Home from 'components/Home';
import { SERVICE_URL } from 'utils/constants';

const HomePage = props => {
    const { data } = props;

    return <Home data={data || {}} />;
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

HomePage.getLayout = page => {
    return <AppLayout homePage={true}>{page}</AppLayout>;
};

export default HomePage;
