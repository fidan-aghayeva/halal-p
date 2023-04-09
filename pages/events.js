import Events from 'components/Events';
import AppLayout from 'components/layouts/AppLayout';

const EventsPage = () => {
    return <Events />;
};

EventsPage.getLayout = page => {
    return <AppLayout>{page}</AppLayout>;
};

export default EventsPage;
