import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

const DeviceDetector = props => {
    const { visible, hidden } = props;

    const currentDevice = useSelector(state => state.global.currentDevice);

    const shouldRender = () => {
        const { type: deviceType } = currentDevice;

        return visible.length ? visible.includes(deviceType) : !hidden.includes(deviceType);
    };

    return shouldRender() ? props.children : null;
};

DeviceDetector.defaultProps = {
    visible: [],
    hidden: [],
};

DeviceDetector.propTypes = {
    visible: PropTypes.array,
    hidden: PropTypes.array,
};

export default DeviceDetector;
