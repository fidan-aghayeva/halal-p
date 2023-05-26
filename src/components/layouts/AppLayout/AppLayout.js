import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import classNames from 'classnames';
import Header from 'components/Header';
import Footer from 'components/Footer';
import MobileMenu from 'components/MobileMenu';
import { globalActions } from 'redux/slices/global';
import { getCategories, getContacts, getMainSiteData, getSections } from 'utils/service';
import useWindowSize from 'hooks/use-window-size';

import styles from './AppLayout.module.scss';

const AppLayout = props => {
    const { homePage = false } = props;

    const dispatch = useDispatch();

    const { mobileMenuVisibility } = useSelector(state => state.global);

    const { locale } = useRouter();
    const [windowWidth] = useWindowSize();

    const getSectionsData = async lang => {
        const data = await getSections(lang);

        dispatch(globalActions.setSectionsData(data));
    };

    const getCategoriesData = async lang => {
        const data = await getCategories(lang);

        dispatch(globalActions.setCategoriesData(data));
    };

    const getSiteData = async lang => {
        const data = await getMainSiteData(lang);

        dispatch(globalActions.setSiteData(data));
    };

    const getContactData = async lang => {
        const data = await getContacts(lang);

        const reFormattedData = data.reduce((res, cur) => ({ ...res, [cur.type]: cur.text }), {});

        dispatch(globalActions.setContactData(reFormattedData));
    };

    useEffect(() => {
        getSectionsData(locale);
        getSiteData(locale);
        getCategoriesData(locale);
        getContactData(locale);
    }, [locale]);

    useEffect(() => {
        if (windowWidth >= 1366 && mobileMenuVisibility) {
            dispatch(globalActions.changeMobileMenuVisibility(false));
        }
    }, [windowWidth]);

    return (
        <div className={styles.container}>
            <Header homePage={homePage} />
            <main className={classNames(styles.main, { homePage })}>
                <MobileMenu />
                <div className={styles.content}>{props.children}</div>
            </main>
            <Footer />
        </div>
    );
};

export default AppLayout;
