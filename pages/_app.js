import { Provider } from 'react-redux';
import { enableES5 } from 'immer';
import App from 'next/app';
import GlobalContainer from 'components/GlobalContainer';
import Renderer from 'utils/Renderer';
import { detectSSRDevice } from 'utils/device-detection';
import { globalActions } from 'redux/slices/global';
import store from 'redux/store';
import withRedux from 'utils/with-redux';

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

MyApp.getInitialProps = withRedux(
    async context => {
        const { req } = context.ctx;

        const appProps = await App.getInitialProps(context);

        if (Renderer.isServerRender(req)) {

            const userAgent = req.headers['user-agent'];
            const currentDevice = detectSSRDevice(userAgent);


            store.dispatch(globalActions.setCurrentDevice(currentDevice));
        }

        appProps.pageProps = {
            ...appProps.pageProps,
            routerProps: { asPath: context.ctx.asPath },
        };

        return appProps;
    },
    { type: 'app' }
);

export default MyApp;
