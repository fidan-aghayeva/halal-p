import { Provider } from 'react-redux';
import { enableES5 } from 'immer';
import App from 'next/app';
import GlobalContainer from 'components/GlobalContainer';
import Renderer from 'utils/Renderer';
import { detectSSRDevice } from 'utils/device-detection';
import { globalActions } from 'redux/slices/global';
import store from 'redux/store';

enableES5();

import 'styles/index.scss';

function MyApp({ Component, pageProps }) {
    const getLayout = Component.getLayout || (page => page);

    return (
        <Provider store={store}>
            <GlobalContainer>{getLayout(<Component {...pageProps} />)}</GlobalContainer>
        </Provider>
    );
}

MyApp.getInitialProps = async context => {
    const { req } = context;

    if (Renderer.isServerRender(req)) {
        const userAgent = req.headers['user-agent'];
        const currentDevice = detectSSRDevice(userAgent);

        store.dispatch(globalActions.setCurrentDevice(currentDevice));
    }

    return { props: {} };
};

export default MyApp;
