import Service from 'components/Service';
import AppLayout from 'components/layouts/AppLayout';

const ServicePage = () => {
    return <Service />;
};

ServicePage.getLayout = page => {
    return <AppLayout>{page}</AppLayout>;
};

export default ServicePage;
