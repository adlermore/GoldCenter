import createNextIntlPlugin from 'next-intl/plugin';
const withNextIntl = createNextIntlPlugin();

const nextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'api.goldcentr.am',
                pathname: '**',
            },
            {
                protocol: 'https',
                hostname: 'storage.goldcentr.am',
                pathname: '**',
            },
            {
                protocol: 'https',
                hostname: 'storage.goldcenter.am',
                pathname: '**',
            }
        ]
    }
};

export default withNextIntl(nextConfig);