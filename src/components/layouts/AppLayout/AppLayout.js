import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from 'components/Header';
import Footer from 'components/Footer';
import MobileMenu from 'components/MobileMenu';
import { globalActions } from 'redux/slices/global';
import useWindowSize from 'hooks/use-window-size';

import styles from './AppLayout.module.scss';

const AppLayout = props => {
    const { mainClassName, homePage } = props;

    const dispatch = useDispatch();

    const { mobileMenuVisibility } = useSelector(state => state.global);

    const [windowWidth] = useWindowSize();

    useEffect(() => {
        if (windowWidth >= 1366 && mobileMenuVisibility) {
            dispatch(globalActions.changeMobileMenuVisibility(false));
        }
    }, [windowWidth]);

    return (
        <div className={styles.container}>
            <Header homePage={homePage} />
            <main className={styles.main}>
                <MobileMenu />
                <div className={styles.content}>{props.children}</div>
            </main>
            <Footer />
        </div>
    );
};

export default AppLayout;
