import AppLayout from 'components/layouts/AppLayout';
import Home from 'components/Home';

const HomePage = () => {
    return <Home />;
};

HomePage.getLayout = page => {
    return <AppLayout>{page}</AppLayout>;
};

export default HomePage;
