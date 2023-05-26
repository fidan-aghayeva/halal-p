import classNames from 'classnames';
import PageLayout from 'components/layouts/PageLayout';
import CustomersCarousel from './CustomersCarousel/CustomersCarousel';
import EmployeesCarousel from './EmployeesCarousel/EmployeesCarousel';
import OurAdvantages from './OurAdvantages';
import { CUSTOMER_TYPES } from 'utils/constants';
import useTranslations from 'hooks/use-translations';

import styles from './About.module.scss';

const About = () => {
    const T = useTranslations();

    return (
        <PageLayout
            title={T.about_company}
            content={
                '“HALAL-P” MMC olaraq Azərbaycan bazarında 1996-cı ildən etibarən fəaliyyət göstəririk və dünyaca məşhur ticarət markalarının Azərbaycanda rəsmi təmsilçisiyik. Mətbəə, bank, korporativ və arxiv həlləri üzrə böyük təcrübə və biliklərə, eləcə də böyük və professional servis mərkəzinə sahibik.'
            }
        >
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
    );
};

export default About;
