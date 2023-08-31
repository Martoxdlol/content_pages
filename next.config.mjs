import { env } from './env.mjs'

/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return {
            afterFiles: [
                {
                    source: '/dashboard',
                    has: [
                        {
                            type: 'host',
                            value: env.ADMIN_DOMAIN,
                        }
                    ],
                    destination: '/$$dashboard$$',
                }
            ]
        }
    }
}

export default nextConfig
