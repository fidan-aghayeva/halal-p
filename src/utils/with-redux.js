import Renderer from 'utils/Renderer';
import store from 'redux/store';
import { resetRedux } from 'redux/actions';

const getReqObject = context => context.ctx?.req || context.req;

const setPreloadedReduxState = (isInitialProps, props) => {
    const reduxState = store.getState();

    // Blacklisted slices
    const { global, ...preloadedReduxState } = reduxState;

    if (isInitialProps) {
        props.pageProps.preloadedReduxState = preloadedReduxState;
    } else {
        props.props.preloadedReduxState = preloadedReduxState;
    }
};

const withRedux = (getProps, { type = 'page' } = {}) => {
    return async (context, ...args) => {
        const req = getReqObject(context);

        if (type === 'app' && Renderer.isServerRender(req)) {
            store.dispatch(resetRedux());
        }

        const props = await getProps(context, ...args);

        const isInitialProps = props.pageProps !== undefined;

        if (Renderer.isServerRender(req)) {
            setPreloadedReduxState(isInitialProps, props);
        }

        return props;
    };
};

export default withRedux;
