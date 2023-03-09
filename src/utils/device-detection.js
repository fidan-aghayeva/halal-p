import parser from 'ua-parser-js';
import { BREAKPOINTS } from './constants';

export const DEVICE_TYPES = {
    mobile: 'mobile',
    tablet: 'tablet',
    desktop: 'desktop',
};

const BREAKPOINT_DEVICES = {
    xs: DEVICE_TYPES.mobile,
    sm: DEVICE_TYPES.tablet,
    md: DEVICE_TYPES.tablet,
    lg: DEVICE_TYPES.desktop,
    xl: DEVICE_TYPES.desktop,
    xxl: DEVICE_TYPES.desktop,
};

export const detectSSRDevice = userAgent => {
    const { device } = parser(userAgent);
    const { type = DEVICE_TYPES.desktop } = device;

    return { type };
};

export const detectClientDevice = windowWidth => {
    const [breakpointName] = Object.entries(BREAKPOINTS)
        .filter(([, breakpoint]) => windowWidth >= breakpoint)
        .pop();

    return { type: BREAKPOINT_DEVICES[breakpointName], breakpoint: breakpointName };
};
