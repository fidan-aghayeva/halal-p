import { useRouter } from 'next/router';
import AppLayout from 'components/layouts/AppLayout';
import DetailPageLayout from 'components/layouts/DetailPageLayout';
import { PAGE_TYPES, SERVICE_URL } from 'utils/constants';

const EventDetailPage = props => {
    const { event } = props;

    const router = useRouter();

    if (!event) {
        router.push('/404');
    }

    return event ? <DetailPageLayout data={event} /> : <div />;
};

export const getServerSideProps = async context => {
    const {
        params: { slug },
        locale,
    } = context;

    const id = slug.split('-').at(-1);

    const res = await fetch(`${SERVICE_URL}/${locale}/blogs/${PAGE_TYPES.events}/${id}`);
    const event = await res.json();

    if (event.Success === false) {
        return { props: { event: null } };
    }

    return { props: { event } };
};

EventDetailPage.getLayout = page => {
    return <AppLayout>{page}</AppLayout>;
};

export default EventDetailPage;
