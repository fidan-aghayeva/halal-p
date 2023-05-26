import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import classNames from 'classnames';
import { SERVICE_URL } from 'utils/constants';
import { getOurAdvantages } from 'utils/service';

import styles from './OurAdvantages.module.scss';

const OurAdvantages = () => {
    const { locale } = useRouter();

    const [ourAdvantages, setOurAdvantages] = useState([]);

    const getOurAdvantagesData = async lang => {
        const data = await getOurAdvantages(lang);

        setOurAdvantages(data);
    };

    useEffect(() => {
        getOurAdvantagesData(locale);
    }, [locale]);

    return (
        <div className={classNames('flex align-center justify-center flex-column', styles.container)}>
            {ourAdvantages.map(advantage => (
                <div
                    key={advantage.id}
                    className={classNames('flex align-center justify-center flex-column', styles.advantageItem)}
                >
                    <div className={classNames('flex align-center justify-center', styles.imageContainer)}>
                        <img src={SERVICE_URL + advantage.iconPath} alt={advantage.text} />
                    </div>
                    <span>{advantage.text}</span>
                </div>
            ))}
        </div>
    );
};

export default OurAdvantages;
