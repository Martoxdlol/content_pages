import { env } from './env.mjs'

/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return {
            beforeFiles: [
                {
                    source: '/',
                    has: [
                        { type: 'host', value: env.ADMIN_DOMAIN, }
                    ],
                    destination: '/platform/',
                },
                {
                    source: '/platform/:path*',
                    has: [
                        { type: 'host', value: env.ADMIN_DOMAIN, }
                    ],
                    destination: '/platform/platform/:path*',
                },
                {
                    source: '/',
                    has: [
                        { type: 'host', value: '(?<slug>[a-z0-9\-]*)\.' + env.NEXT_PUBLIC_DOMAIN, }
                    ],
                    missing: [
                        { type: 'host', value: env.ADMIN_DOMAIN, },
                    ],
                    destination: '/site/:slug/',
                },
                {
                    source: '/site/:path*',
                    has: [
                        { type: 'host', value: '(?<slug>[a-z0-9\-]*)\.' + env.NEXT_PUBLIC_DOMAIN, }
                    ],
                    missing: [
                        { type: 'host', value: env.ADMIN_DOMAIN, },
                    ],
                    destination: '/site/:slug/:path*',
                }
            ],
            afterFiles: [
                {
                    source: '/:path*',
                    has: [
                        {
                            type: 'host',
                            value: env.ADMIN_DOMAIN,
                        }
                    ],
                    destination: '/platform/:path*',
                },
                {
                    source: '/:path*',
                    has: [
                        {
                            type: 'host',
                            value: '(?<slug>[a-z0-9\-]*)\.' + env.NEXT_PUBLIC_DOMAIN,
                        }
                    ],
                    missing: [
                        {
                            type: 'host',
                            value: env.ADMIN_DOMAIN,
                        },
                    ],
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
