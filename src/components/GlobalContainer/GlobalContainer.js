import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import useWindowSize from 'hooks/use-window-size';
import { globalActions } from 'redux/slices/global';
import { detectClientDevice } from 'utils/device-detection';

const GlobalContainer = props => {
    const dispatch = useDispatch();

    const [windowWidth] = useWindowSize();

    useEffect(() => {
        if (!windowWidth) return;

        const device = detectClientDevice(windowWidth);

        dispatch(globalActions.setCurrentDevice(device));
    }, [windowWidth]);

    return props.children;
};

export default GlobalContainer;
