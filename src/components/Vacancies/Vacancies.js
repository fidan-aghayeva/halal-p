import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Accordion } from '@mantine/core';
import dompurify from 'isomorphic-dompurify';
import PageLayout from 'components/layouts/PageLayout';
import { PlusIcon } from 'assets/icons';
import { getVacancies } from 'utils/service';
import useTranslations from 'hooks/use-translations';

import styles from './Vacancies.module.scss';

const Vacancies = () => {
    const { locale } = useRouter();
    const T = useTranslations();

    const [vacancies, setVacancies] = useState([]);

    const sanitizer = dompurify.sanitize;

    const getVacanciesData = async lang => {
        const items = await getVacancies(lang);

        setVacancies(items);
    };

    useEffect(() => {
        getVacanciesData(locale);
    }, [locale]);

    return (
        <PageLayout title={T.vacancies}>
            <Accordion defaultValue={vacancies[0]?.id} className={styles.container} multiple chevron={<PlusIcon />}>
                {vacancies.map(vacancy => (
                    <Accordion.Item value={vacancy.id.toString()} key={vacancy.id} className={styles.item}>
                        <Accordion.Control className={styles.itemTitle}>{vacancy.title}</Accordion.Control>
                        <Accordion.Panel className={styles.itemBody}>
                            <div dangerouslySetInnerHTML={{ __html: sanitizer(vacancy.description) }} />
                        </Accordion.Panel>
                    </Accordion.Item>
                ))}
            </Accordion>
        </PageLayout>
    );
};

export default Vacancies;
