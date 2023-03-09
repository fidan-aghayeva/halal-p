import AppLayout from 'components/layouts/AppLayout';
import Contact from 'components/Contact';

const ContactPage = () => {
    return <Contact />;
};

ContactPage.getLayout = page => {
    return <AppLayout>{page}</AppLayout>;
};

export default ContactPage;
