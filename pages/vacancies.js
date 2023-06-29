import Vacancies from 'components/Vacancies';
import AppLayout from 'components/layouts/AppLayout';

const VacanciesPage = () => {
    return <Vacancies />;
};

VacanciesPage.getLayout = page => {
    return <AppLayout>{page}</AppLayout>;
};

export default VacanciesPage;
