import PageLayout from 'components/layouts/PageLayout';
import useTranslations from 'hooks/use-translations';

const About = () => {
    const T = useTranslations();

    return (
        <PageLayout
            title={T.about_company}
            content={
                '“HALAL-P” MMC olaraq Azərbaycan bazarında 1996-cı ildən etibarən fəaliyyət göstəririk və dünyaca məşhur ticarət markalarının Azərbaycanda rəsmi təmsilçisiyik. Mətbəə, bank, korporativ və arxiv həlləri üzrə böyük təcrübə və biliklərə, eləcə də böyük və professional servis mərkəzinə sahibik.'
            }
        >
            about
        </PageLayout>
    );
};

export default About;
