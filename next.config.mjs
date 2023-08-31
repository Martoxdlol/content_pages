import { env } from './env.mjs'


const hasPlatformDomainHost =[ { type: 'host', value: env.ADMIN_DOMAIN, } ]
const hasSiteDomainHost = [ { type: 'host', value: '(?<slug>[a-z0-9\-]*)\.' + env.NEXT_PUBLIC_DOMAIN, } ]
const missingSiteDomainHost = [ { type: 'host', value: env.ADMIN_DOMAIN, } ]

/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return {
            beforeFiles: [
                // {
                //     source: '/site/:path*',
                //     has: hasPlatformDomainHost,
                //     destination: '/platform/site/:path*',
                // },
                {
                    source: '/platform/:path*',
                    has: hasSiteDomainHost,
                    missing: missingSiteDomainHost,
                    destination: '/site/:slug/platform/:path*',
                },
            ],
            afterFiles: [
                {
                    source: '/:path*',
                    has: hasPlatformDomainHost,
                    destination: '/platform/:path*',
                },
                {
                    source: '/:path*',
                    has: hasSiteDomainHost,
                    missing: missingSiteDomainHost,
                    destination: '/site/:slug/:path*',
                }
            ]
        }
    },
    // async redirects() {
    //     return [
    //         {
    //             permanent: false,
    //             source: '/:path((?!site|site/.*$]).*)',
    //             has: [
    //                 {
    //                     type: 'host',
    //                     value: '(?<site>[a-z0-9\-]*)\.' + env.NEXT_PUBLIC_DOMAIN,
    //                 }
    //             ],
    //             missing: [
    //                 {
    //                     type: 'host',
    //                     value: env.ADMIN_DOMAIN,
    //                 },
    //             ],
    //             destination: '/site/:site/:path*',
    //         }
    //     ]
    // }
}

export default nextConfig
