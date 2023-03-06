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
        locales: ['az', 'en', 'ar'],
        defaultLocale: 'az',
        localeDetection: false,
        localePath: './public/locales',
        defaultNS: 'common',
        localeExtension: 'json',
    },
};

module.exports = nextConfig;
