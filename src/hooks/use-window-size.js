import { useState, useEffect } from 'react';

const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState({
        width: null,
        height: null,
    });

    useEffect(() => {
        const onResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };
        window.addEventListener('resize', onResize);

        onResize();

        return () => window.removeEventListener('resize', onResize);
    }, []);

    return [windowSize.width, windowSize.height];
};

export default useWindowSize;
