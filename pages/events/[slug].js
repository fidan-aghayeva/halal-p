import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import AppLayout from 'components/layouts/AppLayout';
import DetailPageLayout from 'components/layouts/DetailPageLayout';
import { getBlogsDataByTypeAndId } from 'utils/service';
import { PAGE_TYPES } from 'utils/constants';

const EventDetailPage = () => {
    const router = useRouter();

    const {
        locale,
        query: { slug },
    } = router;

    const id = slug.split('-').at(-1);

    const [event, setEvent] = useState(null);

    const getEventData = async ({ lang }) => {
        const data = await getBlogsDataByTypeAndId({ lang, type: PAGE_TYPES.events, id });

        setEvent(data);
    };

    useEffect(() => {
        getEventData({ lang: locale });
    }, [locale]);

    return event && <DetailPageLayout data={event} />;
};

EventDetailPage.getLayout = page => {
    return <AppLayout>{page}</AppLayout>;
};

export default EventDetailPage;
