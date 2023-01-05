class Renderer {
    static onClientSide = () => typeof window === 'object';

    static onServerSide = () => typeof window === 'undefined';

    static isClientRender = req => !req || (req.url && req.url.startsWith('/_next/data'));

    static isServerRender = req => req && req.url && !req.url.startsWith('/_next/data');
}

export default Renderer;
