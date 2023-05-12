import { Provider } from 'react-redux';
import { enableES5 } from 'immer';
import App from 'next/app';
import GlobalContainer from 'components/GlobalContainer';
import Renderer from 'utils/Renderer';
import { detectSSRDevice } from 'utils/device-detection';
import { COOKIE_KEYS } from 'utils/cookie';
import { DEFAULT_LANGUAGE, LANGUAGES } from 'utils/constants';
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
        const { req, res } = context.ctx;

        const appProps = await App.getInitialProps(context);

        if (Renderer.isServerRender(req)) {
            const { cookies } = req;

            const userAgent = req.headers['user-agent'];
            const currentDevice = detectSSRDevice(userAgent);

            if (!cookies.language || !Object.keys(LANGUAGES).some(lang => lang === cookies.language)) {
                store.dispatch(globalActions.changeLanguage(DEFAULT_LANGUAGE));

                res.setHeader('Set-Cookie', `${COOKIE_KEYS.language}=${DEFAULT_LANGUAGE};path=/;`);
            } else {
                store.dispatch(globalActions.changeLanguage(cookies.language));
            }

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
