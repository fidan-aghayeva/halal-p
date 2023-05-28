import Head from 'next/head';
import classNames from 'classnames';
import PageLayout from 'components/layouts/PageLayout';
import CustomersCarousel from './CustomersCarousel/CustomersCarousel';
import EmployeesCarousel from './EmployeesCarousel/EmployeesCarousel';
import OurAdvantages from './OurAdvantages';
import { CUSTOMER_TYPES } from 'utils/constants';
import useTranslations from 'hooks/use-translations';

import styles from './About.module.scss';

const About = props => {
    const { data = {} } = props;
    const { seo = {} } = data;

    const T = useTranslations();

    return (
        <>
            <Head>
                <title>{seo.title}</title>
                <meta name='description' content={seo.description} />
                <meta name='keywords' content={seo.keyword} />
            </Head>
            <PageLayout title={T.about_company}>
                <div className={classNames('flex align-center justify-center flex-column', styles.container)}>
                    <h2 className={'title'}>{T.our_advantages}</h2>
                    <OurAdvantages />
                </div>
                <div className={classNames('flex align-center justify-center flex-column', styles.container)}>
                    <h2 className={'title'}>{T.they_chose_us}</h2>
                    <CustomersCarousel type={CUSTOMER_TYPES.chooseUs} />
                </div>
                <div className={classNames('flex align-center justify-center flex-column', styles.container)}>
                    <h2 className={'title'}>{T.management}</h2>
                    <EmployeesCarousel />
                </div>
                <div className={classNames('flex align-center justify-center flex-column', styles.container)}>
                    <h2 className={'title'}>{T.our_partners}</h2>
                    <CustomersCarousel type={CUSTOMER_TYPES.partner} />
                </div>
            </PageLayout>
        </>
    );
};

export default About;
