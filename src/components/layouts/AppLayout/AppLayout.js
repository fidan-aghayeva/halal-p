import Footer from 'components/Footer';

import styles from './AppLayout.module.scss';

const AppLayout = props => {
    const { mainClassName } = props;

    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <div className={styles.content}>{props.children}</div>
            </main>
            <Footer />
        </div>
    );
};

export default AppLayout;
