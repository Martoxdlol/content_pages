import '~/app/globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Providers from '~/components/Providers'
import { serverSession } from '~/server/auth'
import Layout from '~/components/Layout'
import Title from '~/components/blocks/Title'
import { SignInButton } from '~/components/signIn-out-button'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: "Content pages",
    description: "Create websites",
    themeColor: [
        { media: "(prefers-color-scheme: light)", color: "white" },
        { media: "(prefers-color-scheme: dark)", color: "black" },
    ],
    icons: {
        icon: "/favicon.ico",
        shortcut: "/favicon-16x16.png",
        apple: "/apple-touch-icon.png",
    },
}

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const session = await serverSession()

    if (!session) {
        return <html lang="en">
            <body className={inter.className}>
                <Providers>
                    <Layout>
                        <div className='space-y-5'>
                            <Title title='Sign In' />
                            <SignInButton />
                        </div>
                    </Layout>
                </Providers>
            </body>
        </html>
    }

    return (
        <html lang="en">
            <body className={inter.className}>
                <Providers>
                    {children}
                </Providers>
            </body>
        </html>
    )
}
