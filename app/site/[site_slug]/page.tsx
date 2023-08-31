import Layout from '~/components/Layout'
import Badges from '~/components/blocks/Badges'
import Path from '~/components/blocks/Path'
import Title from '~/components/blocks/Title'
import { SidebarNav } from '~/components/sidebar-nav'
import { TableOfContents } from '~/components/toc'
import { serverSession } from '~/server/auth'

export default async function Home() {
    const session = await serverSession()

    

    const toc = <TableOfContents toc={{
        items: [
            {
                title: "Title",
                url: "#title",
                items: [
                    {
                        title: "Sub Title",
                        url: "#sub-title"
                    }
                ]
            }
        ]
    }} />

    const sideNav = <SidebarNav items={[
        {
            title: "Title",
            items: [
                {
                    title: "Sub Title",
                    items: []
                }
            ]
        }
    ]} />

    return <Layout
        tableOfContents={toc}
        sideNav={sideNav}
    >
        <Path segments={[
            {
                title: "Home",
                destination: { type: 'page', src: '124' },
            },
            {
                title: "Title",
                destination: { type: 'page', src: '124' },
            }
        ]} />
        <Title
            title="Super page"
            subtitle="Description"
        />
        <Badges badges={[
            {
                name: "Badge",
            },
            {
                name: "Badge",
            }
        ]} />
    </Layout>
}
