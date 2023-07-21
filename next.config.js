const nextConfig = {
    reactStrictMode: true,
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/i,
            issuer: /\.[jt]sx?$/,
            use: ['@svgr/webpack'],
        });

        return config;
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    i18n: {
        locales: ['az', 'en', 'ru'],
        defaultLocale: 'az',
        localeDetection: false,
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: process.env.NEXT_PUBLIC_SERVICE_HOSTNAME,
            },
        ],
    },
};

module.exports = nextConfig;
