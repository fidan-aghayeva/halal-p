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
                hostname: 'halal-p.azurewebsites.net',
            },
        ],
    },
};

module.exports = nextConfig;
