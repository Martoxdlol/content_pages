import { env } from './env.mjs'


const hasPlatformDomainHost = [{ type: 'host', value: env.ADMIN_DOMAIN, }]
const hasSiteDomainHost = [{ type: 'host', value: '(?<slug>[a-z0-9\-]*)\.' + env.NEXT_PUBLIC_DOMAIN, }]
const missingSiteDomainHost = [{ type: 'host', value: env.ADMIN_DOMAIN, }]

/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return {

            afterFiles: [
                {
                    source: '/api/:path*',
                    destination: '/api/:path*',
                },
                {
                    source: '/:path*',
                    has: hasPlatformDomainHost,
                    destination: '/$$platform$$/:path*',
                },
                {
                    source: '/:path*',
                    has: hasSiteDomainHost,
                    missing: missingSiteDomainHost,
                    destination: '/:slug/:path*',
                },
            ]
        }
    },
    async redirects() {
        return [
            {
                permanent: false,
                source: '/$$platform$$/:path*',
                destination: 'https://' + env.ADMIN_DOMAIN + '/:path*',
            }
        ]
    }
}

export default nextConfig
